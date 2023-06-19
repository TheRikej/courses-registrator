import type { Request, Response } from 'express';
import createSeminar from '../../repositories/seminar/createSeminarGroup';
import {z} from "zod";
import { TimeSlotSchema } from '../types';
import { AuthorizationFailedError, DeletedRecordError, DuplicateRecordError, NonexistentRecordError } from '../../repositories/errors';

const idSchema = z.object({
    id: z
    .string({
      required_error: 'coureSemesterId is required',
    }),
})

const SeminarSchema = z.object({
    registrationStart: z.coerce
      .date({
        required_error: 'registrationStart is required',
      }),
    registrationEnd: z.coerce
      .date({
        required_error: 'registrationEnd is required',
      }),
    room: z
      .string({
        required_error: 'Room is required',
      })
      .trim()
      .min(1, 'Room cannot be empty string'),
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
      const id = await idSchema.parseAsync(req.params)
      const seminarData = await SeminarSchema.parseAsync(req.body);
      if (req.session?.user === undefined) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const seminar = await createSeminar({
        ...id,
        ...seminarData,
        loggedInUser: req.session.user
      });
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
      if (e instanceof AuthorizationFailedError) {
        return res.status(403).send({
            status: 'error',
            error: e.message,
        });
    }
      if (e instanceof NonexistentRecordError) {
        return res.status(404).send({
            status: 'error',
            error: e.message,
        });
    }
    if (e instanceof DeletedRecordError) {
        return res.status(410).send({
            status: 'error',
            error: e.message,
        });
    } 
    if (e instanceof DuplicateRecordError) {
        return res.status(409).send({
            status: 'error',
            error: e.message,
        });
    }

  
      return res.status(500).send({
        status: 'error',
        error: 'Internal Server Error',
      });
    }
  };

export default createUserAPI;