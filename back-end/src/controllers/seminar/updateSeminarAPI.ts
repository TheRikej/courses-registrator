import type { Request, Response } from 'express';
import updateSeminar from '../../repositories/seminar/updateSeminarGroup';
import {z} from "zod";

const idSchema = z.object({
    id: z
      .string({
        required_error: 'Id is required',
      })
    })

const updateSeminarAPI = async (req: Request, res: Response) => {
    try {
        const data = await idSchema.parseAsync(req.params)
        const seminar = await updateSeminar(data);
        if (seminar.isOk) {
          return res.status(200).send({
            status: 'success',
            data: seminar.unwrap(),
          });
        }
    
        throw seminar.error;
      } catch (e) {
          if (e instanceof z.ZodError) {
              return res.status(404).send({
                  status: 'error',
                  error: e.errors,
              });
          }        
    
        return res.status(500).send({
          status: 'error',
          error: 'Internal Server Error',
        });
      }
    };

export default updateSeminarAPI;