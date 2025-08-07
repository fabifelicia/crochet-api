import app from './app';
import sequelize from './database/sequelize';
import logger from './config/logger';

import { env } from './config/env';

const PORT = parseInt(`${env.PORT}`);

async function startServer() {
  try {
    await sequelize.authenticate();
    logger.info('Connection to DB successfully established.');

    await sequelize.sync({ force: false });
    logger.info('Database synchronization complete.');

    app.listen(PORT, () => logger.info(`Server running on ${PORT}.`));
  } catch (error) {
    logger.error('Could not connect to database', error);
  }
}

startServer();
