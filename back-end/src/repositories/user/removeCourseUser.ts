import { Result } from '@badrap/result';
import prisma from '../client';
import type { removeStudentCourseData } from './types/data';
import type { UserRemoveStudentCourseResult } from './types/result';
import { id } from 'date-fns/locale';

/**
 * Enrolls existing student to existing course, that he is not already enrolled in.
 * 
 * @param data 
 * @returns 
 */ 

const removeCourseUser = async (data: removeStudentCourseData): UserRemoveStudentCourseResult => {
  try {
    return Result.ok(
      await prisma.$transaction(async (transaction) => {
        const user = await transaction.user.findUnique({
          where: {
            id: data.id,
          },
          include: {
            studiedCourses: {
              where: {
                courseId: data.enrollCourseId,
              },
            }
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
          include: {
            students: true
          }
        });
        if (course == null) {
          throw new Error('No CourseSemester found');
        }
        if (course?.deletedAt != null) {
          throw new Error('The CourseSemester has already been deleted!');
        }
        const courseStudent = await transaction.courseStudent.updateMany({
          where: {
            studentId: data.id,
            courseId: data.enrollCourseId,
          },
          data: {
            deletedAt: new Date(),
          },
        });
        return courseStudent.count;
      }),
    );
  } catch (e) {
    return Result.err(e as Error);
  }
};

export default removeCourseUser;
