import { Result } from '@badrap/result';
import prisma from '../client';
import type { LoginData } from './types/data';
import type { LoginResult } from './types/result';
import { verify } from 'argon2';
import { DeletedRecordError, NonexistentRecordError, VerificationFailedError } from '../errors';

/**
 * Login user
 * 
 * @param data 
 * @returns 
 */ 

const login = async (data: LoginData): LoginResult => {
  try {
    return Result.ok(
      await prisma.$transaction(async (transaction) => {
        const user = await transaction.user.findUnique({
          where: {
            email: data.email,
          },
        });
        
        if (user == null) {
          throw new NonexistentRecordError('No user found');
        }
        if (user?.deletedAt != null) {
          throw new DeletedRecordError('The user has already been deleted!');
        }

        const verification = await verify(user.hashedPassword, data.password)
        if (!verification) {
            throw new VerificationFailedError('Wrong password!');
        }
        return user;
      }),
    );
  } catch (e) {
    return Result.err(e as Error);
  }
};

export default login;
