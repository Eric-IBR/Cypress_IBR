/// <reference types="cypress" />
import "../../support/commands";
describe("Cenários de validação do filtro de NF de entrada e Saída", () => {
    beforeEach(function () {
        cy.login();
    });

    it("Validação do Filtro para Entrada", () => {
        cy.get('#mat-expansion-panel-header-5').click();
        cy.contains("div.button-toggle-title", "Notas Emitidas").click();
        cy.wait(200);
        cy.get('mat-expansion-panel-header').contains('Filtros Avançados').click();

        cy.get('mat-select[formcontrolname="tipoNf"]').click();
        cy.get('mat-option').contains('Entrada').click();
        cy.get('button').contains('Pesquisar').click();
        cy.wait(500);
        cy.get('td.mat-column-tipoNf').each(($el) => {
            expect($el.text().trim()).to.eq('Entrada');
        });
    });

    it("Validação do Filtro para Saída", () => {
        cy.get('#mat-expansion-panel-header-5').click();
        cy.contains("div.button-toggle-title", "Notas Emitidas").click();
        cy.wait(200);
        cy.get('mat-expansion-panel-header').contains('Filtros Avançados').click();

        cy.get('mat-select[formcontrolname="tipoNf"]').click();
        cy.get('mat-option').contains('Entrada').click();
        cy.get('button').contains('Pesquisar').click();
        cy.wait(500);
        cy.get('td.mat-column-tipoNf').each(($el) => {
            expect($el.text().trim()).to.eq('Entrada');
        });

         cy.get('mat-select[formcontrolname="tipoNf"]').click();
        cy.get('mat-option').contains('Saída').click();
        cy.get('button').contains('Pesquisar').click();
        cy.wait(500);
        cy.get('td.mat-column-tipoNf').each(($el) => {
            expect($el.text().trim()).to.eq('Saída');
        });
    });
});