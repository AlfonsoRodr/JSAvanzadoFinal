import { Product } from "./Producto.js";

/**
 * Manages a collection of Product items using a private Map.
 * Provides methods to add and retrieve.
 *
 * @class ProductManager
 */
export class ProductManager {
    /**
     * @type {Map<string, number>}
     */
    #map;

    constructor() {
        this.#map = new Map();
    }

    /**
     * Adds a new Product to the collection.
     *
     * @param {string} name - The name of the product.
     * @param {number} price - The price of the product.
     */
    addProduct(name, price) {
        const product = new Product(name, price);
        this.#map.set(product.getName, product.getPrice);
    }

    /**
     * Retrieves the price of an product by its name.
     *
     * @param {string} name - The name of the product.
     * @returns {number|undefined} The price of the product, or undefined if not found.
     */
    getProductPrice(name) {
        return this.#map.get(name);
    }
}