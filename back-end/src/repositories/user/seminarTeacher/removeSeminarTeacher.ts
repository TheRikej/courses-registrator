import { Result } from '@badrap/result';
import prisma from '../../client';
import type { removeTeacherSeminarData } from '../types/data';
import type { UserRemoveTeacherResult } from '../types/result';
import { AuthorizationFailedError, DeletedRecordError, MissingRelationError, NonexistentRecordError } from '../../errors';
import { request } from 'express';

/**
 * Removes existing teacher from course that they teach.
 * 
 * @param data 
 * @returns 
 */ 

const removeSeminarTeacher = async (data: removeTeacherSeminarData): UserRemoveTeacherResult => {
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
                teachers: true,
                courseSemester: {
                    include: {
                        teachers: true,
                        course: true,
                    }
                },
            },
          });
          if (seminar === null) {
            throw new NonexistentRecordError('No Seminar found');
          }
          if (seminar.deletedAt !== null) {
            throw new DeletedRecordError('The Seminar has already been deleted!');
          }
          if ( request.session.user === undefined || (!request.session.user?.admin
            && !seminar.teachers.map(x => x.id).includes(request.session.user.id)
            && seminar.courseSemester.course.guarantorId !== request.session.user?.id
            && !seminar.courseSemester.teachers.map(x => x.id).includes(request.session.user.id))) {
           throw new AuthorizationFailedError("You don't have rights to delete this seminar")
        }     
          const taughtGroupsIds = user.taughtGroups.map(x => x.id);
          if (taughtGroupsIds.indexOf(data.seminarId) === -1){
            throw new MissingRelationError('The user does not teach this seminar!');
          }
          const userUpdate = await transaction.user.update({
              where: {
                id: data.id,
              },
              data: {
                  taughtGroups: {
                      disconnect: [{ id: data.seminarId }],
                  }
              }
            });
            await transaction.seminarGroup.update({
              where: {
                id: data.seminarId,
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

export default removeSeminarTeacher;
