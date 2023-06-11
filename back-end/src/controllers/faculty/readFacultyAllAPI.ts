import type { Request, Response } from 'express';
import readAllFaculty from '../../repositories/faculty/readAllFaculty';

const readFacultyAllAPI = async (_: Request, res: Response) => {
    try {
      const faculties = await readAllFaculty();
      if (faculties.isOk) {
        return res.status(200).send({
          status: 'success',
          data: faculties.unwrap(),
        });
      }
  
      throw faculties.error;
    } catch (e) {  
      return res.status(500).send({
        status: 'error',
        error: 'Internal Server Error',
      });
    }
  };

export default readFacultyAllAPI;