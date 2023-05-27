import { Result } from '@badrap/result';
import prisma from '../client';
import type { ReadCourseSemesterData } from './types/data';
import type { CourseSemesterResult } from './types/result';

/**
 * Returns Course and all its CourseSemesters.
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
          }
        },
      });
      if (course.deletedAt != null) {
        throw new Error('The course semester has been deleted!');
      }
      return Result.ok(course);
    } catch (e) {
      return Result.err(e as Error);
    }
  };

  export default readSpecificSemesterCourse;