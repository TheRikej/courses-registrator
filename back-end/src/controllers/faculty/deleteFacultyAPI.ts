import type { Request, Response } from 'express';
import deleteFaculty from '../../repositories/faculty/deleteFaculty';
import {z} from "zod";
import { NonexistentRecordError, DeletedRecordError } from '../../repositories/errors';

const idSchema = z.object({
    id: z
      .string({
        required_error: 'Id is required',
      })
    })

const deleteFacultyAPI = async (req: Request, res: Response) => {
    try {
      const data = await idSchema.parseAsync(req.params)
      const faculty = await deleteFaculty(data);
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
        if (e instanceof NonexistentRecordError) {
            return res.status(404).send({
                status: 'error',
                error: "Faculty with given Id doesn't exist",
            });
        }
        if (e instanceof DeletedRecordError) {
            return res.status(410).send({
                status: 'error',
                error: "Faculty with given Id was deleted",
            });
        }
  
      return res.status(500).send({
        status: 'error',
        error: 'Internal Server Error',
      });
    }
  };

export default deleteFacultyAPI;