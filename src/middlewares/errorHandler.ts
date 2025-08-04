import { Request, Response, NextFunction } from 'express';
import logger from '../config/logger';

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.error('Erro: %s | Stack: %s', err.message, err.stack);

  const status = err.status || 500;
  const message = err.message || 'Erro interno do servidor';

  res.status(status).json({
    error: {
      message,
      status,
    },
  });
}