import { Result } from '@badrap/result';
import prisma from '../client';
import type { DeleteData } from './types/data';
import type { FacultyDeleteResult } from './types/result';
import { DeletedRecordError, NonexistentRecordError } from '../errors';

const deleteFaculty = async (data: DeleteData): FacultyDeleteResult => {
  try {
    return Result.ok(
      await prisma.$transaction(async (transaction) => {
        const deletedAt = new Date();
        const faculty = await transaction.faculty.findUnique({
          where: {
            id: data.id,
          },
          include: {
            courses: {
                include: {
                    courseSemesters: {
                        include: {
                            seminarGroups: true
                        }
                    }
                }
            }
          }
        });
        if (faculty == null) {
          throw new NonexistentRecordError('No faculty found');
        }
        if (faculty.deletedAt !== null) {
          throw new DeletedRecordError('The faculty has already been deleted!');
        }
        for (const course of faculty.courses) {
            for (const semaster of course.courseSemesters) {
                await prisma.seminarGroup.updateMany({
                    where: { courseSemesterId: semaster.id },
                    data: {
                        deletedAt,
                    },
                });
            }
            await prisma.courseSemester.updateMany({
              where: { courseId: course.id },
              data: {
                deletedAt,
              },
            });
          }
        const deleted = await transaction.faculty.update({
          where: {
            id: data.id,
          },
          data: {
            deletedAt,
            courses: {
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
        });
        return deleted;
      }),
    );
  } catch (e) {
    return Result.err(e as Error);
  }
};

export default deleteFaculty;