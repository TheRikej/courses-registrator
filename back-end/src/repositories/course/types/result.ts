import type { Course, CourseSemester, SeminarGroup } from '@prisma/client';
import type { AsyncResult } from '../../types';

export type CourseResult = AsyncResult<Course>;

export type AllCourseResult = AsyncResult<Course[]>;

export type AddCourseSemesterResult = AsyncResult<CourseSemester & {course: Course}>;

export type CourseDeleteResult = AsyncResult<Course & {
    courseSemesters: (CourseSemester & {
        seminarGroups: SeminarGroup[];
    })[]}>;

export type CourseUpdateResult = AsyncResult<Course & {
    courseSemesters: CourseSemester[];
}>;