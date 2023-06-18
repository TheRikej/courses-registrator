import type { Day } from '@prisma/client';
import { LoggedInUser } from '../../types';

export type CreateSeminar = {
    loggedInUser: LoggedInUser
    registrationStart: Date,
    registrationEnd:   Date,
    capacity:          number,
    id:  string,
    timeslot: {
      day:               Day,
      startHour:    number,
      startMinute:  number,
      endHour:      number,
      endMinute:    number,
    },
    room: string,
    groupNumber: number,
  };

  export type DeleteData = {
    loggedInUser: LoggedInUser
    id: string;
  };

  export type UpdateData = {
    loggedInUser: LoggedInUser
    id: string,
    registrationStart?: Date,
    registrationEnd?:   Date,
    capacity?:          number,
    groupNumber?:       number,
    timeslot?: {
      day:          Day,
      startHour:    number,
      startMinute:  number,
      endHour:      number,
      endMinute:    number,
    }
    room?:              string,
  };

  export type ReadAllSeminar = {
    id: string
  }