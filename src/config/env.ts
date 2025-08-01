import dotenv from 'dotenv'

dotenv.config()

const requiredEnv = ["PORT", "DATABASE_URL", "DATABASE_PUBLIC_URL", "NODE_ENV"];

for (const key of requiredEnv) {
  if(!process.env[key]) {
    console.error(`A variável de ambiente ${key} não foi definida`)
    process.exit(1)
  }
}

export const env = {
  PORT: process.env.PORT as string,
  DATABASE_URL: process.env.DATABASE_URL as string,
  DATABASE_PUBLIC_URL: process.env.DATABASE_PUBLIC_URL as string,
  NODE_ENV: process.env.NODE_ENV as string,
};