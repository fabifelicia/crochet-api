/* eslint-disable @typescript-eslint/no-unused-vars */
import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';

import productRouter from './routers/productRouter';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/products', productRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Ok');
});

app.use(errorHandler);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not Found' });
});

export default app;
