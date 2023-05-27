import { Result } from '@badrap/result';
import prisma from '../../client';
import type { addTeacherCourseData } from '../types/data';
import type { UserAddTeacherCourseResult } from '../types/result';

/**
 * Enrolls existing student to existing course, that he is not already enrolled in.
 * 
 * @param data 
 * @returns 
 */ 

const addCourseTeacher = async (data: addTeacherCourseData): UserAddTeacherCourseResult => {
  try {
    return Result.ok(
      await prisma.$transaction(async (transaction) => {
        
        const user = await transaction.user.findUnique({
          where: {
            id: data.id,
          },
          include: {
            taughtCourses: true,
        }
        });
        if (user == null) {
          throw new Error('No User found');
        }
        if (user?.deletedAt != null) {
          throw new Error('The user has already been deleted!');
        }
        const course = await transaction.courseSemester.findUnique({
          where: {
            id: data.enrollCourseId,
          },
        });
        if (course == null) {
          throw new Error('No CourseSemester found');
        }
        if (course?.deletedAt != null) {
          throw new Error('The CourseSemester has already been deleted!');
        }
        const taughtCoursesIds = user.taughtCourses.map(x => x.courseId);
        if (taughtCoursesIds.indexOf(data.enrollCourseId) !== -1){
          throw new Error('The user has already teaches this course!');
        }
        const userUpdate = await transaction.user.update({
            where: {
              id: data.id,
            },
            data: {
                taughtCourses: {
                    connect: [{ id: data.enrollCourseId }],
                }
            }
          });
        return userUpdate;
      }),
    );
  } catch (e) {
    return Result.err(e as Error);
  }
};

export default addCourseTeacher;
