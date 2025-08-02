import { RequestHandler } from 'express';
import productRepository from '../repositories/productRepository';

export async function getProductByIdQuery(id: number) {
  if (!id || isNaN(id)) {
    throw { status: 400, message: 'Invalid ID' };
  }
  const product = await productRepository.getProductById(id);
  if (!product) throw { status: 404, message: 'Product Not Found' };
  return product;
}

export async function getProductsByBrandQuery(brand: string) {
  const products = await productRepository.getProductsByBrand(brand);
  if (!products.length) throw { status: 404, message: 'Brand Not Found' };
  return products;
}

export async function getProductsByNameQuery(name: string) {
  const products = await productRepository.getProductsByName(name);
  if (!products.length) throw { status: 404, message: 'Name Not Found' };
  return products;
}

export async function getProductsByTexQuery(tex: number) {
  if (!tex || isNaN(tex)) {
    throw { status: 400, message: 'Invalid TEX' };
  }
  const product = await productRepository.getProductsByTex(tex);
  if (!product || !product.length) throw { status: 404, message: 'Product Not Found' };
  return product;
}

export async function getProductsByTexRangeQuery(texStart: number, texEnd: number) {
  if (isNaN(texStart) || isNaN(texEnd)) {
    throw { status: 400, message: 'Invalid TEX range' };
  }
  const product = await productRepository.getProductsByTexRange(texStart, texEnd);
  if (!product || !product.length) throw { status: 404, message: 'Products Not Found' };
  return product;
}

export async function getAllProductsQuery() {
  return await productRepository.getAllProducts();
}

const getProducts: RequestHandler = async (req, res) => {
  try {
    if (req.query.id) {
      const id = Number(req.query.id);
      const product = await getProductByIdQuery(id);
      res.status(200).json(product);
      return;
    }
    if (req.query.brand) {
      const products = await getProductsByBrandQuery(String(req.query.brand));
      res.status(200).json(products);
      return;
    }
    if (req.query.name) {
      const products = await getProductsByNameQuery(String(req.query.name));
      res.status(200).json(products);
      return;
    }
    if (req.query.tex) {
      const tex = Number(req.query.tex);
      const product = await getProductsByTexQuery(tex);
      res.status(200).json(product);
      return;
    }
    if (req.query.texStart && req.query.texEnd) {
      const texStart = Number(req.query.texStart);
      const texEnd = Number(req.query.texEnd);
      const product = await getProductsByTexRangeQuery(texStart, texEnd);
      res.status(200).json(product);
      return;
    }

    const products = await getAllProductsQuery();
    res.json(products);
  } catch (error) {
    const err = error as { status?: number; message?: string };
    res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
  }
};

export default {
  getProducts,
  getProductByIdQuery,
  getProductsByBrandQuery,
  getProductsByNameQuery,
  getProductsByTexQuery,
  getProductsByTexRangeQuery,
  getAllProductsQuery,
};
