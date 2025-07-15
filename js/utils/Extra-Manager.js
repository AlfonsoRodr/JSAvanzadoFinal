import { Extra } from "./Extra.js";

/**
 * Manages a collection of Extra items using a private Map.
 * Provides methods to add and retrieves.
 *
 * @class ExtraManager
 */
export class ExtraManager {
    /**
     * @type {Map<string, number>}
     */
    #map;

    constructor() { 
        this.#map = new Map();
    }

    /**
     * Adds a new Extra to the collection.
     *
     * @param {string} name - The name of the extra.
     * @param {number} price - The price of the extra.
     */
    addExtra(name, price) {
        const product = new Extra(name, price);
        this.#map.set(product.getName, product.getPrice);
    }

    /**
     * Retrieves the price of an extra by its name.
     *
     * @param {string} name - The name of the extra.
     * @returns {number|undefined} The price of the extra, or undefined if not found.
     */
    getExtraPrice(name) {
        return this.#map.get(name);
    }
}