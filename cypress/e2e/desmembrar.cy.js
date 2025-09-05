/// <references types =”Cypress”/>
import "../support/commands";
describe("Cenários Desmembramento", () => {
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
    cy.get("#saleValue").type("50");
    cy.get("button").contains("Salvar e Avançar").click();
    cy.get(".cancel-button").should("be.visible").click();
    cy.get(".mt-6").contains("(Progresso: 2/2)").should("be.visible");
    cy.get("#saleValue").type("50");
    cy.get("button").contains("Salvar e Finalizar").click();

    cy.get(".cancel-button")
      .contains("Não publicar")
      .should("be.visible")
      .click();
    cy.contains(
      "Atenção! Deseja finalizar o desmembramento dessa sucata?"
    ).should("be.visible");
    cy.get(".cancel-button")
      .contains("Não finalizar")
      .should("be.visible")
      .click();
    cy.contains("Deseja emitir as etiquetas?").should("be.visible");
    cy.get(".cancel-button").should("be.visible").click();

    cy.visit("https://beta-desmonte.ibrsoftweb.com.br/erp/waste");
    cy.contains("Em desmembramento").should("be.visible");

    cy.clica3pontinhos();
    cy.contains("mat-icon", "analytics").click();
    cy.contains("Porcentagem de peças já vendidas: 0,00 %").should(
      "be.visible"
    );

    cy.contains("div.custom-tab", "Peças").click();
    cy.contains("R$ 100,00").should("be.visible");
    cy.get("button").contains("Fechar").click();

    cy.clica3pontinhos();

    cy.contains("mat-icon", "delete").click();
    cy.contains("Deseja deletar esta sucata?").should("be.visible");
    cy.contains("Confirmar").click();
    cy.contains("Deseja deletar os produtos que serão desvinculados?").should(
      "be.visible"
    );
    cy.contains("Sim").click();
    cy.contains("Sucata deletada!").should("be.visible");
  });

  //=====================CENÁRIO 02=============================

  it("Alterar status de Desmembramento de sucata", () => {
    cy.cadSucata();
    cy.visit("https://beta-desmonte.ibrsoftweb.com.br/erp/waste");
    cy.contains("Não desmembrada").should("be.visible");

    cy.clica3pontinhos();
    cy.contains("button", "Mudar Status").click();
    cy.contains("mat-icon", "construction").click();
    cy.contains("Status alterado com sucesso").should("be.visible");
    cy.wait(700);
    cy.contains("mat-card-title", "BMW i3 2015")
      .parents("mat-card")
      .within(() => {
        cy.get("mat-chip").should("contain.text", "Em desmembramento");
      });

    cy.clica3pontinhos();
    cy.contains("button", "Mudar Status").click();
    cy.contains("mat-icon", "check_circle").click();
    cy.contains("Status alterado com sucesso").should("be.visible");
    cy.wait(700);
    cy.contains("mat-card-title", "BMW i3 2015")
      .parents("mat-card")
      .within(() => {
        cy.get("mat-chip").should("contain.text", "Desmembrada");
      });

    cy.clica3pontinhos();
    cy.contains("mat-icon", "delete").click();
    cy.contains("Deseja deletar esta sucata?").should("be.visible");
    cy.contains("Confirmar").click();
    cy.contains("Deseja deletar os produtos que serão desvinculados?").should(
      "be.visible"
    );
    cy.contains("Sim").click();
    cy.contains("Sucata deletada!").should("be.visible");
  });

  //=====================CENÁRIO 03=============================

  it("Desmembrar e vender sucata", () => {
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
    cy.get("#saleValue").type("50");
    cy.get("button").contains("Salvar e Avançar").click();
    cy.get(".cancel-button").should("be.visible").click();
    cy.get(".mt-6").contains("(Progresso: 2/2)").should("be.visible");
    cy.get("#saleValue").type("50");
    cy.get("button").contains("Salvar e Finalizar").click();

    cy.get(".cancel-button")
      .contains("Não publicar")
      .should("be.visible")
      .click();
    cy.contains(
      "Atenção! Deseja finalizar o desmembramento dessa sucata?"
    ).should("be.visible");
    cy.get(".cancel-button")
      .contains("Não finalizar")
      .should("be.visible")
      .click();
    cy.contains("Deseja emitir as etiquetas?").should("be.visible");
    cy.get(".cancel-button").should("be.visible").click();

    cy.visit("https://beta-desmonte.ibrsoftweb.com.br/erp/waste");
    cy.contains("Em desmembramento").should("be.visible");

    cy.visit("https://beta-desmonte.ibrsoftweb.com.br/erp/sales/new-sale");
    cy.contains("mat-icon", "search").click();
    cy.wait(700);
    cy.get('input[formcontrolname="description"]')
      .first()
      .type("Automatizado{enter}");
    cy.contains("Aro BMW i3 2015").click();
    cy.get("button").contains("Selecionar").click();

    cy.get("button").contains("Salvar").click();
    cy.get('input[formcontrolname="customerDescription"]')
      .parents(".mat-form-field-flex")
      .find("mat-icon")
      .contains("search")
      .click();

    cy.get("#search").type("Teste 5");
    cy.wait(600);
    cy.contains("td", /^Teste 5$/)
      .parents("tr")
      .dblclick();
    cy.contains("mat-icon", "done").click();
    cy.contains("Adicionado com sucesso.").should("be.visible");
    cy.contains("F8 - Finalizar Venda").click();
    cy.get("button").contains("Salvar").click();

    cy.contains("mat-radio-button", "NF-e").click();

    cy.get('input[formcontrolname="value"]')
      .parents(".mat-form-field-flex")
      .find("mat-icon")
      .contains("done")
      .click();

    cy.get("button").contains("Finalizar").click();

    cy.visit("https://beta-desmonte.ibrsoftweb.com.br/erp/waste");
    cy.clica3pontinhos();
    cy.contains("mat-icon", "analytics").click();
    cy.contains("Porcentagem de peças já vendidas: 50,00 %").should(
      "be.visible"
    );
    cy.contains("div.custom-tab", "Peças").click();
    cy.contains(".mat-tab-label", "Peças Vendidas").click({ force: true });
    cy.contains("Balcão").should("be.visible");
    cy.contains("R$ 50,00").should("be.visible");
    cy.get("button").contains("Fechar").click();

    cy.clica3pontinhos();

    cy.contains("mat-icon", "delete").click();
    cy.contains("Deseja deletar esta sucata?").should("be.visible");
    cy.contains("Confirmar").click();
    cy.contains("Deseja deletar os produtos que serão desvinculados?").should(
      "be.visible"
    );
    cy.contains("Sim").click();
    cy.contains("Sucata deletada!").should("be.visible");
  });
});
