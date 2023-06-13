import { Result } from '@badrap/result';
import prisma from '../client';
import type { FacultyCreateData } from './types/data';
import type { FacultyCreateResult } from './types/result';
import { DuplicateRecordError } from '../errors';

/**
 * Creates new faculty.
 * 
 * @param data 
 * @returns 
 */
const createFaculty = async (data: FacultyCreateData): FacultyCreateResult => {
  try {
    const faculty = await prisma.faculty.findFirst({
      where: {
          name: data.name,
      },
    });
    if (faculty !== null) {
      throw new DuplicateRecordError("Faculty with this name already exists!");
    }
    return Result.ok(await prisma.$transaction(async (transaction) => {
      const faculty = await transaction.faculty.create({
        data: {
          name: data.name,
        },
      })
      return faculty;
    }),
    );
  } catch (e) {
    return Result.err(e as Error);
  }
};

export default createFaculty;
