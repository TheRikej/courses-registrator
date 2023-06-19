import { Result } from '@badrap/result';
import prisma from '../client';
import type { ReadCourseData } from './types/data';
import type { CourseResult } from './types/result';
import { DeletedRecordError } from '../errors';

/**
 * Returns Course and all its CourseSemesters.
 * 
 * @param data 
 * @returns 
 */
const readSpecificCourse = async (
    data: ReadCourseData,
  ): CourseResult => {
    try {
      if (data.id === undefined && data.name === undefined) {
        throw new Error('Must provide ID or Name for course!');
      }
      const course = await prisma.course.findFirstOrThrow({
        where: {
            ...(data?.id !== undefined ? { id: data.id.toUpperCase()} : {}),
            ...(data?.name !== undefined ? { name: data.name} : {}),
        },
        include: {
          guarantor: {
            select: {userName: true}
          },
          faculty: true,
          courseSemesters: {
            where: {
                deletedAt: null,
            },
            include: {
                semester: true,
            }
          }
        },
      });
      if (course.deletedAt !== null) {
        throw new DeletedRecordError('The course has been deleted!');
      }
      const res = {...course, semesters: course.courseSemesters.map(x => 
        x.semester.year + x.semester.season)}
      return Result.ok(res);
    } catch (e) {
      return Result.err(e as Error);
    }
  };

  export default readSpecificCourse;