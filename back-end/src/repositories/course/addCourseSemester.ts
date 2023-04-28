import { Result } from '@badrap/result';
import prisma from '../client';
import type { AddCreateSemesterData } from './types/data';
import type { AddCourseSemesterResult } from './types/result';

/**
 * Enrolls existing student to existing course, that he is not already enrolled in.
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
        
        if (course == null) {
          throw new Error('No course found');
        }
        if (course?.deletedAt != null) {
          throw new Error('The course has already been deleted!');
        }
        
        const courseSemester = await transaction.courseSemester.create({
          data: {
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
