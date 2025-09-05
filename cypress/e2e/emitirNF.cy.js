/// <references types =”Cypress”/>
/*import "../support/commands";
describe("Cenários de emissão de NF-e", () => {
  beforeEach(function () {
    cy.login();
  });

  it("Emitir e cancelar uma NF", () => {
    cy.get("#mat-expansion-panel-header-5").click();
    cy.contains("div.button-toggle-title", " NFe ").click();

    cy.wait(1000);
    cy.get("div.row-nfe button")
      .contains("Avançar")
      .eq(0)
      .click({ force: true });

    cy.wait(500);
    cy.get("#mat-input-7").type("BARBARA{enter}");
    cy.get(
      ":nth-child(1) > .cdk-column-actions > .mat-focus-indicator"
    ).click();
    cy.wait(500);
    cy.get("#mat-input-10").type("89210625").blur();
    cy.get("#mat-input-13").type("123").blur();
    cy.wait(1000);
    cy.get(
      "ibr-app-step-destinatario.ng-star-inserted > .nfe-form > .justify-content-end > .action-button"
    ).click();

    cy.get("button").contains(" Inserir Produto ").click();
    cy.get('input[formcontrolname="descricao"]')
      .parents(".mat-form-field-flex")
      .find("mat-icon")
      .contains("search")
      .click({ force: true });
    cy.get("#mat-input-82").type("Volante Volkswagen Gol-G5 2009");
    cy.get(".col-sm-12 > .action-button").click();

    cy.get("tr").contains("Volante Volkswagen Gol-G5 2009").click();
    cy.get("button").contains(" Selecionar ").click();

    cy.get('input[formcontrolname="cfop"]')
      .parents(".mat-form-field-flex")
      .find("mat-icon")
      .contains("search")
      .click();

    cy.get("#search").type("6102");
    cy.get(
      ":nth-child(1) > .cdk-column-actions > .mat-focus-indicator"
    ).click();

    cy.get("div").contains("Informações Adicionais").click();
    cy.get('textarea[formcontrolname="infoAdd"]').clear();

    cy.get("button").contains("Salvar").click();
    cy.wait(1000);
    cy.get(".container > .nfe-form > .row > .action-button").click();

    cy.contains("Selecione uma modalidade de frete.").should("be.visible");
    cy.wait(1000);
    cy.get(
      "#cdk-step-content-0-3 > .mat-vertical-content > .ng-star-inserted > .nfe-form > .justify-content-end > .mat-stepper-next"
    ).click();

    cy.wait(500);
    cy.get(
      "#cdk-step-content-0-4 > .mat-vertical-content > .ng-star-inserted > .nfe-form > .justify-content-end > .mat-stepper-next"
    ).click();
    cy.contains("Duplicatas").should("be.visible");
    cy.wait(1000);
    cy.get(
      "ibr-app-step-duplicatas.ng-star-inserted > .justify-content-end > .mat-stepper-next"
    ).click();

    cy.contains("Formas de Pagamentos").should("be.visible");
    cy.get("#mat-input-25").type(60);
    cy.get(".pb-4 > .mat-focus-indicator").click();
    cy.wait(300);
    cy.get(
      "ibr-app-step-formas-pgto.ng-star-inserted > .justify-content-end > .mat-stepper-next"
    ).click();
    cy.get(
      "ibr-app-step-impostos.ng-star-inserted > .nfe-form > .justify-content-end > .action-button"
    ).click();
  });
});
*/