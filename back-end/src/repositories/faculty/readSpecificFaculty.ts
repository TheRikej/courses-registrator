import { Result } from '@badrap/result';
import prisma from '../client';
import type { ReadFacultyData } from './types/data';
import type { FacultyReadResult } from './types/result';
import { DeletedRecordError } from '../errors';

/**
 * Returns faculty and all his courses.
 * 
 * @param data 
 * @returns 
 */
const readSpecificFaculty = async (
    data: ReadFacultyData,
  ): FacultyReadResult => {
    try {
      if (data.id === undefined && data.name === undefined) {
        throw new Error('Must provide ID or Name for faculty!');
      }
      const faculty = await prisma.faculty.findFirstOrThrow({
        where: {
            ...(data?.id !== undefined ? { id: data.id} : {}),
            ...(data?.name !== undefined ? { name: data.name} : {}),
        },
        include: {
          courses: {
            where: {
                deletedAt: null,
            }
          }
        },
      });
      if (faculty.deletedAt !== null) {
        throw new DeletedRecordError('The faculty has been deleted!');
      }
      return Result.ok(faculty);
    } catch (e) {
      return Result.err(e as Error);
    }
  };

  export default readSpecificFaculty;