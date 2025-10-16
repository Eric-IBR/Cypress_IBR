/// <reference types="cypress" />
import "../../support/commands";
describe("Cenários de logs do status de Sucata", () => {
    beforeEach(function () {
        cy.login();
    });

    it("Desmembramento de sucata", () => {
        cy.wait(700);
        cy.visit("https://beta-desmonte.ibrsoftweb.com.br/erp/customers");
        cy.get('input[placeholder="Filtro Global"]').type("Andre B{enter}");
        cy.wait(1000);
        cy.get('button[aria-haspopup="menu"]').find('mat-icon').contains('more_vert').click();
        cy.contains('button', 'Editar').click();
        cy.wait(700);
        cy.contains('.mat-tab-label', 'Dados Adicionais').click();
        cy.get('input[formcontrolname="deliveryName"]')
            .should('have.value', 'Teste Endereço Adicional');

        cy.visit('https://beta-desmonte.ibrsoftweb.com.br/erp/nfe/emitir');
        cy.wait(1000);
        cy.get("div.row-nfe button")
            .contains("Avançar")
            .eq(0)
            .click({ force: true });

        cy.wait(500);
        cy.get("#mat-input-7").type("Andre B{enter}");
        cy.contains("tr", "Andre B").dblclick();
        cy.wait(500);
        cy.get(
            "ibr-app-step-destinatario.ng-star-inserted > .nfe-form > .justify-content-end > .action-button"
        ).click();

        cy.contains('button', 'Inserir Produto').click();
        cy.get('input[formcontrolname="descricao"]')
            .parents(".mat-form-field-flex")
            .find("mat-icon")
            .contains("search")
            .click({ force: true });

        cy.get('input[formcontrolname="description"]').eq(1).type("Volante Volkswagen Gol-G5 2009{enter}");
        cy.get(".col-sm-12 > .action-button").click();

        cy.get("tr").contains("Volante Volkswagen Gol-G5 2009").click();
        cy.get("button").contains(" Selecionar ").click();
        cy.wait(500);

        cy.get("button").contains("Salvar").click();
        cy.wait(1000);
        cy.get(".container > .nfe-form > .row > .action-button").click();

        cy.contains('.mat-tab-label', 'Dados de Entrega').click();
        cy.get('input[formcontrolname="deliveryName"]')
            .should('have.value', 'Teste Endereço Adicional');
    });

});
