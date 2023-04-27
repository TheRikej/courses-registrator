import { Result } from '@badrap/result';
import prisma from '../client';
import type { UserCreateData } from './types/data';
import type { UserCreateResult } from './types/result';

/**
 * Creates new user.
 * 
 * @param data 
 * @returns 
 */
const createUser = async (data: UserCreateData): UserCreateResult => {
  try {
    return Result.ok(
      await prisma.user.create({
        data: {
          userName: data.userName,
          email: data.email,
          hashedPassword: data.hashedPassword,
          salt: data.salt,
        },
      }),
    );
  } catch (e) {
    return Result.err(e as Error);
  }
};

export default createUser;
