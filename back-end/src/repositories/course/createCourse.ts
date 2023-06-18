import { Result } from '@badrap/result';
import prisma from '../client';
import type { CourseCreateData } from './types/data';
import type { CourseResult } from './types/result';

/**
 * Creates new course.
 * 
 * @param data 
 * @returns 
 */
// TODO: check faculty/guarantor exists
const createCourse = async (data: CourseCreateData): CourseResult => {
  try {
    const code = data.id.toUpperCase();
    return Result.ok(
      await prisma.course.create({
        data: {
          id: code,
          description: data.description,
          credits: data.credits,
          name: data.name,
          guarantor: { connect: { id: data.guarantorId } },
          faculty: { connect: { id: data.facultyId } },
        },
      }),
    );
  } catch (e) {
    return Result.err(e as Error);
  }
};

export default createCourse;
