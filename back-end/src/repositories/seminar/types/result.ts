import type { SeminarGroup, User, GroupStudent, CourseSemester, TimeSlot } from '@prisma/client';
import type { AsyncResult } from '../../types';
import { type } from 'os';

export type SeminarCreateResult = AsyncResult<SeminarGroup & {
    courseSemester: CourseSemester;
    timeSlot: TimeSlot;
}>;

export type SeminarUpdateResult = AsyncResult<SeminarGroup & {
    timeSlot: TimeSlot;
    teachers: User[];
    students: GroupStudent[];
}>;

export type ReadResult = SeminarGroup & {
    timeSlot: TimeSlot;
    teachers: {userName: string}[];
    students: GroupStudent[];
    currentCapacity: number;
}

export type SeminarReadAllResult = AsyncResult<(ReadResult)[]>;

export type SeminarReadSpecificResult = AsyncResult<ReadResult>;

export type SeminarDeleteResult = AsyncResult<SeminarGroup & {
    teachers: User[];
    students: GroupStudent[];
}>;