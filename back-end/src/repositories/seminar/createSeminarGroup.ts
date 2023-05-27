import { Result } from '@badrap/result';
import prisma from '../client';
import type { CreateSeminar } from './types/data';
import type { CourseCreateResult } from './types/result';

/**
 * NOT FINISHED
 * 
 * Enrolls existing student to existing course, that he is not already enrolled in.
 * 
 * @param data 
 * @returns 
 */ 

const createSeminarGroup = async (data: CreateSeminar): CourseCreateResult => {
  try {
    return Result.ok(
      await prisma.$transaction(async (transaction) => {
        const course = await transaction.courseSemester.findUnique({
          where: {
            id: data.courseSemesterId,
          },
        });
        
        if (course == null) {
          throw new Error('No course found');
        }
        if (course?.deletedAt != null) {
          throw new Error('The semaster course has already been deleted!');
        }
        
        const seminar = await transaction.seminarGroup.create({
          data: {
            capacity: data.capacity,
            registrationEnd: data.registrationEnd,
            registrationStart: data.registrationStart,
            courseSemester: { connect: { id: data.courseSemesterId } },
          },
          include: {
            courseSemester: true
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
