import { Result } from '@badrap/result';
import prisma from '../client';
import type { DeleteData } from './types/data';
import type { SemesterDeleteResult } from './types/result';

const deleteSemester = async (data: DeleteData): SemesterDeleteResult => {
  try {
    return Result.ok(
      await prisma.$transaction(async (transaction) => {
        const deletedAt = new Date();
        const semester = await transaction.semester.findUnique({
          where: {
            id: data.id,
          },
          include: {
            courseSemesters: {
                include: {
                    seminarGroups: true
                }
            }
          }
        });
        if (semester == null) {
          throw new Error('No semester found');
        }
        if (semester.deletedAt !== null) {
          throw new Error('The semester has already been deleted!');
        }
        for (const courseSem of semester.courseSemesters) {
            await prisma.seminarGroup.updateMany({
              where: { courseSemesterId: courseSem.id },
              data: {
                deletedAt,
              },
            });
          }
        const deleted = await transaction.semester.update({
          where: {
            id: data.id,
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

export default deleteSemester;