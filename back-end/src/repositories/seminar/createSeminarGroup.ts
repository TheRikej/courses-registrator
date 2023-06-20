import { Result } from '@badrap/result';
import prisma from '../client';
import type { CreateSeminar } from './types/data';
import type { SeminarCreateResult } from './types/result';
import { AuthorizationFailedError, DeletedRecordError, DuplicateRecordError, NonexistentRecordError } from '../errors';

/**
 * 
 * Enrolls existing student to existing course, that he is not already enrolled in.
 * 
 * @param data 
 * @returns 
 */ 

const createSeminarGroup = async (data: CreateSeminar): SeminarCreateResult => {
  try {
    return Result.ok(
      await prisma.$transaction(async (transaction) => {
        const courseSemester = await transaction.courseSemester.findUnique({
          where: {
            id: data.id,
          },
          include: {
            course: true,
            teachers: true,
          },
        });
        if (courseSemester === null) {
          throw new NonexistentRecordError('No course found');
        }
        if (courseSemester?.deletedAt !== null) {
          throw new DeletedRecordError('The semster course has already been deleted!');
        }
        if ( !data.loggedInUser.admin
             && courseSemester.course.guarantorId !== data.loggedInUser.id
             && !courseSemester.teachers.map(x => x.id).includes(data.loggedInUser.id)) {
            throw new AuthorizationFailedError("You don't have rights to create seminars for this course")
        }

        const seminarGroup = await transaction.seminarGroup.findFirst({
          where: {
            groupNumber: data.groupNumber,
            deletedAt: null,
            courseSemesterId: data.id,
          },
        });
        if (seminarGroup !== null) {
          throw new DuplicateRecordError('Seminar group with this number already exists!');
        }
        const timeslot = await transaction.timeSlot.create({
          data: {
            ...data.timeslot,
          },
        });
        const seminar = await transaction.seminarGroup.create({
          data: {
            groupNumber: data.groupNumber,
            room: data.room,
            capacity: data.capacity,
            registrationEnd: data.registrationEnd,
            registrationStart: data.registrationStart,
            courseSemester: { connect: { id: data.id } },
            timeSlot: { connect: { id: timeslot.id } },
          },
          include: {
            courseSemester: true,
            timeSlot: true
          }
        });
        return seminar;
      }),
    );
  } catch (e) {
    return Result.err(e as Error);
  }
};

export default createSeminarGroup;
