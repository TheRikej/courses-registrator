import { Result } from '@badrap/result';
import prisma from '../../client';
import type { addTeacherSeminarData } from '../types/data';
import type { UserAddTeacherSeminarResult } from '../types/result';

/**
 * Enrolls existing student to existing course, that he is not already enrolled in.
 * 
 * @param data 
 * @returns 
 */ 

const addSeminarTeacher = async (data: addTeacherSeminarData): UserAddTeacherSeminarResult => {
  try {
    return Result.ok(
      await prisma.$transaction(async (transaction) => {
        const user = await transaction.user.findUnique({
          where: {
            id: data.id,
          },
          include: {
            taughtCourses: true,
            taughtGroups: true,
        }
        });
        if (user == null) {
          throw new Error('No User found');
        }
        if (user?.deletedAt != null) {
          throw new Error('The user is deleted!');
        }
        const seminarGroup = await transaction.seminarGroup.findUnique({
          where: {
            id: data.enrollSeminarId,
          },
          include: {
            teachers: true,
          }
        });
        if (seminarGroup == null) {
          throw new Error('No seminar group found');
        }
        if (seminarGroup?.deletedAt != null) {
          throw new Error('The seminar group is deleted!');
        }
        const taughtCoursesIds = user.taughtCourses.map(x => x.id);
        if (taughtCoursesIds.indexOf(seminarGroup.courseSemesterId) == -1){
          throw new Error('This user does not teach this course this seminar!');
        }
        const taughtSeminarsIds = user.taughtGroups.map(x => x.id);
        if (taughtSeminarsIds.indexOf(data.enrollSeminarId) !== -1){
          throw new Error('The user has already teaches this seminar!');
        }
        const userUpdate = await transaction.user.update({
            where: {
              id: data.id,
            },
            data: {
                taughtGroups: {
                    connect: [{ id: data.enrollSeminarId }],
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

export default addSeminarTeacher;
