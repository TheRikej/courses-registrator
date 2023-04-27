import type { CourseStudent, GroupStudent, User, Course, SeminarGroup } from '@prisma/client';
import type { AsyncResult } from '../../types';

export type CourseCreateResult = AsyncResult<Course>;