import dotenv from 'dotenv';
import logger from './logger';

dotenv.config();

const requiredEnv = ['PORT', 'DATABASE_URL', 'DATABASE_PUBLIC_URL', 'NODE_ENV'];

if (process.env.NODE_ENV !== 'test') {
  for (const key of requiredEnv) {
    if (!process.env[key]) {
      logger.error(`Environment variable ${key} not defined`);
      process.exit(1);
    }
  }
}

export const env = {
  PORT: process.env.PORT as string | 3000,
  DATABASE_URL: process.env.DATABASE_URL as string,
  DATABASE_PUBLIC_URL: process.env.DATABASE_PUBLIC_URL as string,
  NODE_ENV: process.env.NODE_ENV as string,
};
