import type { Course, CourseSemester } from '@prisma/client';
import type { AsyncResult } from '../../types';

export type CourseResult = AsyncResult<Course>;

export type AllCourseResult = AsyncResult<Course[]>;

export type AddCourseSemesterResult = AsyncResult<CourseSemester>;

export type CourseDeleteResult = AsyncResult<Course>;

export type CourseUpdateResult = AsyncResult<Course>;