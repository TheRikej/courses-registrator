import type { Request, Response } from 'express';
import removeCourseTeacher from '../../../repositories/user/courseTeacher/removeCourseTeacher';
import {z} from "zod";
import { DeletedRecordError, MissingRelationError, NonexistentRecordError } from '../../../repositories/errors';

const idSchema = z.object({
    id: z.coerce
      .number({
        required_error: 'Id is required',
      }),
    courseId: z
      .string({
        required_error: 'Id is required',
      }),
    })

const removeCourseTeacherAPI = async (req: Request, res: Response) => {
    try {
      const data = await idSchema.parseAsync(req.params)
      const user = await removeCourseTeacher(data);
      if (user.isOk) {
        return res.status(204).send({
          status: 'success',
        });
      }
  
      throw user.error;
    } catch (e) {
        if (e instanceof z.ZodError) {
            return res.status(404).send({
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
        if (e instanceof MissingRelationError) {
            return res.status(204).send({
                status: 'success',
                error: e.message,
            });
        }         
  
      return res.status(500).send({
        status: 'error',
        error: 'Internal Server Error',
      });
    }
  };

export default removeCourseTeacherAPI;