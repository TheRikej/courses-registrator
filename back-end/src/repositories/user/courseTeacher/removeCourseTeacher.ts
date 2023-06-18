import { Result } from '@badrap/result';
import prisma from '../../client';
import type { removeTeacherData } from '../types/data';
import type { UserRemoveTeacherResult } from '../types/result';
import { AuthorizationFailedError, DeletedRecordError, MissingRelationError, NonexistentRecordError } from '../../errors';

/**
 * Removes existing student from course that they teaches.
 * 
 * @param data 
 * @returns 
 */ 

const removeCourseTeacher = async (data: removeTeacherData): UserRemoveTeacherResult => {
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
          if (user === null) {
            throw new NonexistentRecordError('No User found');
          }
          if (user?.deletedAt !== null) {
            throw new DeletedRecordError('The user has already been deleted!');
          }
          const courseSemester = await transaction.courseSemester.findUnique({
            where: {
              id: data.courseId,
            },
            include: {
                teachers: true,
                course: true,
            },
          });
          if (courseSemester === null) {
            throw new NonexistentRecordError('No CourseSemester found');
          }
          if ( data.loggedInUser.admin
            && courseSemester.course.guarantorId !== data.loggedInUser.id
            && !courseSemester.teachers.map(x => x.id).includes(data.loggedInUser.id)) {
           throw new AuthorizationFailedError("You don't have right to remove teachers from this course")
       }

          const taughtCoursesIds = user.taughtCourses.map(x => x.id);
          console.log(taughtCoursesIds)
          if (taughtCoursesIds.indexOf(data.courseId) === -1){
            throw new MissingRelationError('The user does not teach this course!');
          }
          const userUpdate = await transaction.user.update({
              where: {
                id: data.id,
              },
              data: {
                  taughtCourses: {
                      disconnect: [{ id: data.courseId }],
                  }
              }
            });
            await transaction.courseSemester.update({
              where: {
                id: data.courseId,
              },
              data: {
                teachers: {
                  disconnect: [{ id: data.id }],
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

export default removeCourseTeacher;
