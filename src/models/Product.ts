export default class Product {
    id: number;
    name: string;
    tex: number;
    brand: string;
 
    private static nextId = 1;
 
    constructor(name: string, tex: number, brand: string) {
        this.id = Product.nextId++;
        this.name = name;
        this.tex = tex;
        this.brand = brand;
    }
}
 