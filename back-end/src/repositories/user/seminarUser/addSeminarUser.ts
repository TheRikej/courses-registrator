import { Result } from '@badrap/result';
import prisma from '../../client';
import type { addStudentSeminarData } from '../types/data';
import type { UserAddStudentSeminarReturnType } from '../types/result';
import { DeletedRecordError, NonexistentRecordError, OperationNotAllowedError } from '../../errors';

/**
 * Enrolls existing student to existing seminar, that he is not already enrolled in.
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
            studiedCourses: {
              where: {
                deletedAt: null
              }
            },
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
        if (user === null) {
          throw new NonexistentRecordError('No User found');
        }
        if (user?.deletedAt !== null) {
          throw new DeletedRecordError('The user has already been deleted!');
        }
        const seminarGroup = await transaction.seminarGroup.findUnique({
          where: {
            id: data.enrollSeminarId,
          },
          include: {
            students: true,
          }
        });
        if (seminarGroup === null) {
          throw new NonexistentRecordError('No seminar group found');
        }
        if (seminarGroup?.deletedAt !== null) {
          throw new DeletedRecordError('The seminar group has already been deleted!');
        }
        const amountOfUsers = seminarGroup.students.length;
        if (amountOfUsers >= seminarGroup.capacity){
          throw new OperationNotAllowedError('This seminar group is full!');
        }
        const currentDate = new Date();
        if (seminarGroup.registrationStart > currentDate) {
          throw new OperationNotAllowedError('Registration for this group has not begun yet!');
        }
        if (seminarGroup.registrationEnd < currentDate) {
          throw new OperationNotAllowedError('Registration for this group has already ended yet!');
        }
        const studiedCoursesIds = user.studiedCourses.filter(x => x.deletedAt === null).map(x => x.courseId);
        if (studiedCoursesIds.indexOf(seminarGroup.courseSemesterId) === -1){
          throw new OperationNotAllowedError('This user is not enrolled in the course for this seminar!');
        }
        const studiedCoursesSeminarIds = user.studiedGroups.filter(x => x.groupId === data.enrollSeminarId).map(x => x.id);
        const studiedCoursesSeminarIdsFiltered = user.studiedGroups.filter(x => x.deletedAt === null).map(x => x.group.courseSemesterId);
        const index = studiedCoursesSeminarIds.length;
        const indexFiltered = studiedCoursesSeminarIdsFiltered.indexOf(seminarGroup.courseSemesterId);
        if (indexFiltered !== -1){
          throw new OperationNotAllowedError('This user is already enrolled in another seminar group of this course!');
        }
        if (index > 0){
          const seminarStudent = await transaction.groupStudent.update({
            where: {
              id: studiedCoursesSeminarIds[0]
            },
            data: {
              deletedAt: null
            },
            include: {
              student: true,
              group: true
            }
          });
          return seminarStudent;
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
