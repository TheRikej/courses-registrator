import type { Faculty } from '@prisma/client';
import type { AsyncResult } from '../../types';

export type FacultyCreateResult = AsyncResult<Faculty>;

export type FacultyReadResult = AsyncResult<Faculty>;

export type FacultyReadAllResult = AsyncResult<Required<Faculty[]>>;