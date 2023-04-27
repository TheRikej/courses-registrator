import type { CourseStudent, GroupStudent, User, Course, SeminarGroup } from '@prisma/client';
import type { AsyncResult } from '../../types';

export type UserCreateResult = AsyncResult<User>;
  
export type UserDeleteResult = AsyncResult<User & {
    taughtCourses: Course[],
    studiedCourses: CourseStudent[],
    taughtGroups: SeminarGroup[],
    studiedGroups: GroupStudent[],
}>;

export type UserReadSpecificType = AsyncResult<User & {
    taughtCourses: Course[],
    studiedCourses: CourseStudent[],
    taughtGroups: SeminarGroup[],
    studiedGroups: GroupStudent[],
}>;

export type AddStudentCourseReturnType = CourseStudent & { student: User, course: Course };

export type UserAddStudentCourseResult = AsyncResult<AddStudentCourseReturnType>;