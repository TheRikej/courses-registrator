import type { CourseStudent, GroupStudent, User, Course, SeminarGroup, CourseSemester } from '@prisma/client';
import type { AsyncResult } from '../../types';

export type UserCreateResult = AsyncResult<User>;
  
export type UserDeleteResult = AsyncResult<User & {
    taughtCourses: Course[],
    studiedCourses: CourseStudent[],
    taughtGroups: SeminarGroup[],
    studiedGroups: GroupStudent[],
}>;

export type UserReadSpecificType = AsyncResult<User & {
    taughtCourses: CourseSemester[],
    studiedCourses: CourseStudent[],
    taughtGroups: SeminarGroup[],
    studiedGroups: GroupStudent[],
}>;

export type AddStudentCourseReturnType = CourseStudent & { student: User, course: CourseSemester };

export type AddStudentSeminarReturnType = GroupStudent & { student: User, group: SeminarGroup };

export type UserAddStudentSeminarReturnType = AsyncResult<AddStudentSeminarReturnType>;

export type UserAddStudentCourseResult = AsyncResult<AddStudentCourseReturnType>;