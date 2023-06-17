import { Result } from '@badrap/result';
import prisma from '../client';
import type { ReadSemesterData } from './types/data';
import type { SemesterReadResult } from './types/result';
import { DeletedRecordError } from '../errors';

/**
 * Returns semester and all its CourseSemesters.
 * 
 * @param data 
 * @returns 
 */
const readSpecificSemester = async (
    data: ReadSemesterData,
  ): SemesterReadResult => {
    try {
      const semster = await prisma.semester.findFirstOrThrow({
        where: {
            id: data.id
        },
        include: {
          courseSemesters: true,
        },
      });
      if (semster.deletedAt !== null) {
        throw new DeletedRecordError('The semster has been deleted!');
      }
      return Result.ok(semster);
    } catch (e) {
      return Result.err(e as Error);
    }
  };

  export default readSpecificSemester;