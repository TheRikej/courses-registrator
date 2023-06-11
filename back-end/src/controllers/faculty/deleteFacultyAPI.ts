import type { Request, Response } from 'express';
import deleteFaculty from '../../repositories/faculty/deleteFaculty';
import {z} from "zod";

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

export default deleteFacultyAPI;