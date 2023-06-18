import { Result } from '@badrap/result';
import prisma from '../client';
import type { UpdateData } from './types/data';
import type { UpdateCourseSemesterResult } from './types/result';
import { AuthorizationFailedError, DeletedRecordError, NonexistentRecordError } from '../errors';

const updateCourseSemester = async (data: UpdateData): UpdateCourseSemesterResult => {
  try {
    return Result.ok(
      await prisma.$transaction(async (transaction) => {
        const courseSemester = await transaction.courseSemester.findUnique({
          where: {
            id: data.id,
          },
          include: {
            course: true
          }
        });
        if (courseSemester === null) {
          throw new NonexistentRecordError('No course semester found');
        }
        if (courseSemester.deletedAt !== null) {
          throw new DeletedRecordError('The course semester has been deleted!');
        }
        if (courseSemester.course.guarantorId !== data.loggedInUser.id && !data.loggedInUser.admin) {
            throw new AuthorizationFailedError("You don't have rights to update this course")
        }
        
        let timeslot = undefined;
        if (data.timeslot !== undefined){
          timeslot = await transaction.timeSlot.create({
            data: {
              ...data.timeslot
            },
          });
        }
        const update = await transaction.courseSemester.update({
          where: {
            id: data.id,
          },

          data: {
            ...(data.capacity !== undefined ? { capacity: data.capacity } : {}),
            ...(data.registrationStart !== undefined ? { registrationStart: data.registrationStart } : {}),
            ...(data.registrationEnd !== undefined ? { registrationEnd: data.registrationEnd } : {}),
            ...(data.room !== undefined ? { room: data.room } : {}),
            ...(timeslot !== undefined ? { timeSlot: { connect: { id: timeslot.id } } } : {}),
          },
          include: {
            seminarGroups: true,
            students: true,
            teachers: true,
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

export default updateCourseSemester;
