import type { Request, Response } from 'express';
import updateCourseSemester from '../../repositories/courseSemester/updateSemesterCourse';
import {z} from "zod";
import { TimeSlotSchema } from '../types';
import { DeletedRecordError, NonexistentRecordError } from '../../repositories/errors';

const idSchema = z.object({
    id: z
      .string({
        required_error: 'Id is required',
      })
    })
const courseSemesterSchema = z.object({
    registrationStart : z
        .date()
        .optional(),
    registrationEnd : z
        .date()
        .optional(),
    capacity : z
        .number()
        .optional(),
    room: z
        .string()
        .optional(),
    timeSlot: TimeSlotSchema.optional(),
    });

const updateCourseSemesterAPI = async (req: Request, res: Response) => {
    try {
        const id = await idSchema.parseAsync(req.params)
        const courseSemesterData = await courseSemesterSchema.parseAsync(req.body)
        const courseSemester = await updateCourseSemester({
            ...id,
            ...courseSemesterData
        });
        if (courseSemester.isOk) {
          return res.status(200).send({
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
                error: "CourseSemster with given Id doesn't exist",
            });
        }
        if (e instanceof DeletedRecordError) {
            return res.status(410).send({
                status: 'error',
                error: "CourseSemester with given Id was deleted",
            });
        } 
    
        return res.status(500).send({
          status: 'error',
          error: 'Internal Server Error',
        });
      }
    };

export default updateCourseSemesterAPI;