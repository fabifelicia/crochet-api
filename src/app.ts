/* eslint-disable @typescript-eslint/no-unused-vars */
import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';

import productRouter from './routers/productRouter';
import { errorHandler } from './middlewares/errorHandler';

import { setupSwagger } from './docs/swagger';

const app = express();

app.use(cors());
app.use(express.json());

setupSwagger(app);

app.use('/products', productRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Ok');
});

app.use(errorHandler as unknown as express.ErrorRequestHandler);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not Found' });
});

export default app;
