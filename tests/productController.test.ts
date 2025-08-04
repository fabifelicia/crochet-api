/* eslint-disable @typescript-eslint/no-explicit-any */
import productController from '../src/controllers/productController';
import productRepository from '../src/repositories/productRepository';
import { productsMock } from '../src/mocks/productsMock';

jest.mock('../src/repositories/productRepository');

describe('productController', () => {
  let res: any;
  let next: jest.Mock;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  it('should return product by id', async () => {
    const product = productsMock[0];
    (productRepository.getProductById as jest.Mock).mockResolvedValue(product);

    const req = { query: { id: 1 } } as any;
    await productController.getProducts(req, res, next);

    expect(productRepository.getProductById).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(product);
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next with 404 error if product by id is not found', async () => {
    (productRepository.getProductById as jest.Mock).mockResolvedValue(null);

    const req = { query: { id: 999 } } as any;
    try {
      await productController.getProducts(req, res, next);
    } catch (error) {
      next(error);
    }

    expect(productRepository.getProductById).toHaveBeenCalledWith(999);
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 404,
        message: 'Product Not Found',
      })
    );
  });

  it('should return products by brand', async () => {
    (productRepository.getProductsByBrand as jest.Mock).mockResolvedValue(productsMock);

    const req = { query: { brand: 'Circulo' } } as any;
    await productController.getProducts(req, res, next);

    expect(productRepository.getProductsByBrand).toHaveBeenCalledWith('Circulo');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(productsMock);
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next with 404 error if brand is not found', async () => {
    (productRepository.getProductsByBrand as jest.Mock).mockResolvedValue([]);

    const req = { query: { brand: 'Inexistente' } } as any;
    try {
      await productController.getProducts(req, res, next);
    } catch (error) {
      next(error);
    }

    expect(productRepository.getProductsByBrand).toHaveBeenCalledWith('Inexistente');
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 404,
        message: 'Brand Not Found',
      })
    );
  });

  it('should return products by name', async () => {
    (productRepository.getProductsByName as jest.Mock).mockResolvedValue(productsMock);

    const req = { query: { name: 'Amigurumi' } } as any;
    await productController.getProducts(req, res, next);

    expect(productRepository.getProductsByName).toHaveBeenCalledWith('Amigurumi');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(productsMock);
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next with 404 error if name is not found', async () => {
    (productRepository.getProductsByName as jest.Mock).mockResolvedValue([]);

    const req = { query: { name: 'Inexistente' } } as any;
    try {
      await productController.getProducts(req, res, next);
    } catch (error) {
      next(error);
    }

    expect(productRepository.getProductsByName).toHaveBeenCalledWith('Inexistente');
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 404,
        message: 'Name Not Found',
      })
    );
  });

  it('should return products by tex', async () => {
    (productRepository.getProductsByTex as jest.Mock).mockResolvedValue(productsMock);

    const req = { query: { tex: 492 } } as any;
    await productController.getProducts(req, res, next);

    expect(productRepository.getProductsByTex).toHaveBeenCalledWith(492);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(productsMock);
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next with 404 error if tex is not found', async () => {
    (productRepository.getProductsByTex as jest.Mock).mockResolvedValue([]);

    const req = { query: { tex: 999 } } as any;
    try {
      await productController.getProducts(req, res, next);
    } catch (error) {
      next(error);
    }

    expect(productRepository.getProductsByTex).toHaveBeenCalledWith(999);
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 404,
        message: 'Product Not Found',
      })
    );
  });

  it('should return products by tex range', async () => {
    (productRepository.getProductsByTexRange as jest.Mock).mockResolvedValue(productsMock);

    const req = { query: { texStart: 100, texEnd: 300 } } as any;
    await productController.getProducts(req, res, next);

    expect(productRepository.getProductsByTexRange).toHaveBeenCalledWith(100, 300);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(productsMock);
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next with 404 error if tex range does not find products', async () => {
    (productRepository.getProductsByTexRange as jest.Mock).mockResolvedValue([]);

    const req = { query: { texStart: 100, texEnd: 300 } } as any;
    try {
      await productController.getProducts(req, res, next);
    } catch (error) {
      next(error);
    }

    expect(productRepository.getProductsByTexRange).toHaveBeenCalledWith(100, 300);
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 404,
        message: 'Products Not Found',
      })
    );
  });

  it('should return all products', async () => {
    (productRepository.getAllProducts as jest.Mock).mockResolvedValue(productsMock);

    const req = { query: {} } as any;
    await productController.getProducts(req, res, next);

    expect(productRepository.getAllProducts).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(productsMock);
    expect(next).not.toHaveBeenCalled();
  });
});
