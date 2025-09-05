/// <references types =”Cypress”/>
import "../../support/commands";
describe("Cenários de Cadastro de Sucata", () => {
  beforeEach(function () {
    cy.login();
  });

  it("Modal de aviso quando anunciar item de segurança", () => {
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
    cy.get(".mat-option-text").contains("Bolsa Airbag Volante Audi").click();

    cy.get('input[type="file"][accept="image/*"]')
      .first()
      .selectFile(
        imagens.map((img) => `cypress/fixtures/${img}`),
        { force: true }
      );
    cy.wait(700);
    cy.contains("button", " Salvar ").should("be.visible").click();
    cy.contains("button", "Não anunciar").should("be.visible").click();
    cy.contains("button", "Cancelar").should("be.visible").click();
    cy.contains("Peça unitária cadastrada com sucesso!").should("be.visible");
    cy.visit("https://beta-desmonte.ibrsoftweb.com.br/erp/products");

    cy.contains("mat-card-title", "BOLSA AIRBAG")
      .parents("mat-card")
      .within(() => {
        cy.get("mat-icon").contains("more_vert").click();
      });
    cy.contains("mat-icon", "edit").click();
    cy.contains("mat-checkbox", "Item de Segurança").click();
    cy.get("button").contains("Salvar").click();

    cy.wait(500);
    cy.contains("mat-card-title", "BOLSA AIRBAG")
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
      .type("123");

    cy.get("mat-label")
      .contains("Cor da superficie do airbag")
      .parents("mat-form-field")
      .find("mat-select")
      .click();
    cy.get("mat-option").contains("Cinza").click();

    cy.get("mat-label")
      .contains("Posição do airbag")
      .parents("mat-form-field")
      .find("mat-select")
      .click();
    cy.get("mat-option").contains("Volante").click();

    /*  cy.get("button").contains(" Avançar ").click();
    cy.get("button").contains(" Alterar Compatibilidade ").click();
    cy.wait(1000);
    cy.get("mat-label")
      .contains("Versão")
      .parents("mat-form-field")
      .find("mat-select")
      .click();
    cy.get("mat-option").eq(0).click();
    cy.wait(300);
    cy.get("body").type("{esc}");
    cy.wait(500);

    cy.get("table").find("mat-checkbox").eq(1).click();
    cy.get("button").contains("Selecionar").click();
    cy.wait(300); */
    for (let i = 0; i < 4; i++) {
      cy.contains("button", " Avançar ").click();
      cy.wait(300);
    }

    cy.get("mat-label")
      .contains("Condição do item")
      .parents("mat-form-field")
      .find("mat-select")
      .click();
    cy.get("mat-option").contains("Novo").click();

    cy.contains("mat-label", "Valor do Anúncio")
      .parents(".mat-form-field")
      .find("input")
      .click()
      .type("{selectall}{backspace}")
      .type("75{enter}");

    cy.get("button").contains("Publicar").click();
    cy.contains(
      "O item a ser anúnciado é um item de segurança. Tem certeza que deseja publicar este item?"
    ).should("be.visible");

    cy.visit("https://beta-desmonte.ibrsoftweb.com.br/erp/products");
    cy.wait(500);
    cy.contains("mat-card", "BOLSA AIRBAG")
      .find("mat-icon")
      .contains("delete")
      .click();
    cy.contains("Deseja mesmo deletar este produto?").should("be.visible");
    cy.contains("button", "Confirmar").should("be.visible").click();
    cy.contains("Produto removido com sucesso!").should("be.visible");
  });
});
