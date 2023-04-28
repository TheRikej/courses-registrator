import { Result } from '@badrap/result';
import prisma from '../client';
import type { addStudentSeminarData } from './types/data';
import type { UserAddStudentSeminarReturnType } from './types/result';

/**
 * Enrolls existing student to existing course, that he is not already enrolled in.
 * 
 * DO NOT TEST YET. Not finished.
 * 
 * @param data 
 * @returns 
 */ 

const addSeminarUser = async (data: addStudentSeminarData): UserAddStudentSeminarReturnType => {
  try {
    return Result.ok(
      await prisma.$transaction(async (transaction) => {
        const user = await transaction.user.findUnique({
          where: {
            id: data.id,
          },
          include: {
            studiedCourses: true,
            studiedGroups: {
                include: {
                    group: {
                        select: {
                            courseSemesterId: true,
                        }
                    }
                }
            }
        }
        });
        if (user == null) {
          throw new Error('No User found');
        }
        if (user?.deletedAt != null) {
          throw new Error('The user has already been deleted!');
        }
        const seminarGroup = await transaction.seminarGroup.findUnique({
          where: {
            id: data.enrollSeminarId,
          },
          include: {
            students: true,
          }
        });
        if (seminarGroup == null) {
          throw new Error('No seminar group found');
        }
        if (seminarGroup?.deletedAt != null) {
          throw new Error('The seminar group has already been deleted!');
        }
        const amountOfUsers = seminarGroup.students.length;
        if (amountOfUsers >= seminarGroup.capacity){
          throw new Error('This seminar group is full!');
        }
        const studiedCoursesIds = user.studiedCourses.map(x => x.courseId);
        if (studiedCoursesIds.indexOf(seminarGroup.courseSemesterId) == -1){
          throw new Error('This user is not enrolled in the course for this seminar!');
        }
        const studiedCoursesSeminarIds = user.studiedGroups.map(x => x.group.courseSemesterId);
        if (studiedCoursesSeminarIds.indexOf(seminarGroup.courseSemesterId) !== -1){
          throw new Error('This user is already enrolled in another seminar group of this course!');
        }
        const seminarStudent = await transaction.groupStudent.create({
          data: {
            student: { connect: { id: data.id } },
            group: { connect: { id: data.enrollSeminarId } },
          },
          include: {
            student: true,
            group: true
          }
        });
        return seminarStudent;
      }),
    );
  } catch (e) {
    return Result.err(e as Error);
  }
};

export default addSeminarUser;
