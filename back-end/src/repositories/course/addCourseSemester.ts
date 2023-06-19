import { Result } from '@badrap/result';
import prisma from '../client';
import type { AddCreateSemesterData } from './types/data';
import type { AddCourseSemesterResult } from './types/result';
import { AuthorizationFailedError, DeletedRecordError, DuplicateRecordError, NonexistentRecordError } from '../errors';

/**
 * Creates CourseSemester for semester and course
 * 
 * @param data 
 * @returns 
 */ 

const addCourseSemester = async (data: AddCreateSemesterData): AddCourseSemesterResult => {
  try {
    return Result.ok(
      await prisma.$transaction(async (transaction) => {
        const course = await transaction.course.findUnique({
          where: {
            id: data.id.toUpperCase(),
          },
        });
        
        if (course === null) {
          throw new NonexistentRecordError('No course found');
        }
        if (course?.deletedAt !== null) {
          throw new DeletedRecordError('The course has already been deleted!');
        }
        if (course.guarantorId !== data.loggedInUser.id && !data.loggedInUser.admin) {
            throw new AuthorizationFailedError("You don't have rights to assign this course to new semester")
        }
        let timeslot = undefined;
        if (data.timeslot !== undefined){
          timeslot = await transaction.timeSlot.create({
            data: {
              ...data.timeslot
            },
          });
        }
        const semseter = await transaction.semester.findUnique({
          where: {
            id: data.semesterId,
          },
        });
        
        if (semseter === null) {
          throw new NonexistentRecordError('No semester found');
        }
        if (semseter?.deletedAt !== null) {
          throw new DeletedRecordError('The semester has already been deleted!');
        }

        const query = await transaction.courseSemester.findFirst({
            where: {
                courseId: data.id,
                semesterId: data.semesterId
            }
        })
        if (query !== null) {
            throw new DuplicateRecordError("Course is already thought in the given semester")
        }
        
        const courseSemester = await transaction.courseSemester.create({
          data: {
            ...(data?.room !== undefined ? { room: data.room} : {}),
            ...(timeslot !== undefined ? { timeSlot: { connect: { id: timeslot.id } } } : {}),
            capacity: data.capacity,
            registrationEnd: data.registrationEnd,
            registrationStart: data.registrationStart,
            course: { connect: { id: data.id } },
            semester: { connect: { id: data.semesterId } }
          },
          include: {
            course: true
          }
        });
        return courseSemester;
      }),
    );
  } catch (e) {
    return Result.err(e as Error);
  }
};

export default addCourseSemester;

