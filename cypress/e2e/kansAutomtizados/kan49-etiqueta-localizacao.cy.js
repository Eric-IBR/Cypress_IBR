/// <reference types="cypress" />
import "../../support/commands";
describe("Validar geração de etiqueta de localização em massa", () => {
    beforeEach(function () {
        cy.login();
    });

    it("Checkbox de geração de etiqueta de localização em massa", () => {
        cy.get("#mat-expansion-panel-header-0").click();
        cy.contains("div.button-toggle-title", "Localizações").click();
        cy.wait(200);
        cy.contains('button', 'Gerar Etiquetas').should('be.disabled');
        cy.get('mat-checkbox').eq(0).click();
        cy.get('mat-checkbox').eq(1).click();
        cy.intercept('POST', '**/Location/MassLocationsTags').as('massTags');
        cy.contains('button', 'Gerar Etiquetas').should('not.be.disabled').click()
        cy.wait('@massTags').its('response.statusCode').should('eq', 200);

    })
})