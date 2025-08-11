/* eslint-disable @typescript-eslint/no-unused-vars */
import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import * as dotenv from 'dotenv';
import cors from 'cors';
import AppError from '@shared/errors/AppError';
import routes from './routes';
import '@shared/container';
import { join } from 'path';

import '../typeorm/database';

dotenv.config();

const app = express();
const port = process.env.PORT || 3335;

app.use(express.json());
app.use(cors());
app.use(routes);


app.use('/public', express.static(`${__dirname}/public`));
app.use('/statics', express.static(join(__dirname, '..', '..', '..', '..', 'tmp')));

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json({ status: 'error', message: err.message });
  }

  console.log(err);

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(port, () => {
  console.log(`Api running 🚀 on port ${port}`);
});
