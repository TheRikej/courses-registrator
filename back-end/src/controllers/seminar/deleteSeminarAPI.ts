import type { Request, Response } from 'express';
import deleteSeminar from '../../repositories/seminar/deleteSeminarGroup';
import {z} from "zod";
import { NonexistentRecordError, DeletedRecordError, AuthorizationFailedError } from '../../repositories/errors';

const idSchema = z.object({
    id: z
      .string({
        required_error: 'Id is required',
      })
    })

const deleteSeminarAPI = async (req: Request, res: Response) => {
    try {
      const data = await idSchema.parseAsync(req.params)
      if (req.session?.user === undefined) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const seminar = await deleteSeminar({...data, loggedInUser: req.session.user});
      if (seminar.isOk) {
        return res.status(200).send({
          status: 'success',
          data: seminar.unwrap(),
        });
      }
  
      throw seminar.error;
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

export default deleteSeminarAPI;