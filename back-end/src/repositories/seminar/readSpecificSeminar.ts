import { Result } from '@badrap/result';
import prisma from '../client';
import type { UpdateData } from './types/data';
import type { SeminarReadSpecificResult, } from './types/result';
import { DeletedRecordError, NonexistentRecordError } from '../errors';


const updateSeminar = async (data: UpdateData): SeminarReadSpecificResult => {
  try {
      const seminar =  await prisma.seminarGroup.findFirst({
          where: {
              id: data.id
            },
            include: {
                timeSlot: true,
                teachers: {
                  select: {
                    userName: true
                  }
                },
                students: {
                  where: {
                    deletedAt: null
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

export default updateSeminar;
