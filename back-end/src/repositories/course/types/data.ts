import type { Day } from '@prisma/client';
import { LoggedInUser } from '../../types';

export type CourseCreateData = {
    description: string,
    name: string
    facultyId: string;
    credits: number;
    id: string;
    guarantorId: number,
  };

  export type AddCreateSemesterData = {
    loggedInUser: LoggedInUser,
    id: string,
    semesterId: string,
    registrationEnd: Date,
    registrationStart: Date,
    capacity: number,
    room?: string;
    timeslot?: {
      day:          Day,
      startHour:    number,
      startMinute:  number,
      endHour:      number,
      endMinute:    number,
    }
  };

  export type ReadCourseData = {
    id?: string;
    name?: string;
  }

  export type ReadAllCourseData = {
    facultyId?: string;
  }

  export type DeleteData = {
    loggedInUser: LoggedInUser,
    id: string;
  };

  export type UpdateData = {
    loggedInUser: LoggedInUser,
    id: string,
    description?:      string,
    name?:             string,
    faculty?:          string,
    credits?:          number,
    guarantor?:        number,
    newId?:        string,
  }