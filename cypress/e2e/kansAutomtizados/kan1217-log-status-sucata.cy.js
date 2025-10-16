/// <reference types="cypress" />
import "../../support/commands";
describe("Cenários de logs do status de Sucata", () => {
    beforeEach(function () {
        cy.login();
    });

    it("Desmembramento de sucata", () => {
        cy.cadSucata();
        cy.visit("https://beta-desmonte.ibrsoftweb.com.br/erp/waste");
        cy.contains("Não desmembrada").should("be.visible");

        cy.contains("mat-card-title", "BMW i3 2015")
            .parents("mat-card")
            .within(() => {
                cy.get("mat-icon").contains("plumbing").click();
            });

        cy.contains("Peças da Sucata").should("be.visible");
        cy.wait(1000);
        cy.contains("label.mat-checkbox-layout", "Roda Raiada Traseira (R)")
            .click()
            .find('input[type="checkbox"]')
            .should("be.checked");

        cy.get("button").contains("Adicionar Peças").click();

        cy.get(".mt-6").contains("(Progresso: 1/2)").should("be.visible");
        cy.get('#currentCost').type('400')
        cy.get("button").contains("Salvar e Avançar").click();
        // cy.get(".cancel-button").should("be.visible").click();
        cy.get(".mt-6").contains("(Progresso: 2/2)").should("be.visible");
        cy.get('#currentCost').type('400')
        cy.get("button").contains("Salvar e Finalizar").click();

        cy.contains("Deseja emitir as etiquetas?").should("be.visible");
        cy.get(".cancel-button").should("be.visible").click();

        cy.visit("https://beta-desmonte.ibrsoftweb.com.br/erp/waste");
        cy.contains("Desmembrada").should("be.visible");

        cy.visit('https://beta-desmonte.ibrsoftweb.com.br/erp/products')

        cy.contains("mat-card-title", "CUBO RODA")
            .parents("mat-card")
            .within(() => {
                cy.get("mat-icon").contains("more_vert").click();
            });
        cy.contains("mat-icon", "edit").click();
        cy.get('input[formcontrolname="currentCost"]').clear().type('150');
        cy.contains('button', 'Salvar').click();
        cy.contains('Produto atualizado com sucesso!').should('be.visible');
        cy.wait(700);
        cy.visit("https://beta-desmonte.ibrsoftweb.com.br/erp/waste");
        cy.contains("Em desmembramento").should("be.visible");

        cy.visit("https://beta-desmonte.ibrsoftweb.com.br/erp/logs");
        cy.wait(1000)
        cy.get('table.p-datatable-table tbody button').filter(':contains("Ver")').eq(1).click();
        cy.get('textarea').should('contain.value', "passou de 'Desmembrado' para 'Em desmembramento'");

        cy.visit("https://beta-desmonte.ibrsoftweb.com.br/erp/waste");
        cy.wait(1200);
        cy.contains("mat-card-title", "BMW i3 2015")
            .parents("mat-card")
            .within(() => {
                cy.get("mat-icon").contains("more_vert").click();
            });
        cy.contains("mat-icon", "delete").click();
        cy.contains("Deseja deletar esta sucata?").should("be.visible");
        cy.get("button").contains("Confirmar").click({ force: true });
        cy.contains("Deseja deletar os produtos que serão desvinculados?").should(
            "be.visible"
        );
        cy.get("button").contains("Sim").click({ force: true });
        cy.contains("Sucata deletada!").should("be.visible");
    });

});
