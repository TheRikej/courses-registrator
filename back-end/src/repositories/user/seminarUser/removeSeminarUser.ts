import { Result } from '@badrap/result';
import prisma from '../../client';
import type { removeStudentSeminarData } from '../types/data';
import type { UserRemoveSeminarResult } from '../types/result';

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
          if (user == null) {
            throw new Error('No User found');
          }
          if (user?.deletedAt != null) {
            throw new Error('The user has already been deleted!');
          }
          const seminar = await transaction.seminarGroup.findUnique({
            where: {
              id: data.seminarId,
            },
            include: {
              students: true
            }
          });
          if (seminar == null) {
            throw new Error('No Seminar found');
          }
          if (seminar?.deletedAt != null) {
            throw new Error('The seminar has already been deleted!');
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
