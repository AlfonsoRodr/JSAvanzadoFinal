/**
 * Represents the Products that the user can purchase.
 * 
 * @class Product
 */
export class Product {
    #name;
    #price;

    constructor(name, price) {
        this.#name = name;
        this.#price = price;
    }

    get getName() {
        return this.#name;
    }

    get getPrice() {
        return this.#price;
    }

    set setName(name) {
        this.#name = name;
    }

    set setPrice(price) {
        this.#price = price;
    }
}