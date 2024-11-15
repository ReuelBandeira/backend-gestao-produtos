import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import * as dotenv from 'dotenv';
import cors from 'cors';
// eslint-disable-next-line import/no-extraneous-dependencies
import swaggerUi from 'swagger-ui-express';
// eslint-disable-next-line import/no-extraneous-dependencies
import YAML from 'yamljs';
import AppError from '@shared/errors/AppError';
import path from 'path';
import routes from './routes';
import '@shared/container';

import '../typeorm/database';

dotenv.config();

const app = express();
const port = process.env.PORT || 3333;

// Construir o caminho para o arquivo Swagger YAML
const swaggerFilePath = path.resolve(
  __dirname,
  '../../../../doc-api-swagger.yaml'
);
const swaggerDocument = YAML.load(swaggerFilePath);

// Configuração do Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use(cors());
app.use(routes);

// Configuração para servir arquivos estáticos do diretório 'uploads'
app.use(
  '/uploads',
  express.static(path.resolve(__dirname, '../../../../uploads'))
);

app.use(
  '/public',
  express.static(path.resolve(__dirname, '../../../../public'))
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
