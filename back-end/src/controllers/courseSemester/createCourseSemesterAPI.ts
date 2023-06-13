import type { Request, Response } from 'express';
import createCourseSemester from '../../repositories/course/addCourseSemester';
import {z} from "zod";
import { TimeSlotSchema } from '../types';
import { DeletedRecordError, DuplicateRecordError, NonexistentRecordError } from '../../repositories/errors';

const idSchema = z.object({
    id: z
      .string({
        required_error: 'Id is required',
      }),
    })

const courseSemesterSchema = z.object({
    semesterId: z
      .string({
        required_error: 'SemesterId is required',
    }),
    registrationStart : z.coerce
      .date({
        required_error: "SemesterStart is required"
    }),
    registrationEnd : z.coerce
      .date({
        required_error: "SemesterEnd is required"
    }),
    capacity : z
      .number({
        required_error: "Capacity is required"
    }),
    room: z
      .string()
      .optional(),
    timeslot: TimeSlotSchema.optional(),
  });

const createCourseSemesterAPI = async (req: Request, res: Response) => {
    try {
      const id = await idSchema.parseAsync(req.params)
      const courseSemesterData = await courseSemesterSchema.parseAsync(req.body);
      const courseSemester = await createCourseSemester({
        ...courseSemesterData,
        ...id,
      });
      if (courseSemester.isOk) {
        return res.status(201).send({
          status: 'success',
          data: courseSemester.unwrap(),
        });
      }
  
      throw courseSemester.error;
    } catch (e) {
      if (e instanceof z.ZodError) {
        return res.status(400).send({
          status: 'error',
          error: e.errors,
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

export default createCourseSemesterAPI;