import { Result } from '@badrap/result';
import prisma from '../client';
import type { CourseCreateData } from './types/data';
import type { CreateResult } from './types/result';
import { NonexistentRecordError, DeletedRecordError } from '../errors';

/**
 * Creates new course.
 * 
 * @param data 
 * @returns 
 */
const createCourse = async (data: CourseCreateData): CreateResult => {
  try {
    const code = data.id.toUpperCase();
    return Result.ok(
        await prisma.$transaction(async (transaction) => {
            const guarantor = await transaction.user.findUnique({
                where: {
                  id: data.guarantorId
                },
              });
              if (guarantor === null) {
                throw new NonexistentRecordError('No user found');
              }
              if (guarantor.deletedAt !== null) {
                throw new DeletedRecordError('The guarantor has been deleted!');
              }

            const faculty = await transaction.faculty.findUnique({
                where: {
                  id: data.facultyId
                },
              });
              if (faculty === null) {
                throw new NonexistentRecordError('No faculty found');
              }
              if (faculty.deletedAt !== null) {
                throw new DeletedRecordError('The faculty has been deleted!');
              }
              
            return await transaction.course.create({
                data: {
                id: code,
                description: data.description,
                credits: data.credits,
                name: data.name,
                guarantor: { connect: { id: data.guarantorId } },
                faculty: { connect: { id: data.facultyId } },
                },
            });
        })
    );
  } catch (e) {
    return Result.err(e as Error);
  }
};

export default createCourse;
