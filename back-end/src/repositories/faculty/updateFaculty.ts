import { Result } from '@badrap/result';
import prisma from '../client';
import type { UpdateData } from './types/data';
import type { FacultyUpdateResult } from './types/result';
import { DeletedRecordError, NonexistentRecordError } from '../errors';


const updateFaculty = async (data: UpdateData): FacultyUpdateResult => {
  try {
    return Result.ok(
      await prisma.$transaction(async (transaction) => {
        const faculty = await transaction.faculty.findUnique({
          where: {
            id: data.id,
          },
        });
        if (faculty === null) {
          throw new NonexistentRecordError('No faculty found');
        }
        if (faculty.deletedAt !== null) {
          throw new DeletedRecordError('The faculty has been deleted!');
        }
        
        const update = await transaction.faculty.update({
          where: {
            id: data.id,
          },
          
          data: {
            name: data.name
          },
        });
        return update;
      }),
    );
  } catch (e) {
    return Result.err(e as Error);
  }
};

export default updateFaculty;
