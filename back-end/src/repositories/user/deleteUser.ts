import { Result } from '@badrap/result';
import prisma from '../client';
import type { UserDeleteData } from './types/data';
import type { UserDeleteResult } from './types/result';

// Not yet implemented, no need for test.
const deleteUser = async (data: UserDeleteData): UserDeleteResult => {
  try {
    const deletedAt = new Date();

    return Result.ok(
      await prisma.$transaction(async (transaction) => {
        const user = await transaction.user.findUnique({
          where: {
            id: data.id,
          },
        });
        if (user == null) {
          throw new Error('No User found');
        }
        if (user?.deletedAt != null) {
          throw new Error('The user has already been deleted!');
        }
        const deleted = await transaction.user.update({
          where: {
            id: data.id,
          },
          data: {
            deletedAt,
            studiedCourses: {
              updateMany: {
                where: {
                  deletedAt: null
                },
                data: {
                  deletedAt,
                }
              }
            },
            studiedGroups: {
              updateMany: {
                where: {
                  deletedAt: null
                },
                data: {
                  deletedAt,
                }
              }
            },
          },
          include:{
            taughtCourses: {
              include: {
                teachers: true
              }
            },
            studiedGroups: true,
            taughtGroups: true,
            studiedCourses: true
          }
        });

        const taughtCoursesId = deleted.taughtCourses.map(x => { return {id: x.id, teachers: x.teachers}});
        return deleted;
      }),
    );
  } catch (e) {
    return Result.err(e as Error);
  }
};

export default deleteUser;
