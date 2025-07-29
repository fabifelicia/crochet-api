import Product from "../models/Product";
import sequelize from "../database/sequelize";
import { productsMock } from "../mocks/productsMock";

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
