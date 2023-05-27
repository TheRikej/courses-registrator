import { Result } from '@badrap/result';
import prisma from '../client';
import type { ReadAllCourseSemesterData } from './types/data';
import type { AllCourseSemesterResult } from './types/result';

/**
 * Returns faculty and all his courses.
 * 
 * @param data 
 * @returns 
 */
const readAllSemesterCourses = async (
    data: ReadAllCourseSemesterData,
  ): AllCourseSemesterResult => {
    try {
      const course = await prisma.courseSemester.findMany({
        where: {
          ...(data?.courseId !== undefined ? { courseId: data.courseId} : {}),
          ...(data?.semesterId !== undefined ? { semesterId: data.semesterId} : {}),
        },
        include: {
          course: true
        }
      });
      return Result.ok(course);
    } catch (e) {
      return Result.err(e as Error);
    }
  };

  export default readAllSemesterCourses;