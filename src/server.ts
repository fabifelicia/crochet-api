import app from './app';
import sequelize from './database/sequelize';

import dotenv from 'dotenv';

dotenv.config();

const PORT = parseInt(`${process.env.PORT || 3000}`);

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Conexão com BD estabelecida com sucesso.");

    await sequelize.sync({ force: false });
    console.log("Sincronização do banco de dados concluída.");

    app.listen(PORT, () => console.log(`Servidor rodando em ${PORT}.`));

  } catch (error) {
    console.error("Não foi possível conectar ao banco de dados:", error);
  }
}

startServer();
