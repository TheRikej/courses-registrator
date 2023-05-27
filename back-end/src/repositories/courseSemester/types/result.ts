import type { CourseStudent, GroupStudent, User, Course, SeminarGroup, CourseSemester } from '@prisma/client';
import type { AsyncResult } from '../../types';

export type CourseSemesterResult = AsyncResult<CourseSemester>;

export type AllCourseSemesterResult = AsyncResult<CourseSemester[]>;

export type AddCourseSemesterResult = AsyncResult<CourseSemester>;