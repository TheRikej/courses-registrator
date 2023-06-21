import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { env } from 'process';
import type { ApiResponse } from './controllers/types';
import router from './routes';
import cookieParser from 'cookie-parser';
import session from './middleware/sessionMiddleware';

declare module 'express-session' {
    interface SessionData { user: { 
        id: number, 
        admin: boolean, 
        teacher: boolean, 
        student: boolean 
    }}
}

config();
const app = express();
const port = env.PORT ?? 4000;

// middlware
app.use(cors({
    origin: 'http://localhost:5173',
    //origin: 'http://127.0.0.1:5173',
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE'],
    credentials: true,
  }));
app.use(cookieParser());
app.use(express.json());

// parse URL encoded strings
app.use(express.urlencoded({ extended: true }));
app.use(session());


app.use(router);

// No route was taken - 404 - Resource (API endpoint) not found.
app.use((_req, res) => {
  const response: ApiResponse<NonNullable<unknown>> = {
    status: 'failure',
    data: {},
    error: 'No matching endpoint was found.',
  };

  return res.status(404).send(response);
});

if (env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(
      `[${new Date().toISOString()}] RESTful API for Course Registrator is listening on port ${port}`,
    );
  });
}

export default app;
