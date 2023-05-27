import { Result } from '@badrap/result';
import prisma from '../client';
import type { FacultyReadAllResult } from './types/result';

/**
 * Returns all faculties.
 * 
 * @param data 
 * @returns 
 */
const readAllFaculty = async (): FacultyReadAllResult => {
    try {
      const faculty = await prisma.faculty.findMany({
        where: {
            deletedAt: null,
        },
        orderBy: {
            name: "desc"
        },
      });
      return Result.ok(faculty);
    } catch (e) {
      return Result.err(e as Error);
    }
  };

  export default readAllFaculty;