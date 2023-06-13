import { Result } from '@badrap/result';
import prisma from '../client';
import type { DeleteData } from './types/data';
import type { SemesterDeleteResult } from './types/result';
import { DeletedRecordError, NonexistentRecordError } from '../errors';


const deleteSemesterCourse = async (data: DeleteData): SemesterDeleteResult => {
  try {
    return Result.ok(
      await prisma.$transaction(async (transaction) => {
        const deletedAt = new Date();
        const group = await transaction.courseSemester.findUnique({
          where: {
            id: data.id,
          },
        });
        if (group == null) {
          throw new NonexistentRecordError('No course for given semester found');
        }
        if (group.deletedAt !== null) {
          throw new DeletedRecordError('The course for given semester has already been deleted!');
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
