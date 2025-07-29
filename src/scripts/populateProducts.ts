import Product from "src/models/Product";
import sequelize from "src/database/sequelize";
import { productsMock } from "src/mocks/productsMock";

async function populate() {
  try {
    await sequelize.sync({ force: true });

    await Product.bulkCreate(productsMock);
    console.log("Tabelas populadas com sucesso.");
    process.exit(0);
  } catch (error) {
    console.error("Erro ao popular produtos:", error);
    process.exit(1);
  }
}

populate();
