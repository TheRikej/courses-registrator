import { z } from "zod";
import { Day } from '@prisma/client';


export const TimeSlotSchema = z.object({
    day: z.nativeEnum(Day, {
        required_error: "Day is required"
    }),
    startHour: z.number({
        required_error: 'StartHour is required',
      }),
    startMinute: z.number({
        required_error: 'StartMinute is required',
      }),
    endHour: z.number({
        required_error: 'EndHour is required',
      }),
    endMinute: z.number({
        required_error: 'EndMinute is required',
      }),


})


export type ApiResponse<T> = {
    status: 'success';
    data: T;
    message: string;
  } | {
    status: 'failure',
    data: T,
    error: string;
  };

