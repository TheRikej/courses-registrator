import type { Request, Response } from 'express';
import deleteCourseSemester from '../../repositories/courseSemester/deleteSemesterCourse';
import {z} from "zod";
import { AuthorizationFailedError, DeletedRecordError, NonexistentRecordError } from '../../repositories/errors';

const idSchema = z.object({
    id: z
      .string({
        required_error: 'Id is required',
      })
    })

const deleteCourseSemesterAPI = async (req: Request, res: Response) => {
    try {
      const data = await idSchema.parseAsync(req.params)
      if (req.session?.user === undefined) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const semester = await deleteCourseSemester({...data, loggedInUser: req.session.user});

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

export default deleteCourseSemesterAPI;