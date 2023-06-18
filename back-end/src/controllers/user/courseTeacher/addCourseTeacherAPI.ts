import type { Request, Response } from 'express';
import addCourseTeacher from '../../../repositories/user/courseTeacher/addCourseTeacher';
import {z} from "zod";
import { NonexistentRecordError, DeletedRecordError, DuplicateRecordError } from '../../../repositories/errors';

const idSchema = z.object({
    id: z.coerce
      .number({
        required_error: 'User Id is required',
      }),
    enrollCourseId: z
      .string({
        required_error: 'Course Id is required',
      })
  });

const addCourseTeacherAPI = async (req: Request, res: Response) => {
    try {
      const userData = await idSchema.parseAsync(req.params);
      const user = await addCourseTeacher(userData);
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

export default addCourseTeacherAPI;