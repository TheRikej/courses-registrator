import { Result } from '@badrap/result';
import prisma from '../client';
import type { UserReadSpecificData } from './types/data';
import type { UserReadSpecificType } from './types/result';

/**
 * Returns user and all his courses and seminar groups.
 * 
 * @param data 
 * @returns 
 */
const readSpecific = async (
    data: UserReadSpecificData,
  ): UserReadSpecificType => {
    try {
      const user = await prisma.user.findFirstOrThrow({
        where: {
          id: data.id,
        },
        include: {
          studiedCourses: {
            where: {
              deletedAt: null,
            }
          },
          studiedGroups: {
            where: {
              deletedAt: null,
            }
          },
          taughtCourses:{
            where: {
              deletedAt: null,
            }
          },
          taughtGroups: {
            where: {
              deletedAt: null,
            }
          },
        },
      });
      if (user.deletedAt != null) {
        throw new Error('The user has been deleted!');
      }
      return Result.ok(user);
    } catch (e) {
      return Result.err(e as Error);
    }
  };

  export default readSpecific;