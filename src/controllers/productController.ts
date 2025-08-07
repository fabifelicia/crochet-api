import { RequestHandler } from 'express';
import productRepository from '../repositories/productRepository';
import { AppError } from '../errors/AppError';

export async function getProductByIdQuery(id: number) {
  if (!id || isNaN(id)) {
    throw new AppError('Invalid ID', 400);
  }
  const product = await productRepository.getProductById(id);
  if (!product) throw new AppError('Product Not Found', 404);
  return product;
}

export async function getProductsByBrandQuery(brand: string) {
  const products = await productRepository.getProductsByBrand(brand);
  if (!products.length) throw new AppError('Brand Not Found', 404);
  return products;
}

export async function getProductsByNameQuery(name: string) {
  const products = await productRepository.getProductsByName(name);
  if (!products.length) throw new AppError('Name Not Found', 404);
  return products;
}

export async function getProductsByTexQuery(tex: number) {
  if (!tex || isNaN(tex)) {
    throw new AppError('Invalid Tex', 400);
  }
  const product = await productRepository.getProductsByTex(tex);
  if (!product || !product.length) throw new AppError('Product Not Found', 404);
  return product;
}

export async function getProductsByTexRangeQuery(texStart: number, texEnd: number) {
  if (isNaN(texStart) || isNaN(texEnd)) {
    throw new AppError('Invalid Tex Range', 400);
  }

  const product = await productRepository.getProductsByTexRange(texStart, texEnd);
  if (!product || !product.length) throw new AppError('Product(s) Not Found', 404);
  return product;
}

export async function getAllProductsQuery() {
  return await productRepository.getAllProducts();
}

const getProducts: RequestHandler = async (req, res) => {
  const { id, brand, name, tex, texStart, texEnd } = req.query;

  const filtersUsed = [id, brand, name, tex, texStart && texEnd].filter(Boolean).length;

  if (filtersUsed > 1) {
    throw new AppError('Only one filter can be used at a time', 400);
  }

  if ((texStart && !texEnd) || (!texStart && texEnd)) {
    throw new AppError('texStart and texEnd must be used together', 400);
  }

  if (id) {
    const product = await getProductByIdQuery(Number(id));
    res.status(200).json(product);
    return;
  }

  if (brand) {
    const products = await getProductsByBrandQuery(String(brand));
    res.status(200).json(products);
    return;
  }

  if (name) {
    const products = await getProductsByNameQuery(String(name));
    res.status(200).json(products);
    return;
  }

  if (tex) {
    const product = await getProductsByTexQuery(Number(tex));
    res.status(200).json(product);
    return;
  }

  if (texStart && texEnd) {
    const product = await getProductsByTexRangeQuery(Number(texStart), Number(texEnd));
    res.status(200).json(product);
    return;
  }

  const products = await getAllProductsQuery();
  res.status(200).json(products);
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
