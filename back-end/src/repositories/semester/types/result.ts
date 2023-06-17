import type { CourseSemester, Semester, SeminarGroup } from '@prisma/client';
import type { AsyncResult } from '../../types';

export type SemesterCreateResult = AsyncResult<Semester>;

export type SemesterReadResult = AsyncResult<Semester & {
    courseSemesters: CourseSemester[];
}>;

export type SemesterReadAllResult = AsyncResult<Required<Semester[]>>;

export type SemesterDeleteResult = AsyncResult<Semester & {
    courseSemesters: (CourseSemester & {
        seminarGroups: SeminarGroup[];
    })[];
}>;