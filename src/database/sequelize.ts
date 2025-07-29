import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

if (!dbUser || !dbPassword) {
  throw new Error("Database credentials are not set in environment variables.");
}

const sequelize = new Sequelize("crochet", dbUser, dbPassword,
  {
    host: "localhost",
    dialect: "postgres",
    logging: false
  }
);

export default sequelize;