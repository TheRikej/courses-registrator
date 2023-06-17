import type { Course, Faculty } from '@prisma/client';
import type { AsyncResult } from '../../types';

export type FacultyCreateResult = AsyncResult<Faculty>;

export type FacultyReadResult = AsyncResult<Faculty & {
    courses: Course[];
}>;

export type FacultyReadAllResult = AsyncResult<Required<Faculty[]>>;

export type FacultyDeleteResult = AsyncResult<Faculty>;