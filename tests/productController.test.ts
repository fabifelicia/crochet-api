import { Request, Response, NextFunction } from 'express';
import productController from '../src/controllers/productController';
import productRepository from '../src/repositories/productRepository';

jest.mock('../src/repositories/productRepository');

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

  it('deve retornar produto por ID', async () => {
    const product = { id: 1, name: 'Produto A' };
    req = { query: { id: '1' } };
    (productRepository.getProductById as jest.Mock).mockResolvedValue(product);

    await productController.getProducts(req as Request, res as Response, next);

    expect(productRepository.getProductById).toHaveBeenCalledWith(1);
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith(product);
  });

  it('deve retornar erro 404 se produto por ID não for encontrado', async () => {
    req = { query: { id: '999' } };
    (productRepository.getProductById as jest.Mock).mockResolvedValue(null);

    await productController.getProducts(req as Request, res as Response, next);

    expect(productRepository.getProductById).toHaveBeenCalledWith(999);
    expect(statusMock).toHaveBeenCalledWith(404);
    expect(jsonMock).toHaveBeenCalledWith({ message: 'Product Not Found' });
  });

  it('deve retornar produtos por marca', async () => {
    const products = [{ id: 1, brand: 'Circulo' }];
    req = { query: { brand: 'Circulo' } };
    (productRepository.getProductsByBrand as jest.Mock).mockResolvedValue(products);

    await productController.getProducts(req as Request, res as Response, next);

    expect(productRepository.getProductsByBrand).toHaveBeenCalledWith('Circulo');
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith(products);
  });

  it('deve retornar erro 404 se marca não for encontrada', async () => {
    req = { query: { brand: 'Inexistente' } };
    (productRepository.getProductsByBrand as jest.Mock).mockResolvedValue([]);

    await productController.getProducts(req as Request, res as Response, next);

    expect(productRepository.getProductsByBrand).toHaveBeenCalledWith('Inexistente');
    expect(statusMock).toHaveBeenCalledWith(404);
    expect(jsonMock).toHaveBeenCalledWith({ message: 'Brand Not Found' });
  });

  it('deve retornar produtos por nome', async () => {
    const products = [{ id: 2, name: 'Amigurumi' }];
    req = { query: { name: 'Amigurumi' } };
    (productRepository.getProductsByName as jest.Mock).mockResolvedValue(products);

    await productController.getProducts(req as Request, res as Response, next);

    expect(productRepository.getProductsByName).toHaveBeenCalledWith('Amigurumi');
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith(products);
  });

  it('deve retornar erro 404 se nome não for encontrado', async () => {
    req = { query: { name: 'Inexistente' } };
    (productRepository.getProductsByName as jest.Mock).mockResolvedValue([]);

    await productController.getProducts(req as Request, res as Response, next);

    expect(productRepository.getProductsByName).toHaveBeenCalledWith('Inexistente');
    expect(statusMock).toHaveBeenCalledWith(404);
    expect(jsonMock).toHaveBeenCalledWith({ message: 'Name Not Found' });
  });

  it('deve retornar produto por tex', async () => {
    const product = { id: 3, tex: 492 };
    req = { query: { tex: '492' } };
    (productRepository.getProductsByTex as jest.Mock).mockResolvedValue(product);

    await productController.getProducts(req as Request, res as Response, next);

    expect(productRepository.getProductsByTex).toHaveBeenCalledWith(492);
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith(product);
  });

  it('deve retornar erro 404 se produto por tex não for encontrado', async () => {
    req = { query: { tex: '999' } };
    (productRepository.getProductsByTex as jest.Mock).mockResolvedValue(null);

    await productController.getProducts(req as Request, res as Response, next);

    expect(productRepository.getProductsByTex).toHaveBeenCalledWith(999);
    expect(statusMock).toHaveBeenCalledWith(404);
    expect(jsonMock).toHaveBeenCalledWith({ message: 'Product Not Found' });
  });

  it('deve retornar produtos por faixa de tex', async () => {
    const products = [
      { id: 4, tex: 200 },
      { id: 5, tex: 300 },
    ];
    req = { query: { texStart: '100', texEnd: '300' } };
    (productRepository.getProductsByTexRange as jest.Mock).mockResolvedValue(products);

    await productController.getProducts(req as Request, res as Response, next);

    expect(productRepository.getProductsByTexRange).toHaveBeenCalledWith(100, 300);
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith(products);
  });

  it('deve retornar erro 404 se produtos por faixa de tex não forem encontrados', async () => {
    req = { query: { texStart: '1000', texEnd: '2000' } };
    (productRepository.getProductsByTexRange as jest.Mock).mockResolvedValueOnce([]);

    await productController.getProducts(req as Request, res as Response, next);

    expect(productRepository.getProductsByTexRange).toHaveBeenCalledWith(1000, 2000);
    expect(statusMock).toHaveBeenCalledWith(404);
    expect(jsonMock).toHaveBeenCalledWith({ message: 'Products Not Found' });
  });

  it('deve retornar todos os produtos caso nenhum filtro seja passado', async () => {
    const products = [{ id: 1 }, { id: 2 }];
    req = { query: {} };
    (productRepository.getAllProducts as jest.Mock).mockResolvedValue(products);

    await productController.getProducts(req as Request, res as Response, next);

    expect(productRepository.getAllProducts).toHaveBeenCalled();
    expect(jsonMock).toHaveBeenCalledWith(products);
  });

  it('deve retornar erro 500 em caso de exceção inesperada', async () => {
    req = { query: { id: '1' } };
    (productRepository.getProductById as jest.Mock).mockRejectedValue(
      new Error('Internal Server Error')
    );

    await productController.getProducts(req as Request, res as Response, next);

    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({ message: 'Internal Server Error' });
  });
});
