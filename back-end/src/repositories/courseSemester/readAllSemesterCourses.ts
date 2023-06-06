import { Result } from '@badrap/result';
import prisma from '../client';
import type { ReadAllCourseSemesterData } from './types/data';
import type { AllCourseSemesterResult } from './types/result';

/**
 * Returns all SemesterCourses that fit the given conditions.
 * 
 * @param data 
 * @returns 
 */
const readAllSemesterCourses = async (
    data: ReadAllCourseSemesterData,
  ): AllCourseSemesterResult => {
    try {
      return Result.ok(
        await prisma.$transaction(async (transaction) => {
          const courses = await transaction.course.findMany({
            where: {
              ...(data.facultyId !== undefined ? { facultyId: data.facultyId } : {}),
            },
          });
          const courseIds = courses.map(x => x.id);
          const course = await transaction.courseSemester.findMany({
            where: {
              ...(data?.courseId !== undefined ? { courseId: data.courseId} : {}),
              ...(data?.semesterId !== undefined ? { semesterId: data.semesterId} : {}),
              courseId: { in: courseIds },
            },
            include: {
              course: true
            }
          });
          return course;
        }),
      );
      
      //return Result.ok(course);
    } catch (e) {
      return Result.err(e as Error);
    }
  };

  export default readAllSemesterCourses;