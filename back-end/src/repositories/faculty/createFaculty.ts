import { Result } from '@badrap/result';
import prisma from '../client';
import type { FacultyCreateData } from './types/data';
import type { FacultyCreateResult } from './types/result';

/**
 * Creates new semseter.
 * 
 * @param data 
 * @returns 
 */
const createFaculty = async (data: FacultyCreateData): FacultyCreateResult => {
  try {
    return Result.ok(
      await prisma.faculty.create({
        data: {
          name: data.name,
        },
      }),
    );
  } catch (e) {
    return Result.err(e as Error);
  }
};

export default createFaculty;
