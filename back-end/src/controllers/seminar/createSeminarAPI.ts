import type { Request, Response } from 'express';
import createSeminar from '../../repositories/seminar/createSeminarGroup';
import {z} from "zod";
import { TimeSlotSchema } from '../types';
import { Prisma } from '@prisma/client';

const UserSchema = z.object({
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
      const seminarData = await UserSchema.parseAsync(req.body);
      const user = await createSeminar(seminarData);
      if (user.isOk) {
        return res.status(201).send({
          status: 'success',
          data: user.unwrap(),
        });
      }
  
      throw user.error;
    } catch (e) {
      if (e instanceof z.ZodError) {
        return res.status(400).send({
          status: 'error',
          error: e.errors,
        });
      }
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(409).send({
            status: 'error',
            error: "Email already in use",
          });
        }
  
      return res.status(500).send({
        status: 'error',
        error: 'Internal Server Error',
      });
    }
  };

export default createUserAPI;