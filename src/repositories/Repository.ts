 
import Product from "src/models/Product";

const products: Product[] = [];

async function getProductById(id: number) : Promise<Product | undefined> {
    return new Promise((resolve, reject) => {
        return resolve(products.find(product => product.id === id))
    })
}

async function getProductsByTex(tex: number) : Promise<Product[]> {
    return new Promise((resolve, reject) => {
        return resolve(products.filter(product => product.tex === tex).sort((a : any, b : any) => a - b))
    })
}

async function getProductsByTexRange(texStart: number, texEnd: number) : Promise<Product[]> {
    return new Promise((resolve, reject) => {
        return resolve(products.filter(product => product.tex >= texStart && product.tex <= texEnd).sort((a : any, b : any) => a - b))
    })
}

async function getProductsByName(name:string) : Promise<Product[]> {
    return new Promise((resolve, reject) => {
        return resolve(products.filter(product => product.name === name).sort((a : any, b : any) => a - b))
    })
}

async function getProductsByBrand(brand:string) : Promise<Product[]> {
    return new Promise((resolve, reject) => {
        return resolve(products.filter(product => product.brand === brand).sort((a : any, b : any) => a - b))
    })
}

async function getProducts() : Promise<Product[]> {
    return new Promise((resolve, reject) => {
        return resolve(products);
    })
}

export default {
    getProductsByTex,
    getProductsByTexRange,
    getProductsByName,
    getProductsByBrand,
    getProductById,
    getProducts
}