import type { Course, CourseSemester, SeminarGroup, Faculty, Semester } from '@prisma/client';
import type { AsyncResult } from '../../types';

export type CourseResult = AsyncResult<CourseSpecific>;

export type CreateResult = AsyncResult<Course>;

export type CourseAll = Course & {
    faculty: Faculty,
    guarantor: {userName: string},
};

export type CourseSpecific = Course & {
    faculty: Faculty,
    guarantor: {userName: string},
    courseSemesters: (CourseSemester & {
        semester: Semester,
    })[],
    semesters: string[]
};

export type AllCourseResult = AsyncResult<CourseAll[]>;

export type AddCourseSemesterResult = AsyncResult<CourseSemester & {course: Course}>;

export type CourseDeleteResult = AsyncResult<Course & {
    courseSemesters: (CourseSemester & {
        seminarGroups: SeminarGroup[];
    })[]}>;

export type CourseUpdateResult = AsyncResult<Course & {
    courseSemesters: CourseSemester[];
}>;