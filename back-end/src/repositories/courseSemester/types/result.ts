import type { Course, CourseSemester, CourseStudent, SeminarGroup, TimeSlot, User, Semester, Faculty } from '@prisma/client';
import type { AsyncResult } from '../../types';
import { SemesterSeason } from '@prisma/client';

export type CourseSpecific = CourseSemester & {
    teachers: {userName: string, id: number}[];
    students: CourseStudent[];
    seminarGroups: SeminarGroup[];
    currentCapacity: number;
    course: Course & {
        faculty: Faculty,
        guarantor: {userName: string},
    },
    semester: Semester,
    timeSlot: TimeSlot | null,
}

export type CourseSemesterResult = AsyncResult<CourseSpecific>;

export type AllCourseSemesterResult = AsyncResult<({
    course: {
      code: string,
      name: string,
      description: string,
      guarantor: number,
      credits: number,
      faculty: string,
    },
    semesterSeason: SemesterSeason,
    semesterYear: number,
    capacity: number,
    maxCapacity: number,
    registrationEnd: Date,
    registrationStart: Date,
    room: string | null,
    teachers: string[],
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