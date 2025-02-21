import { Request, Response, NextFunction } from "express";
import productRepository from "../repositories/productRepository";

const _TEX_RANGE_POSITION_START= 0;
const _TEX_RANGE_POSITION_END= 1;

async function getAllProducts(req: Request, res: Response, next: NextFunction) {
    const products = await productRepository.getAllProducts();
    res.json(products);
}

async function getProductById(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    const product = await productRepository.getProductById(parseInt(id));
    product ? res.sendStatus(200).json(product) : res.sendStatus(404).json({ message : 'Not Found'})
}

async function getProductsByTex(req: Request, res: Response, next: NextFunction) {
    const tex = req.params.tex;
    const product = await productRepository.getProductsByTex(parseInt(tex));
    product ? res.sendStatus(200).json(product) : res.sendStatus(404).json({ message : 'Not Found'})
}

async function getProductsByTexRange(req: Request, res: Response, next: NextFunction) {
    const texRange = [ req.params.texStart, req.params.texEnd];
    const product = await productRepository.getProductsByTexRange(parseInt(texRange[_TEX_RANGE_POSITION_START]), parseInt(texRange[_TEX_RANGE_POSITION_END]));
    product ? res.sendStatus(200).json(product) : res.sendStatus(404).json({ message : 'Not Found'})
}

async function getProductsByBrand(req: Request, res: Response, next: NextFunction) {
    const brand = req.params.brand;
    const products = await productRepository.getProductsByBrand(brand);
    products ? res.sendStatus(200).json(products) : res.sendStatus(404).json({ message : 'Not Found'})
}

async function getProductsByName(req: Request, res: Response, next: NextFunction) {
    const name = req.params.name;
    const products = await productRepository.getProductsByBrand(name);
    products ? res.sendStatus(200).json(products) : res.sendStatus(404).json({ message : 'Not Found'})
}

export default {
    getAllProducts,
    getProductById,
    getProductsByBrand,
    getProductsByName,
    getProductsByTex,
    getProductsByTexRange
}