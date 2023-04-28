import type { CourseStudent, GroupStudent, User, Course, SeminarGroup, CourseSemester, Semester } from '@prisma/client';
import type { AsyncResult } from '../../types';

export type SemesterCreateResult = AsyncResult<Semester>;
