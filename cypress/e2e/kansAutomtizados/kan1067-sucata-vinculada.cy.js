/// <reference types="cypress" />
import "../../support/commands";
describe("Cenários de validação do campo de informação de Sucata vinculada", () => {
    beforeEach(function () {
        cy.login();
    });

    it("Vincular Sucata e validar informações na Peça", () => {
        const imagens = ["sample8.webp"];

        cy.get("#mat-expansion-panel-header-0").click();
        cy.contains("div.button-toggle-title", "Cadastro de Peças").click();
        cy.wait(200);
        cy.get("#mat-input-12").type("10");

        cy.contains("mat-label", "Título")
            .parents(".mat-form-field")
            .find("input")
            .click()
            .type("{selectall}{backspace}")
            .type("BOLSA AIRBAG VOLANTE{enter}");
        cy.get('mat-option').contains('Bolsa Air Bag Volante Spin').click();

        cy.get('input[type="file"][accept="image/*"]')
            .first()
            .selectFile(
                imagens.map((img) => `cypress/fixtures/${img}`),
                { force: true }
            );
        cy.wait(700);

        cy.get('#partNumberForm')
            .should("be.visible");
        cy.get('#partNumberForm').type('12345ABC');
        cy.get('#partNumberForm').should('have.value', '12345ABC');
        cy.wait(500);

        cy.contains("button", " Salvar ").should("be.visible").click();
        cy.contains("button", "Não anunciar").should("be.visible").click();
        cy.contains("button", "Cancelar").should("be.visible").click();
        cy.contains("Peça unitária cadastrada com sucesso!").should("be.visible");
        cy.visit("https://beta-desmonte.ibrsoftweb.com.br/erp/products");

        cy.contains("mat-card-title", "BOLSA AIR BAG")
            .parents("mat-card")
            .within(() => {
                cy.get("mat-icon").contains("more_vert").click();
            });
        cy.contains("mat-icon", "link").click();
        cy.get("#search").type("45180{enter}");
        cy.wait(600);
        cy.contains("td", /^45180$/)
            .parents("tr")
            .dblclick();
        cy.contains('Bolsa Air Bag Volante Spin 2012/20 à sucata: FORD KA SAD8445?')
        cy.get("button").contains("Confirmar").click({ force: true });
        cy.contains("Vinculado com sucesso!").should("be.visible");

        cy.contains("mat-card-title", "BOLSA AIR BAG")
            .parents("mat-card")
            .within(() => {
                cy.get("mat-icon").contains("more_vert").click();
            });
        cy.contains("mat-icon", "edit").click();
        cy.contains('Outras Informações').click();
        cy.get('mat-label').contains('Informações da Sucata Vínculada').should('be.visible');
        cy.get('input[formcontrolname="purchaseWasteDescription"]')
            .should('have.value', '45180 - FORD  KA  2001 sad8445');

        cy.visit("https://beta-desmonte.ibrsoftweb.com.br/erp/products");
        cy.wait(500);
        cy.contains("mat-card", "BOLSA AIR BAG")
            .find("mat-icon")
            .contains("delete")
            .click();
        cy.contains("Deseja mesmo deletar este produto?").should("be.visible");
        cy.contains("button", "Confirmar").should("be.visible").click();
        cy.contains("Produto removido com sucesso!").should("be.visible");
    });
});