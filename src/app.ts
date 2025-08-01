import 'express-async-errors';
import express, { Request, Response } from 'express';
import cors from 'cors';

import productRouter from './routers/productRouter';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/products', productRouter);

app.use((error: Error, req: Request, res: Response) => {
  res.status(500).send(error.message);
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route not Found' });
});

app.use((req: Request, res: Response) => {
  res.send('Ok');
});

export default app;
