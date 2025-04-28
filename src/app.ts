import 'express-async-errors';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

import productRouter from './routers/productRouter';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/products/', productRouter);


app.use((req: Request, res: Response, next: NextFunction) => {
    res.send("Hello World");
})

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).send(error.message);
})



export default app;
