import { ProductManager } from "./utils/Product-Manager.js";
import { ExtraManager } from "./utils/Extra-Manager.js";

const productManager = new ProductManager();
const extraManager = new ExtraManager();

let totalPrice = 0;
let discount = 0;

productManager.addProduct("mitt", 50);
productManager.addProduct("bat", 73.5);
productManager.addProduct("gloves", 25);

extraManager.addExtra("color", 10);
extraManager.addExtra("name", 15);
extraManager.addExtra("team", 20);

/**
 * Verifies if the provided name is valid.
 * A valid name is non-empty, contains no digits, and is at most 15 characters long.
 *
 * @param {string} name - The name to verify.
 * 
 * @returns {boolean} Returns true if the name is valid, otherwise false.
 */
function verifyName(name) {
    return name.trim() !== "" && !/\d/.test(name) && name.length <= 15;
}

/**
 * Verifies if the provided surname is valid.
 * A valid surname is a non-empty string, contains no digits, and has a maximum length of 40 characters.
 *
 * @param {string} surname - The surname to verify.
 * 
 * @returns {boolean} Returns true if the surname is valid, otherwise false.
 */
function verifySurname(surname) {
    return surname.trim() !== "" && !/\d/.test(surname) && surname.length <= 40;
}

/**
 * Verifies if the provided phone number is exactly 9 digits long.
 *
 * @param {string} phone - The phone number to verify.
 * 
 * @returns {boolean} Returns true if the phone number consists of exactly 9 digits, false otherwise.
 */
function verifyPhone(phone) {
    return /^\d{9}$/.test(phone);
}

/**
 * Verifies the validity of the contact form fields by checking the name, surname, and phone number.
 * Retrieves the values from the input fields with IDs "name-field", "surname-field", and "telephone-field",
 * and validates them using the verifyName, verifySurname, and verifyPhone functions respectively.
 *
 * @returns {boolean} Returns true if all fields are valid, otherwise false.
 */
function verifyContactForm() {
    const nameField = document.getElementById("name-field").value;
    const surnameField = document.getElementById("surname-field").value;
    const phoneField = document.getElementById("telephone-field").value;

    if (!verifyName(nameField)) {
        alert("Por favor, introduce un nombre válido (sin números y máximo 15 caracteres).");
        return false;
    }

    if (!verifySurname(surnameField)) {
        alert("Por favor, introduce un apellido válido (sin números y máximo 40 caracteres).");
        return false;
    }

    if (!verifyPhone(phoneField)) {
        alert("Por favor, introduce un número de teléfono válido de 9 dígitos.");
        return false;
    }
    return true;
}

/**
 * Calculates the total price of all selected products by summing their individual prices.
 * Iterates over all checked product inputs and updates the global totalPrice variable.
 * It`s a mandatory field.
 * 
 * @returns {boolean} Returns true if the purchase is made (there are selected items), false otherwise.
 */
function buyProduct() {
    totalPrice = 0;
    const selectedProducts = document.querySelectorAll('input[name="product"]:checked');

    if (selectedProducts.length > 0) {
        for (let product of selectedProducts) {
            totalPrice += productManager.getProductPrice(product.value);
        }
        return true;
    }
    return false;
}

/**
 * Applies a discount to the total price based on the selected time option.
 * If "days" is selected, a 25% discount is applied; otherwise, a 50% discount is applied.
 * The function checks for valid input before applying the discount.
 *
 * @returns {boolean} Returns true if the discount was applied, false otherwise.
 */
function applyDiscount() {
    const selectedOption = document.querySelector('input[name="plazo"]:checked');
    const ammountTime = parseInt(document.getElementById("time-amount").value);
    
    if ((!selectedOption) || isNaN(ammountTime) || (ammountTime <= 0)) {
        return false;
    }
    
    if (selectedOption.value === "days") {
        discount = 0.25;
    }
    else {
        discount = 0.5;
    }
    totalPrice -= totalPrice * discount;
    return true;
}

/**
 * In case the user selected any extra product to add to its purchase, it's added to the total price.
 * 
 * @returns {void}
 */
function addExtra() {
    const selectedExtras = document.querySelectorAll('input[name="extra-option"]:checked');

    for (let extra of selectedExtras) {
        totalPrice += extraManager.getExtraPrice(extra.value);
    }
}

/**
 * Checks if a privacy condition input is selected.
 *
 * @returns {boolean} Returns true if an input with name "privacy" is checked, otherwise false.
 */
function verifyConditions() {
    const condition = document.querySelector('input[name="privacy"]:checked');
    
    if (condition) {
        return true;
    }
    return false;
}

/**
 * Verifies the profit form by calculating the total price, applying discounts,
 * updating the displayed total, and checking additional conditions.
 * Updates the DOM element with id "total-price" with the calculated total.
 *
 * @returns {boolean} True if all conditions are met and the form is valid, false otherwise.
 */
function verifyProfitForm() {
    totalPrice = 0;
    discount = 0;

    if (buyProduct()) {
        addExtra();
        applyDiscount();
    }

    const element = document.getElementById("total-price");
    if (element) {
        element.innerText = totalPrice.toFixed(2) + " €";
    }
    return buyProduct() && verifyConditions();
}

/**
 * Verifies the contact and profit forms. 
 * If both forms are valid, opens the confirmation page in a new window.
 *
 * @returns {void}
 */
function verifyForm() {
    if (verifyContactForm() && verifyProfitForm()) {
        window.location.href = "../views/confirmacion.html";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const inputs = document.querySelectorAll(
        'input[name="product"], input[name="extra-option"], input[name="plazo"], #time-amount'
    );
    inputs.forEach(input => {
        input.addEventListener("change", verifyProfitForm);
        input.addEventListener("input", verifyProfitForm);
    });

    const extras = document.querySelectorAll('input[name="extra-option"]');
    extras.forEach(extra => {
        extra.addEventListener("change", (event) => {
            const selectedProducts = document.querySelectorAll('input[name="product"]:checked');
            if (selectedProducts.length === 0) {
                alert("Antes de añadir un extra, primero debe de seleccionar los productos que desea adquirir");
                event.target.checked = false;
            }
            verifyProfitForm();
        });
    });

    const form = document.getElementById("formulary");
    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            verifyForm();
        });
    }
    verifyProfitForm();
});