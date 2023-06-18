import { Result } from '@badrap/result';
import prisma from '../client';
import type { DeleteData } from './types/data';
import type { SemesterDeleteResult } from './types/result';
import { AuthorizationFailedError, DeletedRecordError, NonexistentRecordError } from '../errors';
import { request } from 'express';


const deleteSemesterCourse = async (data: DeleteData): SemesterDeleteResult => {
  try {
    return Result.ok(
      await prisma.$transaction(async (transaction) => {
        const deletedAt = new Date();
        const courseSemester = await transaction.courseSemester.findUnique({
          where: {
            id: data.id,
          },
          include: {
            course: true,
          },
        });
        if (courseSemester === null) {
          throw new NonexistentRecordError('No course for given semester found');
        }
        if (courseSemester.deletedAt !== null) {
          throw new DeletedRecordError('The course for given semester has already been deleted!');
        }
        if (courseSemester.course.guarantorId !== request.session.user?.id && !request.session.user?.admin) {
            throw new AuthorizationFailedError("You don't have right to delete this course")
        }
        const deleted = await transaction.courseSemester.update({
          where: {
            id: data.id,
          },
          data: {
            deletedAt,
            seminarGroups: {
                updateMany: {
                    where: {
                        deletedAt: null
                    },
                    data: {
                        deletedAt,
                        
                    },
                },
            },
          },
          include: {
            students: true,
            teachers: true,
            seminarGroups: true,
          },
        });
        return deleted;
      }),
    );
  } catch (e) {
    return Result.err(e as Error);
  }
};

export default deleteSemesterCourse;
