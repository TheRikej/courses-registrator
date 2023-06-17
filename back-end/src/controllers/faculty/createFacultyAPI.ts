import type { Request, Response } from 'express';
import createFaculty from '../../repositories/faculty/createFaculty';
import {z} from "zod";
import { DuplicateRecordError } from '../../repositories/errors';

const facultySchema = z.object({
    name: z
      .string({
        required_error: 'name is required',
      })
      .trim()
      .min(1, "Faculty name cannot be empty"),
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

    if (e instanceof DuplicateRecordError) {
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

export default createFacultyAPI;