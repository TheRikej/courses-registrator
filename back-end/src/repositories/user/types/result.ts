import type { CourseStudent, GroupStudent, User, SeminarGroup, CourseSemester } from '@prisma/client';
import type { AsyncResult } from '../../types';

export type UserCreateResult = AsyncResult<User>;
  
export type UserDeleteResult = AsyncResult<User & {
    taughtCourses: CourseSemester[],
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

export type TeacherCourseReturnType = User;

export type AddTeacherSeminarReturnType = User;

export type AddStudentSeminarReturnType = GroupStudent & { student: User, group: SeminarGroup };

export type UserAddStudentSeminarReturnType = AsyncResult<AddStudentSeminarReturnType>;

export type UserAddStudentCourseResult = AsyncResult<AddStudentCourseReturnType>;

export type UserAddTeacherCourseResult = AsyncResult<TeacherCourseReturnType>;

export type LoginResult = AsyncResult<User>;

export type UpdateResult = AsyncResult<User>;

export type UserRemoveTeacherResult = AsyncResult<TeacherCourseReturnType>;

export type UserAddTeacherSeminarResult = AsyncResult<AddTeacherSeminarReturnType>;

export type UserRemoveSeminarResult = AsyncResult<number>;

export type UserRemoveStudentCourseResult = AsyncResult<number>;

export type UserReadAllResult = AsyncResult<Required<User[]>>;