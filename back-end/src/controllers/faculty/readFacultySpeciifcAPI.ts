import type { Request, Response } from 'express';
import readSpecificFaculty from '../../repositories/faculty/readSpecificFaculty';
import {z} from "zod";
import { DeletedRecordError } from '../../repositories/errors';
import { Prisma } from '@prisma/client';

const idSchema = z.object({
    id: z
      .string({
        required_error: 'Id is required',
      })
    }) //TODO possibly use name

const readFacultySpecificAPI = async (req: Request, res: Response) => {
    try {
      const data = await idSchema.parseAsync(req.params)
      const faculty = await readSpecificFaculty(data);
      if (faculty.isOk) {
        return res.status(200).send({
          status: 'success',
          data: faculty.unwrap(),
        });
      }
  
      throw faculty.error;
    } catch (e) {
        if (e instanceof z.ZodError) {
            return res.status(400).send({
                status: 'error',
                error: e.errors,
            });
        }
        if (e instanceof Prisma.NotFoundError) {
            return res.status(404).send({
                status: 'error',
                error: "Course with given Id doesn't exist",
            });
        }
        if (e instanceof DeletedRecordError) {
            return res.status(410).send({
                status: 'error',
                error: "Course with given Id was deleted",
            });
        }     
  
      return res.status(500).send({
        status: 'error',
        error: 'Internal Server Error',
      });
    }
  };

export default readFacultySpecificAPI;