import { Result } from '@badrap/result';
import prisma from '../client';
import type { CourseCreateData } from './types/data';
import type { CourseCreateResult } from './types/result';

/**
 * Creates new course.
 * 
 * @param data 
 * @returns 
 */
const createCourse = async (data: CourseCreateData): CourseCreateResult => {
  try {
    return Result.ok(
      await prisma.course.create({
        data: {
          description: data.description,
          name: data.name,
        },
      }),
    );
  } catch (e) {
    return Result.err(e as Error);
  }
};

export default createCourse;
