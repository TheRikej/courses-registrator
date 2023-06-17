import { Result } from '@badrap/result';
import prisma from '../client';
import type { UpdateData } from './types/data';
import type { UpdateResult } from './types/result';
import { DeletedRecordError, DuplicateRecordError, NonexistentRecordError } from '../errors';


const updateUser = async (data: UpdateData): UpdateResult => {
  try {
    return Result.ok(
      await prisma.$transaction(async (transaction) => {
        const user = await transaction.user.findUnique({
          where: {
            id: data.id,
          },
        });
        if (user === null) {
          throw new NonexistentRecordError('No user found');
        }
        if (user.deletedAt !== null) {
          throw new DeletedRecordError('The user has been deleted!');
        }
        
        const update = await transaction.user.update({
          where: {
            id: data.id,
          },
          
          data: {
            student: data.student,
            teacher: data.teacher,
            administrator: data.administrator
          },
        });
        return update;
      }),
    );
  } catch (e) {
    return Result.err(e as Error);
  }
};

export default updateUser;
