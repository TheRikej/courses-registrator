import type { Day } from '@prisma/client';

export type CreateSeminar = {
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
    id: string;
  };

  export type UpdateData = {
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

  export type ReadSpecificSeminar = {
    id: string
  }