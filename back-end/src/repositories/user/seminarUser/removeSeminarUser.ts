import { Result } from '@badrap/result';
import prisma from '../../client';
import type { removeStudentSeminarData } from '../types/data';
import type { UserRemoveSeminarResult } from '../types/result';
import { DeletedRecordError, NonexistentRecordError, OperationNotAllowedError } from '../../errors';

/**
 * Enrolls existing student to existing seminar, that he is not already enrolled in.
 * 
 * @param data 
 * @returns 
 */ 

const removeSeminarUser = async (data: removeStudentSeminarData): UserRemoveSeminarResult => {
  try {
    return Result.ok(
      await prisma.$transaction(async (transaction) => {
        const user = await transaction.user.findUnique({
            where: {
              id: data.id,
            },
            include: {
              studiedGroups: {
                where: {
                  groupId: data.seminarId,
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
          const seminar = await transaction.seminarGroup.findUnique({
            where: {
              id: data.seminarId,
            },
            include: {
              students: true
            }
          });
          if (seminar === null) {
            throw new NonexistentRecordError('No Seminar found');
          }
          if (seminar?.deletedAt !== null) {
            throw new DeletedRecordError('The seminar has already been deleted!');
          }
          const currentDate = new Date();
          if (seminar.registrationStart > currentDate) {
            throw new OperationNotAllowedError('Registration for this group has not begun yet!');
          }
          if (seminar.registrationEnd < currentDate) {
            throw new OperationNotAllowedError('Registration for this group has already ended yet!');
          }
          const groupStudent = await transaction.groupStudent.updateMany({
            where: {
              studentId: data.id,
              groupId: data.seminarId
            },
            data: {
              deletedAt: new Date(),
            },
          });
          return groupStudent.count;
      }),
    );
  } catch (e) {
    return Result.err(e as Error);
  }
};

export default removeSeminarUser;
