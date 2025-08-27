/// <references types =”Cypress”/>
import "../../support/commands";
describe("Cenários de Cadastro de Peças", () => {
  beforeEach(function () {
    cy.login();
  });

  it("Cadastro de Peças", () => {
    cy.get("#mat-expansion-panel-header-0").click();
    cy.contains("div.button-toggle-title", "Integrações").click();
    cy.contains("div.button-toggle-title", "Contas").click();

    cy.contains("td", "Luis")
      .parents("tr")
      .find("mat-icon")
      .contains("more_vert")
      .click();

    cy.get("button").contains("Definir como principal").click();
    cy.contains("Conta principal atualizada com sucesso").should("be.visible");
    cy.get("mat-icon").contains(" workspace_premium ").should("be.visible");

    cy.contains("td", /^Conta Teste$/)
      .parents("tr")
      .find("mat-icon")
      .contains("more_vert")
      .click();

    cy.get("button").contains("Definir como principal").click();
    cy.contains("Conta principal atualizada com sucesso").should("be.visible");
    cy.get("mat-icon").contains(" workspace_premium ").should("be.visible");
  });
});
