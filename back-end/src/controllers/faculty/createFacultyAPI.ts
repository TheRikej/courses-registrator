import type { Request, Response } from 'express';
import createFaculty from '../../repositories/faculty/createFaculty';
import {z} from "zod";

const facultySchema = z.object({
    name: z
      .string({
        required_error: 'name is required',
      }),
  });

const createFacultyAPI = async (req: Request, res: Response) => {
    try {
      const facultyData = await facultySchema.parseAsync(req.body);
      const faculty = await createFaculty(facultyData);
      if (faculty.isOk) {
        return res.status(201).send({
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
  
      return res.status(500).send({
        status: 'error',
        error: 'Internal Server Error',
      });
    }
  };

export default createFacultyAPI;