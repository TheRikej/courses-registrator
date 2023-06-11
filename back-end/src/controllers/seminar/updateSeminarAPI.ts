import type { Request, Response } from 'express';
import updateSeminar from '../../repositories/seminar/updateSeminarGroup';
import {z} from "zod";
import { TimeSlotSchema } from '../types';

const idSchema = z.object({
    id: z
      .string({
        required_error: 'Id is required',
      })
    })

const SeminarSchema = z.object({
    registrationStart: z
        .date()
        .optional(),
    registrationEnd: z
        .date()
        .optional(),
    room: z
        .string()
        .trim()
        .min(1, 'Room cannot be empty string')
        .optional(),
    capacity: z
        .number()
        .optional(),
    groupNumber: z
        .number()
        .optional(),
    timeslot: TimeSlotSchema.optional(),
    });

const updateSeminarAPI = async (req: Request, res: Response) => {
    try {
        const id = await idSchema.parseAsync(req.params)
        const seminarData = await SeminarSchema.parseAsync(req.body)
        const seminar = await updateSeminar({
            ...id,
            ...seminarData,
        });
        if (seminar.isOk) {
          return res.status(200).send({
            status: 'success',
            data: seminar.unwrap(),
          });
        }
    
        throw seminar.error;
      } catch (e) {
          if (e instanceof z.ZodError) {
              return res.status(404).send({
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

export default updateSeminarAPI;