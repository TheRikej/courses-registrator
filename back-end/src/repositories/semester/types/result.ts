import type { Semester } from '@prisma/client';
import type { AsyncResult } from '../../types';

export type SemesterCreateResult = AsyncResult<Semester>;

export type SemesterReadResult = AsyncResult<Semester>;

export type SemesterReadAllResult = AsyncResult<Required<Semester[]>>;

export type SemesterDeleteResult = AsyncResult<Semester>;