/// <reference types="cypress" />
import "../../support/commands";
describe("Cenários de validação do limitador de desconto", () => {
    beforeEach(function () {
        cy.login();
    });

    it("Validar desconto de 30%", () => {

        cy.get('button mat-icon').contains('expand_more').click();
        cy.get('a mat-icon').contains('settings').click();
        cy.get('div.mat-tab-label-content').contains('Vendas').click();
        cy.get('input[formcontrolname="discountLimit"]').clear().type("30");

        cy.wait(300)
        cy.get('button').contains('Salvar').click();
        cy.contains('Dados alterados com sucesso!').should('be.visible');
        cy.wait(300)
        cy.get('#mat-expansion-panel-header-4').click();
        cy.contains("div.button-toggle-title", "Nova Venda").click();
        cy.wait(200);

        cy.contains("mat-icon", "search").click();
        cy.wait(700);
        cy.get('input[formcontrolname="code"]').click().type('4782', { force: true });

        cy.get('input[formcontrolname="code"]').type('4782', { force: true });
        cy.wait(700);
        cy.contains('button', 'Pesquisar').click({ force: true });

        cy.get('table tbody tr').eq(1).dblclick();
        cy.get("button").contains("Salvar").click();
        cy.wait(800);
        cy.get('input[formcontrolname="unitaryValue"]')
            .invoke('val', '100,00')
            .trigger('input', { force: true })
            .trigger('change', { force: true });
        cy.wait(800);
        cy.get('mat-icon').contains('done').click();

        cy.get('button.mat-icon-button')
            .find('mat-icon')
            .contains('more_vert')
            .click({ force: true });

        cy.get('button mat-icon').contains('money_off').click();
        cy.get('button').contains('%').click();
        cy.wait(700)
        cy.get('input[placeholder="% 0,00"]').invoke('val', '30')
            .trigger('input', { force: true })
            .trigger('change', { force: true });
        cy.get('button').contains('Confirmar').click();
    });
})