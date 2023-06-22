import { Result } from '@badrap/result';
import prisma from '../client';
import type { ReadAllSeminar } from './types/data';
import type { SeminarReadAllResult } from './types/result';
import { NonexistentRecordError } from '../errors';

/**
 * Returns all Seminar Groups for a given CourseSemester.
 * 
 * @param data 
 * @returns 
 */
const readAllSeminarGroups = async (
    data: ReadAllSeminar,
  ): SeminarReadAllResult => {
    try {
      return Result.ok(
        await prisma.$transaction(async (transaction) => {
            const course = await transaction.courseSemester.findFirst({
              where: {
                id: data.id,
                deletedAt: null
              },
            });
            if (course === null) {
                throw new NonexistentRecordError("CourseSemester with given Id doesn't exist")
            }
            const semesters =  await prisma.seminarGroup.findMany({
                where: {
                    courseSemesterId: data.id,
                    deletedAt: null
                },
                include: {
                    timeSlot: true,
                    teachers: {
                      select: {
                        userName: true,
                        id: true
                      }
                    },
                    students: {
                      where: {
                        deletedAt: null
                      },
                      include: {
                        student: {
                          select: {
                            userName: true
                          }
                        }
                      }
                    },

                }
            })
            return semesters.map(semester => {return {...semester, currentCapacity: semester.students.length}})
        })
      );
    } catch (e) {
      return Result.err(e as Error);
    }
  };

  export default readAllSeminarGroups;