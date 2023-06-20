import type { Request, Response } from 'express';
import removeSeminarStudent from '../../../repositories/user/seminarUser/removeSeminarUser';
import {z} from "zod";
import { DeletedRecordError, NonexistentRecordError } from '../../../repositories/errors';

const idSchema = z.object({
    id: z
      .string({
        required_error: 'Id is required',
      }),
    seminarId: z
      .string({
        required_error: 'Id is required',
      }),
    })

const removeSeminarStudentAPI = async (req: Request, res: Response) => {
    try {
      const data = await idSchema.parseAsync(req.params)
      const user = await removeSeminarStudent({id: +data.id, seminarId: data.seminarId});
      if (user.isOk) {
        return res.status(200).send({
          status: 'success',
          data: user.unwrap(),
        });
      }
  
      throw user.error;
    } catch (e) {
        if (e instanceof z.ZodError) {
          console.log(e.message)
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
  
      return res.status(500).send({
        status: 'error',
        error: 'Internal Server Error',
      });
    }
  };

export default removeSeminarStudentAPI;