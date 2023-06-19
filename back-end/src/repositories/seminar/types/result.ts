import type { SeminarGroup, User, GroupStudent, CourseSemester, TimeSlot } from '@prisma/client';
import type { AsyncResult } from '../../types';
import { type } from 'os';

export type CourseCreateResult = AsyncResult<SeminarGroup & {
    courseSemester: CourseSemester;
    timeSlot: TimeSlot;
}>;

export type CourseUpdateResult = AsyncResult<SeminarGroup & {
    timeSlot: TimeSlot;
    teachers: User[];
    students: GroupStudent[];
}>;

export type ReadAllResult = SeminarGroup & {
    timeSlot: TimeSlot;
    teachers: {userName: string}[];
    students: GroupStudent[];
    currentCapacity: number;
}

export type CourseReadAllResult = AsyncResult<(ReadAllResult)[]>;


export type SeminarDeleteResult = AsyncResult<SeminarGroup & {
    teachers: User[];
    students: GroupStudent[];
}>;