import { Result } from '@badrap/result';
import prisma from '../client';
import { hash } from 'argon2';
import type { UserCreateData } from './types/data';
import type { UserCreateResult } from './types/result';

/**
 * Creates new user.
 * 
 * @param data 
 * @returns 
 */
const createUser = async (data: UserCreateData): UserCreateResult => {
  const password = await hash(data.hashedPassword);
  try {
    return Result.ok(
      await prisma.user.create({
        data: {
          userName: data.userName,
          email: data.email,
          hashedPassword: password,
          teacher: data.teacher,
          student: data.student,
          administrator: data.admin,
        },
      }),
    );
  } catch (e) {
    return Result.err(e as Error);
  }
};

export default createUser;
