import { Sequelize } from 'sequelize';
import { env } from '../config/env';

const connectionString =
  env.NODE_ENV === 'production' ? env.DATABASE_URL! : env.DATABASE_PUBLIC_URL!;

if (!connectionString) {
  throw new Error('DATABASE_URL não definida');
}

const sequelize = new Sequelize(connectionString, {
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
