import type { CourseStudent, GroupStudent, User, SeminarGroup, CourseSemester, Course } from '@prisma/client';
import type { AsyncResult } from '../../types';

export type UserCreateResult = AsyncResult<User>;
  
export type UserDeleteResult = AsyncResult<User & {
    taughtCourses: CourseSemester[];
    taughtGroups: SeminarGroup[];
    studiedCourses: CourseStudent[];
    studiedGroups: GroupStudent[];
}>;

export type UserReadSpecificType = AsyncResult<User & {
    taughtCourses: CourseSemester[];
    taughtGroups: SeminarGroup[];
    studiedCourses: (CourseStudent & {course: CourseSemester})[];
    studiedGroups: (GroupStudent & {group: SeminarGroup})[];
    guarantedCourses: Course[];
}>;

export type UserReadSpecificProtectedType = AsyncResult<UserWithoutPassword & {
    taughtCourses: CourseSemester[];
    taughtGroups: SeminarGroup[];
    studiedCourses: (CourseStudent & {course: CourseSemester})[];
    studiedGroups: (GroupStudent & {group: SeminarGroup})[];
    guarantedCourses: Course[];
}>;

export type UserWithoutPassword = {
    id: number;
    userName: string;
    email: string;
    createdAt: Date;
    hashedPassword: string | null;
    administrator: boolean;
    teacher: boolean;
    student: boolean;
    deletedAt: Date | null;
}

export type UserReadAllResult = AsyncResult<Required<UserWithoutPassword[]>>;

export type LoginResult = AsyncResult<User>;

export type UpdateResult = AsyncResult<User>;

export type AddStudentCourseReturnType = CourseStudent & { student: User, course: CourseSemester };

export type TeacherCourseReturnType = User;

export type AddTeacherSeminarReturnType = User;

export type AddStudentSeminarReturnType = GroupStudent & { student: User, group: SeminarGroup };

export type UserAddStudentSeminarReturnType = AsyncResult<AddStudentSeminarReturnType>;

export type UserAddStudentCourseResult = AsyncResult<AddStudentCourseReturnType>;

export type UserAddTeacherCourseResult = AsyncResult<TeacherCourseReturnType>;

export type UserRemoveTeacherResult = AsyncResult<TeacherCourseReturnType>;

export type UserAddTeacherSeminarResult = AsyncResult<AddTeacherSeminarReturnType>;

export type UserRemoveSeminarResult = AsyncResult<number>;

export type UserRemoveStudentCourseResult = AsyncResult<number>;
