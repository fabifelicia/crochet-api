import { Sequelize } from 'sequelize';
import { env } from '../config/env';
import logger from '../config/logger';

const connectionString = env.DATABASE_URL!;

if (env.NODE_ENV !== 'test' && !connectionString) {
  logger.error('DATABASE_URL not defined');
  throw new Error('DATABASE_URL not defined');
}

const sequelize =
  env.NODE_ENV === 'test'
    ? ({} as Sequelize)
    : new Sequelize(connectionString, {
        dialect: 'postgres',
        protocol: 'postgres',
        logging: false,
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },
      });

export default sequelize;
