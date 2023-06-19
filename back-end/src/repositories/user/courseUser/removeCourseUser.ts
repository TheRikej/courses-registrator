import { Result } from '@badrap/result';
import prisma from '../../client';
import type { removeStudentCourseData } from '../types/data';
import type { UserRemoveStudentCourseResult } from '../types/result';
import { DeletedRecordError, NonexistentRecordError } from '../../errors';

/**
 * Removes existing student from course that he/she is enrolled in.
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
        if (user === null) {
          throw new NonexistentRecordError('No User found');
        }
        if (user?.deletedAt !== null) {
          throw new DeletedRecordError('The user has already been deleted!');
        }
        const course = await transaction.courseSemester.findUnique({
          where: {
            id: data.enrollCourseId,
          },
          include: {
            students: true
          }
        });
        if (course === null) {
          throw new NonexistentRecordError('No CourseSemester found');
        }
        if (course?.deletedAt !== null) {
          throw new DeletedRecordError('The CourseSemester has already been deleted!');
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
