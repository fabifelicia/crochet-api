import Product from "../models/Product";
import { Op } from "sequelize";

async function getProductById(id: number | null): Promise<Product | null> {
  if (id == null) {
    return null;
  }
  return await Product.findByPk(id);
}

async function getProductsByTex(tex: number | null): Promise<Product[]> {
  if (tex == null) {
    return [];
  }

  return await Product.findAll({
    where: {
      tex,
    },
    order: [["id", "ASC"]],
  });
}

async function getProductsByTexRange(
  texStart: number | null,
  texEnd: number | null
): Promise<Product[]> {
  if (texStart == null || texEnd == null) {
    return [];
  }

  return await Product.findAll({
    where: {
      tex: {
        [Op.between]: [texStart, texEnd],
      },
    },
    order: [["id", "ASC"]],
  });
}

async function getProductsByName(name: string): Promise<Product[]> {
  if (!name) {
    return [];
  }

  return await Product.findAll({
    where: {
      name: {
        [Op.iLike]: name,
      },
    },
    order: [["id", "ASC"]],
  });
}


async function getProductsByBrand(brand: string): Promise<Product[]> {
  if (!brand) {
    return [];
  }

  return await Product.findAll({
    where: {
      brand: {
        [Op.iLike]: brand,
      },
    },
    order: [["id", "ASC"]],
  });
}

async function getAllProducts(): Promise<Product[]> {
  return await Product.findAll();
}

export default {
  getProductsByTex,
  getProductsByTexRange,
  getProductsByName,
  getProductsByBrand,
  getProductById,
  getAllProducts,
};
