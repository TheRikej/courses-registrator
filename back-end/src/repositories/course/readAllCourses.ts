import { Result } from '@badrap/result';
import prisma from '../client';
import type { ReadAllCourseData } from './types/data';
import type { AllCourseResult } from './types/result';

/**
 * Returns all courses or courses with specified faculty.
 * 
 * @param data 
 * @returns 
 */
const readAllCourse = async (
    data: ReadAllCourseData,
  ): AllCourseResult => {
    try {
      const course = await prisma.course.findMany({
        where: {
            ...(data?.facultyId !== undefined ? { facultyId: data.facultyId} : {}),
            deletedAt: null,
        },
        include: {
          faculty: true,
          guarantor: {
            select: {
              userName: true,
            }
          },
        }
      });
      return Result.ok(course);
    } catch (e) {
      return Result.err(e as Error);
    }
  };

  export default readAllCourse;