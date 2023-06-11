import type { Request, Response } from 'express';
import readAllCourseSemester from '../../repositories/courseSemester/readAllSemesterCourses';
import {z} from 'zod'

const readCourseSemesterSchema = z.object({
    courseId: z
      .string()
      .optional(),
    semesterId: z
      .string()
      .optional(),
    facultyId: z
      .string()
      .optional(),

})

const readCourseSemesterAllAPI = async (req: Request, res: Response) => {
    try {
      const data = await readCourseSemesterSchema.parseAsync(req.body)
      const courseSemesters = await readAllCourseSemester(data);
      if (courseSemesters.isOk) {
        return res.status(200).send({
          status: 'success',
          data: courseSemesters.unwrap(),
        });
      }
  
      throw courseSemesters.error;
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

export default readCourseSemesterAllAPI;