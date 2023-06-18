import { Result } from '@badrap/result';
import prisma from '../../client';
import type { addTeacherCourseData } from '../types/data';
import type { UserAddTeacherCourseResult } from '../types/result';
import { AuthorizationFailedError, DeletedRecordError, DuplicateRecordError, NonexistentRecordError } from '../../errors';
import { request } from 'express';

/**
 * Add user to course as teacher.
 * 
 * @param data 
 * @returns 
 */ 

const addCourseTeacher = async (data: addTeacherCourseData): UserAddTeacherCourseResult => {
  try {
    return Result.ok(
      await prisma.$transaction(async (transaction) => {
        
        const user = await transaction.user.findUnique({
          where: {
            id: data.id,
          },
          include: {
            taughtCourses: true,
        }
        });
        if (user === null) {
          throw new NonexistentRecordError('No User found');
        }
        if (user?.deletedAt !== null) {
          throw new DeletedRecordError('The user has already been deleted!');
        }
        const courseSemester = await transaction.courseSemester.findUnique({
          where: {
            id: data.enrollCourseId,
          },
          include: {
            course: true,
            teachers: true,
          }
        });
        if (courseSemester === null) {
          throw new NonexistentRecordError('No CourseSemester found');
        }
        if (courseSemester?.deletedAt !== null) {
          throw new DeletedRecordError('The CourseSemester has already been deleted!');
        }
        if ( request.session.user === undefined || (!request.session.user?.admin
            && courseSemester.course.guarantorId !== request.session.user?.id
            && !courseSemester.teachers.map(x => x.id).includes(request.session.user.id))) {
           throw new AuthorizationFailedError("You don't have right to add teachers to this course")
       }

        const taughtCoursesIds = user.taughtCourses.map(x => x.courseId);
        if (taughtCoursesIds.indexOf(data.enrollCourseId) !== -1){
          throw new DuplicateRecordError('The user has already teaches this course!');
        }
        const userUpdate = await transaction.user.update({
            where: {
              id: data.id,
            },
            data: {
                taughtCourses: {
                    connect: [{ id: data.enrollCourseId }],
                }
            }
          });
          await transaction.courseSemester.update({
            where: {
              id: data.enrollCourseId,
            },
            data: {
              teachers: {
                connect: [{ id: data.id }],
              }
            }
          });
        return userUpdate;
      }),
    );
  } catch (e) {
    return Result.err(e as Error);
  }
};

export default addCourseTeacher;
