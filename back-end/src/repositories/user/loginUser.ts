import { Result } from '@badrap/result';
import prisma from '../client';
import type { LoginData } from './types/data';
import type { LoginResult } from './types/result';
import { verify } from 'argon2';

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
            id: data.id,
          },
        });
        
        if (user == null) {
          throw new Error('No user found');
        }
        if (user?.deletedAt != null) {
          throw new Error('The user has already been deleted!');
        }
        console.log(user.hashedPassword)
        console.log(data.password)
        const verification = await verify(user.hashedPassword, data.password)
        if (!verification) {
            throw new Error('Wrong password!');
        }
        return user;
      }),
    );
  } catch (e) {
    return Result.err(e as Error);
  }
};

export default login;
