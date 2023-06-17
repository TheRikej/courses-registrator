import express from 'express';
import cors from 'cors';
// import { config as configEnvVariables } from 'dotenv';
import { env } from 'process';
import type { ApiResponse } from './controllers/types';
import router from './routes';

// configEnvVariables(); TODO check
const app = express();
const port = env.PORT ?? 4000;

// middlware
app.use(cors());
app.use(express.json());

// parse URL encoded strings
app.use(express.urlencoded({ extended: true }));

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
