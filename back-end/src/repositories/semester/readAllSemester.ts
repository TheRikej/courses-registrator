import { Result } from '@badrap/result';
import prisma from '../client';
import type { SemesterReadAllResult } from './types/result';
import type { ReadAllSemesterData } from './types/data';

/**
 * Returns all semesters that fit given conditions.
 * 
 * @param data 
 * @returns 
 */
const readAllSemester = async (data: ReadAllSemesterData): SemesterReadAllResult => {
    try {
      const semester = await prisma.semester.findMany({
        where: {
            deletedAt: null,
            ...(data?.season !== undefined ? { season: data.season} : {}),
            ...(data?.year !== undefined ? { year: data.year} : {}),
        },
        orderBy: [
          {
            year: "desc",
          },
          {
            season: "desc"
          }
        ],
      });
      return Result.ok(semester);
    } catch (e) {
      return Result.err(e as Error);
    }
  };

  export default readAllSemester;