import express from 'express';
import productController from '../controllers/productController';

const router = express.Router();

/**
 * @openapi
 * /products:
 *   get:
 *     summary: Lista produtos com filtros opcionais por id, nome, marca ou faixa de tex.
 *     tags:
 *       - Produtos
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: false
 *         description: Product ID
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: false
 *         description: Product Name
 *       - in: query
 *         name: brand
 *         schema:
 *           type: string
 *         required: false
 *         description: Product Brand
 *       - in: query
 *         name: tex
 *         schema:
 *           type: integer
 *         required: false
 *         description: Product Tex
 *       - in: query
 *         name: startTex
 *         schema:
 *           type: integer
 *         required: false
 *         description: start tex value
 *       - in: query
 *         name: endTex
 *         schema:
 *           type: integer
 *         required: false
 *         description: end tex value
 *     responses:
 *       200:
 *         description: List of products returned successfully
 *       400:
 *         description: Invalid query
 *       404:
 *         description: Product(s) not found
 *       500:
 *         description: Internal server error
 */

router.get('/', productController.getProducts);

export default router;
