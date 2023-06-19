import { Result } from '@badrap/result';
import prisma from '../client';
import type { SemseterUpdateData } from './types/data';
import type { SemesterCreateResult } from './types/result';
import { DeletedRecordError, DuplicateRecordError, NonexistentRecordError } from '../errors';

/**
 * Creates new semseter.
 * 
 * @param data 
 * @returns 
 */
const updateSemester = async (data: SemseterUpdateData): SemesterCreateResult => {
  try {
    return Result.ok(
      await prisma.$transaction(async (transaction) => {
        console.log(data.id)
        const semester = await prisma.semester.findFirstOrThrow({
            where: {
                id: data.id
            },
        });
        if (semester === null) {
            throw new NonexistentRecordError('No semester found');
        }
        if (semester.deletedAt !== null) {
            throw new DeletedRecordError('The semester has already been deleted!');
        }
        const semesters = await transaction.semester.findMany({
          where: {
            season: data.season,
            year: data.year,
            deletedAt: null
          }
        })
        if (semesters.length > 0 && semesters[0].id !== data.id){
          throw new DuplicateRecordError("There already is semester of this year and season!");
        }
        const update = await transaction.semester.update({
        where: {
            id: data.id,
        },
          data: {
            year: data.year,
            semesterEnd: data.semesterEnd,
            semesterStart: data.semesterStart,
            season: data.season
          },
        })
        return update
      })
    );
  } catch (e) {
    return Result.err(e as Error);
  }
};

export default updateSemester;
