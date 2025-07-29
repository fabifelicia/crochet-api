import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const connectionString =
  process.env.NODE_ENV === 'production'
    ? process.env.DATABASE_URL!           
    : process.env.DATABASE_PUBLIC_URL!; 

if (!connectionString) {
  throw new Error("DATABASE_URL não definida");
}

const sequelize = new Sequelize(connectionString, {
  dialect: "postgres",
  protocol: "postgres",
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
