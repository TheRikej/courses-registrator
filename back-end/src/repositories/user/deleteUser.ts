import { Result } from '@badrap/result';
import prisma from '../client';
import type { UserDeleteData } from './types/data';
import type { UserDeleteResult } from './types/result';
import { DeletedRecordError, NonexistentRecordError } from '../errors';

/**
 * Deletes an user.
 * 
 * @param data 
 * @returns 
 */

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
          throw new NonexistentRecordError('No User found');
        }
        if (user?.deletedAt != null) {
          throw new DeletedRecordError('The user has already been deleted!');
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
            taughtCourses: {
              set: [],
            },
            taughtGroups: {
              set: [],
            },
          },
          include:{
            taughtCourses: true,
            studiedGroups: true,
            taughtGroups: true,
            studiedCourses: true
          }
        });
        return deleted;
      }),
    );
  } catch (e) {
    return Result.err(e as Error);
  }
};

export default deleteUser;
