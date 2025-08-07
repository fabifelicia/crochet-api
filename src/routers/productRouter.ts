import express from 'express';
import productController from '../controllers/productController';

const router = express.Router();

/**
 /**
 * @swagger
 * /products:
 *   get:
 *     summary: Returns products filtered by optional parameters
 *     description: |
 *       Returns a list of products that can be filtered by:
 *       - id (exact match)
 *       - brand (exact match)
 *       - name (exact match)
 *       - tex (exact match)
 *       - texStart and texEnd (range filter, both required together)
 *       
 *       Any invalid filter or missing paired params will return a 400 error.
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: false
 *         description: Exact product ID
 *       - in: query
 *         name: brand
 *         schema:
 *           type: string
 *         required: false
 *         description: Product brand
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: false
 *         description: Product name
 *       - in: query
 *         name: tex
 *         schema:
 *           type: integer
 *         required: false
 *         description: Exact TEX value
 *       - in: query
 *         name: texStart
 *         schema:
 *           type: integer
 *         required: false
 *         description: Start value of TEX range (must be provided together with texEnd)
 *       - in: query
 *         name: texEnd
 *         schema:
 *           type: integer
 *         required: false
 *         description: End value of TEX range (must be provided together with texStart)
 *     responses:
 *       200:
 *         description: List of matching products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid parameters or filter
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                     status:
 *                       type: integer
 *       404:
 *         description: Product(s) not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                     status:
 *                       type: integer
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "Cotton"
 *         brand:
 *           type: string
 *           example: "BrandX"
 *         tex:
 *           type: integer
 *           example: 100
 *       required:
 *         - id
 *         - name
 *         - brand
 *         - tex
 */

router.get('/', productController.getProducts);

export default router;
