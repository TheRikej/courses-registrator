import { Result } from '@badrap/result';
import prisma from '../client';
import type { ReadCourseSemesterData } from './types/data';
import type { CourseSemesterResult } from './types/result';
import { id } from 'date-fns/locale';

/**
 * Returns SemesterCourse and all its seminar groups.
 * 
 * @param data 
 * @returns 
 */
const readSpecificSemesterCourse = async (
    data: ReadCourseSemesterData,
  ): CourseSemesterResult => {
    try {
      const course = await prisma.courseSemester.findFirstOrThrow({
        where: {
            id: data.id
        },
        include: {
          seminarGroups: {
            where: {
                deletedAt: null
            }
          },
          teachers: {
            where: {
                deletedAt: null
            },
            select: {
              userName: true,
              id: true,
            }
          },
          students: {
            where: {
                deletedAt: null
            }
          },
          timeSlot: true,
          semester: true,
          course: {
            include: {
              faculty: true,
              guarantor: {
                select: {
                  userName: true,
                }
              },
            }
          },
        },
      });
      if (course.deletedAt !== null) {
        throw new Error('The course semester has been deleted!');
      }
      return Result.ok({...course, currentCapacity: course.students.length});
    } catch (e) {
      return Result.err(e as Error);
    }
  };

  export default readSpecificSemesterCourse;