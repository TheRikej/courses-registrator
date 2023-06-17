import type { Course, CourseSemester, CourseStudent, SeminarGroup, TimeSlot, User } from '@prisma/client';
import type { AsyncResult } from '../../types';

export type CourseSemesterResult = AsyncResult<CourseSemester & {
    teachers: User[];
    students: CourseStudent[];
    seminarGroups: SeminarGroup[];
}>;

export type AllCourseSemesterResult = AsyncResult<(CourseSemester & {
    course: Course;
})[]>;

export type AddCourseSemesterResult = AsyncResult<CourseSemester>;

export type UpdateCourseSemesterResult = AsyncResult<CourseSemester & {
    timeSlot: TimeSlot | null;
    teachers: User[];
    students: CourseStudent[];
    seminarGroups: SeminarGroup[];
}>;

export type SemesterDeleteResult = AsyncResult<CourseSemester & {
    seminarGroups: SeminarGroup[];
    teachers: User[];
    students: CourseStudent[];
}>;