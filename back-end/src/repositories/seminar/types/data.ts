import type { Day } from '@prisma/client';

export type CreateSeminar = {
    registrationStart: Date,
    registrationEnd:   Date,
    capacity:          number,
    courseSemesterId:  string,
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