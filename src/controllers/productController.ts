import { Request, Response, NextFunction } from "express";
import productRepository from "../repositories/productRepository";

async function getAllProducts(req: Request, res: Response, next: NextFunction) {
  const products = await productRepository.getAllProducts();
  res.json(products);
}

async function getProductById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.query.id) || null;

    if (!id) {
      res.status(400).json({ message: "Invalid ID" });
    }

    const product = await productRepository.getProductById(id);
    product
      ? res.status(200).json(product)
      : res.status(404).json({ message: "Not Found" });
  } catch (error) {
    next(error);
  }
}

async function getProductsByTex(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const tex = Number(req.params.tex) || null;
    if (!tex) {
      res.status(404).json({ message: "Invalid TEX" });
    }

    const product = await productRepository.getProductsByTex(tex);
    product
      ? res.status(200).json(product)
      : res.status(404).json({ message: "Not Found" });
  } catch (error) {
    next(error);
  }
}

async function getProductsByTexRange(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const texStart = parseInt(req.params.texStart);
    const texEnd = parseInt(req.params.texEnd);

    if (isNaN(texStart) || isNaN(texEnd)) {
      return res.status(400).json({ message: "Invalid TEX range" });
    }

    const product = await productRepository.getProductsByTexRange(
      texStart,
      texEnd
    );
    product
      ? res.status(200).json(product)
      : res.status(404).json({ message: "Not Found" });
  } catch (error) {
    next(error);
  }
}

async function getProductsByBrand(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const brand = req.params.brand;
  const products = await productRepository.getProductsByBrand(brand);
  products.length > 0
    ? res.status(200).json(products)
    : res.status(404).json({ message: "Not Found" });
}

async function getProductsByName(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const name = req.params.name;
  const products = await productRepository.getProductsByName(name);
  products.length > 0
    ? res.status(200).json(products)
    : res.status(404).json({ message: "Not Found" });
}

export default {
  getAllProducts,
  getProductById,
  getProductsByBrand,
  getProductsByName,
  getProductsByTex,
  getProductsByTexRange,
};



