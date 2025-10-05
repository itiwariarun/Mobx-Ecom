/// <reference types="cypress" />
// Import Cypress types for better autocompletion and type safety

export {}; // Ensure this file is treated as a module

describe('Ecommerce App - Full Flow', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('.product-card').should('exist');
  });

  it("should display products on home page", () => {
    cy.get("h1").contains("Products");
    cy.get(".group").should("have.length.greaterThan", 0);
    cy.get(".group img").should("have.length.greaterThan", 0);
    cy.get(".group h3").should("have.length.greaterThan", 0);
    cy.get(".group p").contains("$");
  });

  it("should navigate to product details page", () => {
    cy.get(".group").first().click();
    cy.url().should("include", "/product/");
    cy.contains("Back to Home").should("exist");
    cy.get("h2").should("exist");
    cy.get("img").should("exist");
    cy.get("p").contains("$").should("exist");
  });
});
