import type { Request, Response } from 'express';
import createSeminar from '../../repositories/seminar/createSeminarGroup';
import {z} from "zod";
import { TimeSlotSchema } from '../types';
import { Prisma } from '@prisma/client';

const SeminarSchema = z.object({
    registrationStart: z
      .date({
        required_error: 'registrationStart is required',
      }),
    registrationEnd: z
      .date({
        required_error: 'registrationEnd is required',
      }),
    room: z
      .string({
        required_error: 'Room is required',
      })
      .trim()
      .min(1, 'Room cannot be empty string'),
    courseSemesterId: z
      .string({
        required_error: 'coureSemesteId is required',
      }),
    capacity: z
      .number({
        required_error: 'Capacity is required',
      }),
    groupNumber: z
      .number({
        required_error: 'GroupNumber is required',
      }),
    timeslot: TimeSlotSchema,
  });

const createUserAPI = async (req: Request, res: Response) => {
    try {
      const seminarData = await SeminarSchema.parseAsync(req.body);
      const seminar = await createSeminar(seminarData);
      if (seminar.isOk) {
        return res.status(201).send({
          status: 'success',
          data: seminar.unwrap(),
        });
      }
  
      throw seminar.error;
    } catch (e) {
      if (e instanceof z.ZodError) {
        return res.status(400).send({
          status: 'error',
          error: e.errors,
        });
      }
  
      return res.status(500).send({
        status: 'error',
        error: 'Internal Server Error',
      });
    }
  };

export default createUserAPI;