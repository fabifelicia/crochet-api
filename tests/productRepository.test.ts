import { Op } from 'sequelize';
import Product from '../src/models/Product';
import productRepository from '../src/repositories/productRepository';

jest.mock('../src/models/Product');

describe('productRepository', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getProductById', () => {
    it('should return a product when ID exists', async () => {
      const mockProduct = { id: 1, name: 'Amigurumi' } as Product;
      (Product.findByPk as jest.Mock).mockResolvedValue(mockProduct);

      const result = await productRepository.getProductById(1);

      expect(Product.findByPk).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockProduct);
    });

    it('should return null when ID is null', async () => {
      const result = await productRepository.getProductById(null);
      expect(result).toBeNull();
    });
  });

  describe('getProductsByTex', () => {
    it('should return products with matching tex', async () => {
      const mockProducts = [{ id: 1, tex: 492 }] as Product[];
      (Product.findAll as jest.Mock).mockResolvedValue(mockProducts);

      const result = await productRepository.getProductsByTex(492);

      expect(Product.findAll).toHaveBeenCalledWith({
        where: { tex: 492 },
        order: [['id', 'ASC']],
      });
      expect(result).toEqual(mockProducts);
    });

    it('should return empty array when tex is null', async () => {
      const result = await productRepository.getProductsByTex(null);
      expect(result).toEqual([]);
    });
  });

  describe('getProductsByTexRange', () => {
    it('should return products within range', async () => {
      const mockProducts = [{ id: 1, tex: 500 }] as Product[];
      (Product.findAll as jest.Mock).mockResolvedValue(mockProducts);

      const result = await productRepository.getProductsByTexRange(400, 600);

      expect(Product.findAll).toHaveBeenCalledWith({
        where: {
          tex: { [Op.between]: [400, 600] },
        },
        order: [['id', 'ASC']],
      });

      expect(result).toEqual(mockProducts);
    });

    it('should return empty array if start or end is null', async () => {
      const result = await productRepository.getProductsByTexRange(null, 600);
      expect(result).toEqual([]);
    });
  });

  describe('getProductsByName', () => {
    it('should return matching products', async () => {
      const mockProducts = [{ name: 'Anne' }] as Product[];
      (Product.findAll as jest.Mock).mockResolvedValue(mockProducts);

      const result = await productRepository.getProductsByName('Anne');

      expect(Product.findAll).toHaveBeenCalledWith({
        where: { name: { [Op.iLike]: 'Anne' } },
        order: [['id', 'ASC']],
      });
      expect(result).toEqual(mockProducts);
    });

    it('should return empty array if name is empty', async () => {
      const result = await productRepository.getProductsByName('');
      expect(result).toEqual([]);
    });
  });

  describe('getAllProducts', () => {
    it('should return all products', async () => {
      const mockProducts = [{ name: 'Anne' }] as Product[];
      (Product.findAll as jest.Mock).mockResolvedValue(mockProducts);

      const result = await productRepository.getAllProducts();

      expect(Product.findAll).toHaveBeenCalled();
      expect(result).toEqual(mockProducts);
    });
  });
});
