/// <reference types="cypress" />
import "../../support/commands";
describe("Cenários de validação do campo PartNumber", () => {
    beforeEach(function () {
        cy.login();
    });

    it("Campo PartNumber", () => {
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
        cy.contains("mat-icon", "publish").click();

        cy.get(".mat-select-placeholder").click();
        cy.get("mat-option").contains(" Conta Teste ").click();
        cy.get("body").type("{esc}");

        // === Avançar até dados adicionais ===
        for (let i = 0; i < 5; i++) {
            cy.contains("button", " Avançar ").click();
            cy.wait(300);
        }

        cy.contains("mat-label", " Número de peça ")
            .parents(".mat-form-field")
            .find("input")
            .should('have.value', '12345ABC');

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

    it("Edição do Campo Partnumber", () => {
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
        cy.wait(500);

        cy.contains("mat-card-title", "BOLSA AIR BAG")
            .parents("mat-card")
            .within(() => {
                cy.get("mat-icon").contains("more_vert").click();
            });
        cy.contains("mat-icon", "edit").click();
        cy.get('#partNumberForm')
            .should("have.value", '12345ABC').clear();
        cy.get('#partNumberForm').clear().type('98765ZYX');
        cy.get('#partNumberForm').should('have.value', '98765ZYX');
        cy.wait(500);
        cy.get("button").contains("Salvar").click();

        cy.wait(500);
        cy.contains("mat-card-title", "BOLSA AIR BAG")
            .parents("mat-card")
            .within(() => {
                cy.get("mat-icon").contains("more_vert").click();
            });
        cy.contains("mat-icon", "publish").click();

        cy.get(".mat-select-placeholder").click();
        cy.get("mat-option").contains(" Conta Teste ").click();
        cy.get("body").type("{esc}");

        // === Avançar até dados adicionais ===
        for (let i = 0; i < 5; i++) {
            cy.contains("button", " Avançar ").click();
            cy.wait(300);
        }

        cy.contains("mat-label", " Número de peça ")
            .parents(".mat-form-field")
            .find("input")
            .should('have.value', '98765ZYX');

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
