import { Result } from '@badrap/result';
import prisma from '../client';
import type { DeleteData } from './types/data';
import type { CourseDeleteResult } from './types/result';
import { AuthorizationFailedError, DeletedRecordError, NonexistentRecordError } from '../errors';

const deleteCourse = async (data: DeleteData): CourseDeleteResult => {
  try {
    return Result.ok(
      await prisma.$transaction(async (transaction) => {
        const deletedAt = new Date();
        const course = await transaction.course.findUnique({
          where: {
            id: data.id.toUpperCase(),
          },
          include: {
            courseSemesters: {
                include: {
                    seminarGroups: true
                }
            }
          }
        });
        if (course === null) {
          throw new NonexistentRecordError('No course found');
        }
        if (course.deletedAt !== null) {
          throw new DeletedRecordError('The course has already been deleted!');
        }
        if (course.guarantorId !== data.loggedInUser.id && !data.loggedInUser.admin) {
            throw new AuthorizationFailedError("You don't have rights to delete this course")
        }
        for (const courseSem of course.courseSemesters) {
            await prisma.seminarGroup.updateMany({
              where: { courseSemesterId: courseSem.id },
              data: {
                deletedAt,
              },
            });
          }
        const deleted = await transaction.course.update({
          where: {
            id: data.id.toUpperCase(),
          },
          data: {
            deletedAt,
            courseSemesters: {
              updateMany: {
                where: {
                  deletedAt: null,
                },
                data: {
                  deletedAt,
                },
              },
            },
          },
          include: {
            courseSemesters: {
              include: {
                seminarGroups: true,
              },
            },
          },
        });
        return deleted;
      }),
    );
  } catch (e) {
    return Result.err(e as Error);
  }
};

export default deleteCourse;