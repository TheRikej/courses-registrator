import type { Request, Response } from 'express';
import updateCourseSemester from '../../repositories/courseSemester/updateSemesterCourse';
import {z} from "zod";
import { TimeSlotSchema } from '../types';
import { AuthorizationFailedError, DeletedRecordError, NonexistentRecordError } from '../../repositories/errors';

const idSchema = z.object({
    id: z
      .string({
        required_error: 'Id is required',
      })
    })
const courseSemesterSchema = z.object({
    registrationStart : z.coerce
        .date()
        .optional(),
    registrationEnd : z.coerce
        .date()
        .optional(),
    capacity : z
        .number()
        .optional(),
    room: z
        .string()
        .optional(),
    timeslot: TimeSlotSchema.optional(),
    });

const updateCourseSemesterAPI = async (req: Request, res: Response) => {
    try {
        const id = await idSchema.parseAsync(req.params)
        const courseSemesterData = await courseSemesterSchema.parseAsync(req.body)
        if (req.session?.user === undefined) {
            return res.status(401).json({ message: "Unauthorized" });
          }
        
        const courseSemester = await updateCourseSemester({
            ...id,
            ...courseSemesterData,
            loggedInUser: req.session.user
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
    
        return res.status(500).send({
          status: 'error',
          error: 'Internal Server Error',
        });
      }
    };

export default updateCourseSemesterAPI;