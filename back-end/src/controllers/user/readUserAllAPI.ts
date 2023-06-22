import type { Request, Response } from 'express';
import readAllUser from '../../repositories/user/readAllUser';

const readUserAllAPI = async (_: Request, res: Response) => {
    try {
      const user = await readAllUser();
      if (user.isOk) {
        user.value.forEach(x => x.hashedPassword = null);
        return res.status(200).send({
          status: 'success',
          data: user.unwrap(),
        });
      }
  
      throw user.error;
    } catch (e) {
  
      return res.status(500).send({
        status: 'error',
        error: 'Internal Server Error',
      });
    }
  };

export default readUserAllAPI;