import { Result } from '@badrap/result';
import prisma from '../client';
import type { UserReadAllResult } from './types/result';

/**
 * Returns all users.
 * 
 * @param data 
 * @returns 
 */
const readAllUser = async (): UserReadAllResult => {
    try {
      const user = await prisma.user.findMany({
        where: {
            deletedAt: null,
        },
        orderBy: {
            userName: "desc"
        },
      });
      return Result.ok(user);
    } catch (e) {
      return Result.err(e as Error);
    }
  };

  export default readAllUser;