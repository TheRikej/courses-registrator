import { Result } from '@badrap/result';
import prisma from '../../client';
import type { removeTeacherCourseData } from '../types/data';
import type { UserRemoveTeacherCourseResult } from '../types/result';

/**
 * Removes existing student from course that they teach.
 * 
 * @param data 
 * @returns 
 */ 

const removeCourseTeacher = async (data: removeTeacherCourseData): UserRemoveTeacherCourseResult => {
  try {
    return Result.ok(
      await prisma.$transaction(async (transaction) => {
        const user = await transaction.user.findUnique({
            where: {
              id: data.id,
            },
            include: {
              taughtGroups: true,
          }
          });
          if (user == null) {
            throw new Error('No User found');
          }
          if (user?.deletedAt != null) {
            throw new Error('The user has already been deleted!');
          }
          const seminar = await transaction.seminarGroup.findUnique({
            where: {
              id: data.courseId,
            },
          });
          if (seminar == null) {
            throw new Error('No Seminar found');
          }
          const taughtCoursesIds = user.taughtGroups.map(x => x.id);
          if (taughtCoursesIds.indexOf(data.courseId) === -1){
            throw new Error('The user does not teach this seminar!');
          }
          const userUpdate = await transaction.user.update({
              where: {
                id: data.id,
              },
              data: {
                  taughtGroups: {
                      disconnect: [{ id: data.courseId }],
                  }
              }
            });
            await transaction.seminarGroup.update({
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
