import { Result } from '@badrap/result';
import prisma from '../client';
import type { UpdateData } from './types/data';
import type { CourseUpdateResult } from './types/result';
import { DeletedRecordError, NonexistentRecordError } from '../errors';


const updateCourse = async (data: UpdateData): CourseUpdateResult => {
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
        if (course.deletedAt !== null) {
          throw new DeletedRecordError('The course has been deleted!');
        }
        const update = await transaction.course.update({
          where: {
            id: data.id.toUpperCase(),
          },
          data: {
            ...(data.credits !== undefined ? { credits: data.credits } : {}),
            ...(data.description !== undefined ? { description: data.description } : {}),
            ...(data.name !== undefined ? { name: data.name } : {}),
            ...(data.faculty !== undefined ? { faculty: { connect: { id: data.faculty } } } : {}),
            ...(data.guarantor !== undefined ? { guarantor: { connect: { id: data.guarantor } } } : {}),
          },
          include: {
            courseSemesters: true,
          },
        });
        return update;
      }),
    );
  } catch (e) {
    return Result.err(e as Error);
  }
};

export default updateCourse;
