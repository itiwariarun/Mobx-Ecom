/// <reference types="cypress" />

export {};

describe("Ecommerce App - Full Flow", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get(".product-card").should("exist");
  });

  it("should display products on home page", () => {
    cy.get("h1").contains("Products");
    cy.get(".group").should("have.length.greaterThan", 0);
    cy.get(".group img").should("have.length.greaterThan", 0);
    cy.get(".group h3").should("have.length.greaterThan", 0);
    cy.get(".group p").contains("$");
  });

  it("should navigate to product details page and display product info", () => {
    cy.get(".product-card").first().click();
    cy.url({ timeout: 5000 }).should("include", "/product/");
    cy.get("h2.text-3xl", { timeout: 5000 }).should("exist");
    cy.contains("← Back to Home").should("exist");
    cy.get(".img-box img").should("exist");
    cy.get("p.text-2xl").contains("$").should("exist");
    cy.contains("Add to Cart").should("exist");
  });

  it("should navigate back to home from product details", () => {
    cy.get(".product-card").first().click();
    cy.contains("← Back to Home").click();
    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });
  it("should add a product to the cart", () => {
    cy.get(".product-card").first().click();
    cy.get("h2.text-3xl", { timeout: 5000 }).should("exist");
    cy.get("button.cart-increment").click();
    cy.get("input[type='text']").should("have.value", "2");
    cy.get("button.cart-decrement").click();
    cy.get("input[type='text']").should("have.value", "1");
    cy.contains("Add to Cart").click();
    cy.contains("Add to Cart").should("exist");
    cy.get(".btn-cart", { timeout: 5000 })
      .should("have.attr", "data-quantity")
      .and("not.eq", "0");
  });
  beforeEach(() => {
    cy.visit("/");
    cy.window().then((win) => {
      win.sessionStorage.clear();
    });
  });

  it("should show empty cart message when no items", () => {
    cy.visit("/cart");
    cy.contains("Your cart is empty").should("exist");
  });

  it("should display added item in cart", () => {
    cy.visit("/");
    cy.get(".product-card").first().click();
    cy.contains("Add to Cart").click();

    cy.visit("/cart");

    cy.get(".cart-item").should("exist");
    cy.get(".cart-item-title").should("exist");
    cy.get(".cart-item-qty input").should("have.value", "1");
    cy.get(".cart-item-price").should("exist");
  });

  it("should increment and decrement quantity", () => {
    cy.visit("/");
    cy.get(".product-card").first().click();
    cy.contains("Add to Cart").click();
    cy.visit("/cart");

    cy.get(".cart-item .cart-increment").click();
    cy.get(".cart-item-qty input").should("have.value", "2");

    cy.get(".cart-item .cart-decrement").click();
    cy.get(".cart-item-qty input").should("have.value", "1");
  });

  it("should remove item from cart", () => {
    cy.visit("/");
    cy.get(".product-card").first().click();
    cy.contains("Add to Cart").click();
    cy.visit("/cart");

    cy.get(".cart-item").should("exist");
    cy.get(".cart-remove").click();

    cy.contains("Your cart is empty").should("exist");
  });

  it("should proceed to checkout and redirect to order success page", () => {
    cy.visit("/");
    cy.get(".product-card").first().click();
    cy.contains("Add to Cart").click();
    cy.visit("/cart");

    cy.get(".cart-checkout").click();
    cy.url().should("include", "/order-success");
  });
});
