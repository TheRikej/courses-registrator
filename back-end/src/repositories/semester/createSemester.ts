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
      await prisma.semester.create({
        data: {
          year: data.year,
          semesterEnd: data.semesterEnd,
          semesterStart: data.semesterStart,
          season: data.season
        },
      }),
    );
  } catch (e) {
    return Result.err(e as Error);
  }
};

export default createSemester;
