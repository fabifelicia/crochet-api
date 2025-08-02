import app from './app';
import sequelize from './database/sequelize';

import { env } from './config/env';

const PORT = parseInt(`${env.PORT}`);

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Connection to DB successfully established.');

    await sequelize.sync({ force: false });
    console.log('Database synchronization complete.');

    app.listen(PORT, () => console.log(`Server running on ${PORT}.`));
  } catch (error) {
    console.error('Could not connect to database', error);
  }
}

startServer();
