import type { SeminarGroup, User, GroupStudent, CourseSemester, TimeSlot } from '@prisma/client';
import type { AsyncResult } from '../../types';

export type CourseCreateResult = AsyncResult<SeminarGroup & {
    courseSemester: CourseSemester;
    timeSlot: TimeSlot;
}>;

export type CourseUpdateResult = AsyncResult<SeminarGroup & {
    timeSlot: TimeSlot;
    teachers: User[];
    students: GroupStudent[];
}>;

export type CourseReadAllResult = AsyncResult<(SeminarGroup & {
    teachers: User[];
    students: GroupStudent[];
    currentCapacity: number;
})[]>;


export type SeminarDeleteResult = AsyncResult<SeminarGroup & {
    teachers: User[];
    students: GroupStudent[];
}>;