import { Result } from '@badrap/result';
import prisma from '../client';
import type { addStudentCourseData } from './types/data';
import type { UserAddStudentCourseResult } from './types/result';

/**
 * Enrolls existing student to existing course, that he is not already enrolled in.
 * 
 * @param data 
 * @returns 
 */ 

const addCourseUser = async (data: addStudentCourseData): UserAddStudentCourseResult => {
  try {
    return Result.ok(
      await prisma.$transaction(async (transaction) => {
        const user = await transaction.user.findUnique({
          where: {
            id: data.id,
          },
          include: {
            studiedCourses: true,
        }
        });
        if (user == null) {
          throw new Error('No User found');
        }
        if (user?.deletedAt != null) {
          throw new Error('The user has already been deleted!');
        }
        const course = await transaction.courseSemester.findUnique({
          where: {
            id: data.enrollCourseId,
          },
          include: {
            students: true
          }
        });
        if (course == null) {
          throw new Error('No CourseSemester found');
        }
        if (course?.deletedAt != null) {
          throw new Error('The CourseSemester has already been deleted!');
        }
        const studiedCoursesIds = user.studiedCourses.map(x => x.courseId);
        if (studiedCoursesIds.indexOf(data.enrollCourseId) !== -1){
          throw new Error('The user has already enrolled in this course!');
        }
        const amountOfUsers = course.students.length;
        if (amountOfUsers >= course.capacity){
          throw new Error('This CourseSemester group is full!');
        }
        const courseStudent = await transaction.courseStudent.create({
          data: {
            student: { connect: { id: data.id } },
            course: { connect: { id: data.enrollCourseId } },
          },
          include: {
            student: true,
            course: true
          },
        });
        return courseStudent;
      }),
    );
  } catch (e) {
    return Result.err(e as Error);
  }
};

export default addCourseUser;
