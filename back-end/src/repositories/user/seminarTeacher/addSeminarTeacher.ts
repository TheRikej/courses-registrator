import { Result } from '@badrap/result';
import prisma from '../../client';
import type { addTeacherSeminarData } from '../types/data';
import type { UserAddTeacherSeminarResult } from '../types/result';
import { DeletedRecordError, DuplicateRecordError, NonexistentRecordError } from '../../errors';

/**
 * Adds taught course to teacher.
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
        if (user === null) {
          throw new NonexistentRecordError('No User found');
        }
        if (user?.deletedAt !== null) {
          throw new DeletedRecordError('The user is deleted!');
        }
        const seminarGroup = await transaction.seminarGroup.findUnique({
          where: {
            id: data.enrollSeminarId,
          },
          include: {
            teachers: true,
          }
        });
        if (seminarGroup === null) {
          throw new NonexistentRecordError('No seminar group found');
        }
        if (seminarGroup?.deletedAt !== null) {
          throw new DeletedRecordError('The seminar group is deleted!');
        }
        const taughtSeminarsIds = user.taughtGroups.map(x => x.id);
        if (taughtSeminarsIds.indexOf(data.enrollSeminarId) !== -1){
          throw new DuplicateRecordError('The user has already teaches this seminar!');
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
