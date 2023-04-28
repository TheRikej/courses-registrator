import type { CourseStudent, GroupStudent, User, Course, SeminarGroup, CourseSemester } from '@prisma/client';
import type { AsyncResult } from '../../types';

export type CourseCreateResult = AsyncResult<Course>;

export type AddCourseSemesterResult = AsyncResult<CourseSemester>;