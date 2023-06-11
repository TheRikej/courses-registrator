import express from 'express';
import API from "../controllers"
import type { Request, Response } from 'express';

// import APIs from '../controllers';

const router = express.Router();

const home = async (req: Request, res: Response) => {
return res.status(200).send({
    status: 'success',
    data: "Yeeeeey",
  });
}

router.get("/", home);

router.get("/user", API.user.readUserAllAPI)
router.post("/user", API.user.createUserAPI)

export default router;
