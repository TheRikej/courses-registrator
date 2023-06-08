import type { CourseSemester, SeminarGroup } from '@prisma/client';
import type { AsyncResult } from '../../types';

export type CourseSemesterResult = AsyncResult<CourseSemester>;

export type AllCourseSemesterResult = AsyncResult<CourseSemester[]>;

export type AddCourseSemesterResult = AsyncResult<CourseSemester>;

export type UpdateCourseSemesterResult = AsyncResult<CourseSemester>;

export type SemesterDeleteResult = AsyncResult<CourseSemester & {
    seminarGroups: SeminarGroup[],
 }>;