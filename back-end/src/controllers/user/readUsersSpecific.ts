import type { Request, Response } from 'express';
import readSpecificUser from '../../repositories/user/readSpecificUser';
import {z} from "zod";
import { DeletedRecordError } from '../../repositories/errors';
import { Prisma } from '@prisma/client';

const idSchema = z.object({
    id: z.coerce
      .number({
        required_error: 'Id is required',
      })
    })

const readUserSpecificAPI = async (req: Request, res: Response) => {
    try {
      const data = await idSchema.parseAsync(req.params)
      const user = await readSpecificUser(data);
      if (user.isOk) {
        return res.status(200).send({
          status: 'success',
          data: user.unwrap(),
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
        if (e instanceof Prisma.NotFoundError) {
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

export default readUserSpecificAPI;