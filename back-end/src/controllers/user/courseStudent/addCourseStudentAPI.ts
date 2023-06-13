import type { Request, Response } from 'express';
import addCourseStudent from '../../../repositories/user/courseUser/addCourseUser';
import {z} from "zod";
import { Prisma } from '@prisma/client';
import { DeletedRecordError, DuplicateRecordError, NonexistentRecordError, OperationNotAllowedError } from '../../../repositories/errors';

const idSchema = z.object({
    id: z
      .string({
        required_error: 'User Id is required',
      }),
    enrollCourseId: z
      .string({
        required_error: 'Course Id is required',
      })
  });

const addCourseStudentAPI = async (req: Request, res: Response) => {
    try {
      const userData = await idSchema.parseAsync(req.body);
      const user = await addCourseStudent(userData);
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
        if (e instanceof OperationNotAllowedError) {
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

export default addCourseStudentAPI;