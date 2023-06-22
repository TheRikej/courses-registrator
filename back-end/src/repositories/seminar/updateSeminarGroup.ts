import { Result } from '@badrap/result';
import prisma from '../client';
import type { UpdateData } from './types/data';
import type { SeminarUpdateResult } from './types/result';
import { AuthorizationFailedError, DeletedRecordError, DuplicateRecordError, NonexistentRecordError } from '../errors';


const updateSeminar = async (data: UpdateData): SeminarUpdateResult => {
  try {
    return Result.ok(
      await prisma.$transaction(async (transaction) => {
        const group = await transaction.seminarGroup.findUnique({
          where: {
            id: data.id,
          },
          include: {
            teachers: true,
            courseSemester: {
                include: {
                    teachers: true,
                    course: true,
                },
            },
          },
        });
        if (group === null) {
          throw new NonexistentRecordError('No seminar group found');
        }
        if (group.deletedAt !== null) {
          throw new DeletedRecordError('The seminar group has been deleted!');
        }
        if ( !data.loggedInUser.admin
            && !group.teachers.map(x => x.id).includes(data.loggedInUser.id)
            && group.courseSemester.course.guarantorId !== data.loggedInUser.id
            && !group.courseSemester.teachers.map(x => x.id).includes(data.loggedInUser.id)
        ){
           throw new AuthorizationFailedError("You don't have rights to update this seminar")
        }     

        const seminarGroup = await transaction.seminarGroup.findFirst({
            where: {
                ...(data.groupNumber !== undefined ? { groupNumber: data.groupNumber } : { groupNumber: -1 }),
              deletedAt: null,
              courseSemesterId: group.courseSemesterId,
            },
          });
          if (seminarGroup !== null && seminarGroup.id !== data.id) {
            throw new DuplicateRecordError('Seminar group with this number already exists!');
          }   
          
        let timeslot = undefined;
        if (data.timeslot !== undefined){
          timeslot = await transaction.timeSlot.create({
            data: {
              ...data.timeslot
            },
          });
        }
        const update = await transaction.seminarGroup.update({
          where: {
            id: data.id,
          },
          
          data: {
            ...(data.capacity !== undefined ? { capacity: data.capacity } : {}),
            ...(data.registrationStart !== undefined ? { registrationStart: data.registrationStart } : {}),
            ...(data.registrationEnd !== undefined ? { registrationEnd: data.registrationEnd } : {}),
            ...(data.room !== undefined ? { room: data.room } : {}),
            ...(data.groupNumber !== undefined ? { groupNumber: data.groupNumber } : {}),
            ...(timeslot !== undefined ? { timeSlot: { connect: { id: timeslot.id } } } : {}),
          },
          include: {
            // students: true,
            // teachers: true,
            timeSlot: true
          },
        });
        return update;
      }),
    );
  } catch (e) {
    return Result.err(e as Error);
  }
};

export default updateSeminar;
