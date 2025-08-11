/* eslint-disable @typescript-eslint/no-unused-vars */

import type { ErrorRequestHandler } from 'express';
import logger from '../config/logger';
import { AppError } from '../errors/AppError';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  logger.error('Erro: %s | Stack: %s', err.message, err.stack);

  if (err instanceof AppError) {
    res.status(err.status).json({
      error: {
        message: err.message,
        status: err.status,
      },
    });
    return;
  }

  res.status(500).json({
    error: {
      status: 500,
      message: 'Internal Server Error',
    },
  });
};
