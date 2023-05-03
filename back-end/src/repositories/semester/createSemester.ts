import { Result } from '@badrap/result';
import prisma from '../client';
import type { SemseterCreateData } from './types/data';
import type { SemesterCreateResult } from './types/result';

/**
 * Creates new semseter.
 * 
 * @param data 
 * @returns 
 */
const createSemester = async (data: SemseterCreateData): SemesterCreateResult => {
  try {
    return Result.ok(
      await prisma.$transaction(async (transaction) => {
        const semesters = transaction.semester.findMany({
          where: {
            season: data.season,
            year: data.year,
          }
        })
        if ((await semesters).length > 0){
          throw new Error("There already is semester of this year and season!");
        }
        const semester = await transaction.semester.create({
          data: {
            year: data.year,
            semesterEnd: data.semesterEnd,
            semesterStart: data.semesterStart,
            season: data.season
          },
        })
        return semester
      })
    );
  } catch (e) {
    return Result.err(e as Error);
  }
};

export default createSemester;
