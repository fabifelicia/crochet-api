import express from 'express';
import productController from '../controllers/productController';

const router = express.Router();

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.get('/:brand', productController.getProductsByBrand);
router.get('/:name', productController.getProductsByName);
router.get('/:tex', productController.getProductsByTex);
//router.get('/:texStart,:texEnd', productController.getProductsByTexRange);

export default router;