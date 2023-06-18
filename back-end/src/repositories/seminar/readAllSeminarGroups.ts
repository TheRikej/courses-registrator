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
            const semesters =  await prisma.seminarGroup.findMany({
                where: {
                    courseSemesterId: data.id
                },
                include: {
                    teachers: {
                        where: {
                            deletedAt: null,
                        },
                      },
                    students: {
                        where: {
                            deletedAt: null,
                        },
                    },
                }
            })
            return semesters.map(semester => {return {...semester, currentCapacity: semester.students.length}})
        })
      );
      
      //return Result.ok(course);
    } catch (e) {
      return Result.err(e as Error);
    }
  };

  export default readAllSeminarGroups;