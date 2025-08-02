import { Sequelize } from 'sequelize';
import { env } from '../config/env';

const connectionString =
  env.NODE_ENV === 'production' ? env.DATABASE_URL! : env.DATABASE_PUBLIC_URL!;

if (env.NODE_ENV !== 'test' && !connectionString) {
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
