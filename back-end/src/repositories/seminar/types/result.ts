import type { SeminarGroup, User, GroupStudent } from '@prisma/client';
import type { AsyncResult } from '../../types';

export type CourseCreateResult = AsyncResult<SeminarGroup>;

export type CourseUpdateResult = AsyncResult<SeminarGroup>;

export type SeminarDeleteResult = AsyncResult<SeminarGroup & {
    teachers: User[],
    students: GroupStudent[],
 }>;