import { Result } from '@badrap/result';
import prisma from '../client';
import type { ReadSpecificSeminar } from './types/data';
import type { SeminarReadSpecificResult, } from './types/result';
import { DeletedRecordError, NonexistentRecordError } from '../errors';


const readSpecificSeminar = async (data: ReadSpecificSeminar): SeminarReadSpecificResult => {
  try {
      const seminar =  await prisma.seminarGroup.findFirst({
          where: {
              id: data.id
            },
            include: {
                timeSlot: true,
                teachers: {
                  select: {
                    userName: true,
                    id: true
                  }
                },
                students: {
                  where: {
                    deletedAt: null
                  },
                  include: {
                    student: {
                      select: {
                        userName: true
                      }
                    }
                  }
                },
            }
        })
        if (seminar === null) {
            throw new NonexistentRecordError('No seminar group found');
        }
        if (seminar.deletedAt !== null) {
            throw new DeletedRecordError('The seminar group has been deleted!');
        }
        return Result.ok({...seminar, currentCapacity: seminar.students.length})
  } catch (e) {
    return Result.err(e as Error);
  }
};

export default readSpecificSeminar;
