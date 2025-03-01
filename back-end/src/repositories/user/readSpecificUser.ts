import { Result } from '@badrap/result';
import prisma from '../client';
import type { UserReadSpecificData } from './types/data';
import type { UserReadSpecificProtectedType, UserReadSpecificType } from './types/result';
import { DeletedRecordError } from '../errors';

/**
 * Returns user and all their courses and seminar groups.
 * 
 * @param data 
 * @returns 
 */
const readSpecific = async (
    data: UserReadSpecificData,
  ): UserReadSpecificProtectedType => {
    try {
      const user = await prisma.user.findFirstOrThrow({
        where: {
          id: data.id,
        },
        include: {
          guarantedCourses: {
            where: {
              deletedAt: null,
            },
          },
          studiedCourses: {
            where: {
              deletedAt: null,
            },
            include: {
              course: {
                include: {
                    course: true
                }
              }
            }
          },
          studiedGroups: {
            where: {
              deletedAt: null,
            },
            include: {
              group: true
            }
          },
          taughtCourses:{
            where: {
              deletedAt: null,
            },
            include: {
                course: true,
            }
          },
          taughtGroups: {
            where: {
              deletedAt: null,
            }
          },
        },
      });
      if (user.deletedAt !== null) {
        throw new DeletedRecordError('The user has been deleted!');
      }
      return Result.ok(user);
    } catch (e) {
      return Result.err(e as Error);
    }
  };

  export default readSpecific;