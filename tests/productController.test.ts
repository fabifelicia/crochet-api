import { Request, Response, NextFunction } from 'express';
import productController from '../src/controllers/productController';
import productRepository from '../src/repositories/productRepository';
import { productsMock } from '../src/mocks/productsMock';

jest.mock('../src/repositories/productRepository');

const product = productsMock;

describe('productController.getProducts', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    res = {
      status: statusMock,
      json: jsonMock,
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return product by id', async () => {
    req = { query: { id: '1' } };
    (productRepository.getProductById as jest.Mock).mockResolvedValue(product);

    await productController.getProducts(req as Request, res as Response, next);

    expect(productRepository.getProductById).toHaveBeenCalledWith(1);
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith(product);
  });

  it('should return 404 status if product by id not found', async () => {
    req = { query: { id: '999' } };
    (productRepository.getProductById as jest.Mock).mockResolvedValue(null);

    await productController.getProducts(req as Request, res as Response, next);

    expect(productRepository.getProductById).toHaveBeenCalledWith(999);
    expect(statusMock).toHaveBeenCalledWith(404);
    expect(jsonMock).toHaveBeenCalledWith({ message: 'Product Not Found' });
  });

  it('should return products by brand', async () => {
    req = { query: { brand: 'Circulo' } };
    (productRepository.getProductsByBrand as jest.Mock).mockResolvedValue(product);

    await productController.getProducts(req as Request, res as Response, next);

    expect(productRepository.getProductsByBrand).toHaveBeenCalledWith('Circulo');
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith(product);
  });

  it('should return 404 status if brand not found', async () => {
    req = { query: { brand: 'Inexistente' } };
    (productRepository.getProductsByBrand as jest.Mock).mockResolvedValue([]);

    await productController.getProducts(req as Request, res as Response, next);

    expect(productRepository.getProductsByBrand).toHaveBeenCalledWith('Inexistente');
    expect(statusMock).toHaveBeenCalledWith(404);
    expect(jsonMock).toHaveBeenCalledWith({ message: 'Brand Not Found' });
  });

  it('should return product by name', async () => {
    req = { query: { name: 'Amigurumi' } };
    (productRepository.getProductsByName as jest.Mock).mockResolvedValue(product);

    await productController.getProducts(req as Request, res as Response, next);

    expect(productRepository.getProductsByName).toHaveBeenCalledWith('Amigurumi');
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith(product);
  });

  it('should return 404 status if name not found', async () => {
    req = { query: { name: 'Inexistente' } };
    (productRepository.getProductsByName as jest.Mock).mockResolvedValue([]);

    await productController.getProducts(req as Request, res as Response, next);

    expect(productRepository.getProductsByName).toHaveBeenCalledWith('Inexistente');
    expect(statusMock).toHaveBeenCalledWith(404);
    expect(jsonMock).toHaveBeenCalledWith({ message: 'Name Not Found' });
  });

  it('should return product by tex', async () => {
    req = { query: { tex: '492' } };
    (productRepository.getProductsByTex as jest.Mock).mockResolvedValue(product);

    await productController.getProducts(req as Request, res as Response, next);

    expect(productRepository.getProductsByTex).toHaveBeenCalledWith(492);
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith(product);
  });

  it('should return 404 status if tex not found', async () => {
    req = { query: { tex: '999' } };
    (productRepository.getProductsByTex as jest.Mock).mockResolvedValue(null);

    await productController.getProducts(req as Request, res as Response, next);

    expect(productRepository.getProductsByTex).toHaveBeenCalledWith(999);
    expect(statusMock).toHaveBeenCalledWith(404);
    expect(jsonMock).toHaveBeenCalledWith({ message: 'Product Not Found' });
  });

  it('should return product by tex range', async () => {
    req = { query: { texStart: '100', texEnd: '300' } };
    (productRepository.getProductsByTexRange as jest.Mock).mockResolvedValue(product);

    await productController.getProducts(req as Request, res as Response, next);

    expect(productRepository.getProductsByTexRange).toHaveBeenCalledWith(100, 300);
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith(product);
  });

  it('should return 404 status if not exists products within the tex range', async () => {
    req = { query: { texStart: '1000', texEnd: '2000' } };
    (productRepository.getProductsByTexRange as jest.Mock).mockResolvedValueOnce([]);

    await productController.getProducts(req as Request, res as Response, next);

    expect(productRepository.getProductsByTexRange).toHaveBeenCalledWith(1000, 2000);
    expect(statusMock).toHaveBeenCalledWith(404);
    expect(jsonMock).toHaveBeenCalledWith({ message: 'Products Not Found' });
  });

  it('dshould return all products', async () => {
    req = { query: {} };
    (productRepository.getAllProducts as jest.Mock).mockResolvedValue(product);

    await productController.getProducts(req as Request, res as Response, next);

    expect(productRepository.getAllProducts).toHaveBeenCalled();
    expect(jsonMock).toHaveBeenCalledWith(product);
  });

  it('should return 500 status if unexpected exception', async () => {
    req = { query: { id: '1' } };
    (productRepository.getProductById as jest.Mock).mockRejectedValue(
      new Error('Internal Server Error')
    );

    await productController.getProducts(req as Request, res as Response, next);

    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({ message: 'Internal Server Error' });
  });
});
