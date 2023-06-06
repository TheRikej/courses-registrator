import { Result } from '@badrap/result';
import prisma from '../client';
import type { DeleteData } from './types/data';
import type { SemesterDeleteResult } from './types/result';


const deleteSemesterCourseGroup = async (data: DeleteData): SemesterDeleteResult => {
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
          throw new Error('No seminar course found');
        }
        if (group.deletedAt !== null) {
          throw new Error('The seminar course has already been deleted!');
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

export default deleteSemesterCourseGroup;
