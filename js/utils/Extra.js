/**
 * Represents the extras that the user can add to the products.
 * 
 * @class Extra
 */
export class Extra {
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