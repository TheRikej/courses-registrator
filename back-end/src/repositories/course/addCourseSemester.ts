import { Result } from '@badrap/result';
import prisma from '../client';
import type { AddCreateSemesterData } from './types/data';
import type { AddCourseSemesterResult } from './types/result';
import { DeletedRecordError, NonexistentRecordError } from '../errors';

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
            id: data.id,
          },
        });
        
        if (course === null) {
          throw new NonexistentRecordError('No course found');
        }
        if (course?.deletedAt !== null) {
          throw new DeletedRecordError('The course has already been deleted!');
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
          throw new Error('No semester found');
        }
        if (semseter?.deletedAt !== null) {
          throw new Error('The semester has already been deleted!');
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
