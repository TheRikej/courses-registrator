import { Result } from '@badrap/result';
import prisma from '../client';
import type { ReadAllSeminar } from './types/data';
import type { CourseReadAllResult } from './types/result';
import { NonexistentRecordError } from '../errors';

/**
 * Returns all Seminar Groups for a given CourseSemester.
 * 
 * @param data 
 * @returns 
 */
const readAllSeminarGroups = async (
    data: ReadAllSeminar,
  ): CourseReadAllResult => {
    try {
      return Result.ok(
        await prisma.$transaction(async (transaction) => {
            const course = await transaction.courseSemester.findFirst({
              where: {
                id: data.id,
              },
            });
            if (course === null) {
                throw new NonexistentRecordError("CourseSemester with given Id doesn't exist")
            }
            return await prisma.seminarGroup.findMany({
                where: {
                    courseSemesterId: data.id
                },
                include: {
                    teachers: true,
                    students: true,
                }
            })
        })
      );
      
      //return Result.ok(course);
    } catch (e) {
      return Result.err(e as Error);
    }
  };

  export default readAllSeminarGroups;