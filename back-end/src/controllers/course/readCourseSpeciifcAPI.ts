import type { Request, Response } from 'express';
import readSpecificCourse from '../../repositories/course/readSpecificCourse';
import {z} from "zod";
import { DeletedRecordError } from '../../repositories/errors';
import { Prisma } from '@prisma/client';

const idSchema = z.object({
    id: z
      .string({
        required_error: 'Id is required',
      })
    }) //TODO repository takes name as optional input

const readCourseSemesterSpecificAPI = async (req: Request, res: Response) => {
    try {
      const data = await idSchema.parseAsync(req.params)
      const semester = await readSpecificCourse(data);
      if (semester.isOk) {
        return res.status(200).send({
          status: 'success',
          data: semester.unwrap(),
        });
      }
  
      throw semester.error;
    } catch (e) {
        if (e instanceof z.ZodError) {
            return res.status(400).send({
                status: 'error',
                error: e.errors,
            });
        }
        if (e instanceof DeletedRecordError) {
            return res.status(410).send({
                status: 'error',
                error: e.message,
            });
        }
        if (e instanceof Prisma.NotFoundError) {
            return res.status(404).send({
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

export default readCourseSemesterSpecificAPI
