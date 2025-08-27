/// <references types =”Cypress”/>
import "../support/commands";
describe("Cenários de Cadastro de Peças", () => {
  beforeEach(function () {
    cy.login();
  });

  it("Cadastro de Peças", () => {
    cy.get("#mat-expansion-panel-header-0").click();
    cy.contains("div.button-toggle-title", "Cadastro de Peças").click();
    cy.get("#purchaseWasteIdFormWaste").click();
    cy.contains("mat-icon", "search").click();
    cy.get("#search").type("SUBARU");
    cy.contains("tr", "Subaru").dblclick();
    cy.get("#mat-input-12").type("10");

    cy.contains("mat-label", "Categoria") // Localiza o label
      .parents(".mat-form-field") // Sobe até o container completo do campo
      .find("mat-icon") // Busca os ícones dentro do campo
      .contains("search") // Filtra pelo conteúdo do ícone
      .click(); // Clica no ícone

    cy.contains("button", "Pesquisar Categoria").should("be.visible").click();
    cy.contains("div.categoryOption", "Acessórios para Veículos")
      .find("button")
      .click();
    cy.get(".categoryOption")
      .contains("h2", "Outros") // garante que é o card que tem o título "Outros"
      .parents(".categoryOption") // volta ao contêiner completo
      .find("button") // encontra o botão dentro do card certo
      .click();

    cy.contains("mat-label", "Título")
      .parents(".mat-form-field")
      .find("input")
      .click()
      .type("{selectall}{backspace}") // Seleciona tudo e apaga
      .type("PEÇA AUTOMATIZADA{enter}");

    cy.contains("button", " Salvar ").should("be.visible").click();
    cy.contains("button", "Não anunciar").should("be.visible").click();
    cy.contains("button", "Cancelar").should("be.visible").click();
    cy.contains("Peça unitária cadastrada com sucesso!").should("be.visible");

    cy.visit("https://beta-desmonte.ibrsoftweb.com.br/erp/products");
    cy.wait(500);
    cy.contains("PEÇA AUTOMATIZADA").should("be.visible");
    cy.contains("mat-card", "PEÇA AUTOMATIZADA")
      .find("mat-icon")
      .contains("delete")
      .click();
    cy.contains("Deseja mesmo deletar este produto?").should("be.visible");
    cy.contains("button", "Confirmar").should("be.visible").click();
    cy.contains("Produto removido com sucesso!").should("be.visible");
  });

  //===================== CENÁRIO 02 =============================

  it("Botão de cadastro desabilitado ao tentar cadastrar sem informar descrição", () => {
    cy.get("#mat-expansion-panel-header-0").click();
    cy.contains("div.button-toggle-title", "Cadastro de Peças").click();
    cy.get("#purchaseWasteIdFormWaste").click();
    cy.contains("mat-icon", "search").click();
    cy.get("#search").type("SUBARU");
    cy.contains("tr", "Subaru").dblclick();
    cy.get("#mat-input-12").type("10");

    cy.contains("mat-label", "Título")
      .parents(".mat-form-field")
      .find("input")
      .click()
      .type("{selectall}{backspace}"); // Seleciona tudo e apaga

    cy.contains("button", " Salvar ").should("be.disabled");
  });

  //===================== CENÁRIO 03 =============================

  it("Botão de cadastro desabilitado ao tentar cadastrar sem informar custo de compra", () => {
    cy.get("#mat-expansion-panel-header-0").click();
    cy.contains("div.button-toggle-title", "Cadastro de Peças").click();
    cy.get("#purchaseWasteIdFormWaste").click();
    cy.contains("mat-icon", "search").click();
    cy.get("#search").type("SUBARU");
    cy.contains("tr", "Subaru").dblclick();
    cy.get("#mat-input-12").type("10");

    cy.contains("mat-label", "Custo de Compra (R$)")
      .parents(".mat-form-field")
      .find("input")
      .click()
      .type("{selectall}{backspace}"); // Seleciona tudo e apaga

    cy.contains("mat-label", "Categoria") // Localiza o label
      .parents(".mat-form-field") // Sobe até o container completo do campo
      .find("mat-icon") // Busca os ícones dentro do campo
      .contains("search") // Filtra pelo conteúdo do ícone
      .click(); // Clica no ícone

    cy.contains("button", "Pesquisar Categoria").should("be.visible").click();
    cy.contains("div.categoryOption", "Acessórios para Veículos")
      .find("button")
      .click();
    cy.get(".categoryOption")
      .contains("h2", "Outros") // garante que é o card que tem o título "Outros"
      .parents(".categoryOption") // volta ao contêiner completo
      .find("button") // encontra o botão dentro do card certo
      .click();

    cy.contains("button", " Salvar ").should("be.disabled");
  });

  //===================== CENÁRIO 04 =============================

  it("Visualizar Detalhes da Peça", () => {
    cy.get("#mat-expansion-panel-header-0").click();
    cy.contains("div.button-toggle-title", "Cadastro de Peças").click();
    cy.get("#purchaseWasteIdFormWaste").click();
    cy.contains("mat-icon", "search").click();
    cy.get("#search").type("SUBARU");
    cy.contains("tr", "Subaru").dblclick();
    cy.get("#mat-input-12").type("10");

    cy.contains("mat-label", "Categoria") // Localiza o label
      .parents(".mat-form-field") // Sobe até o container completo do campo
      .find("mat-icon") // Busca os ícones dentro do campo
      .contains("search") // Filtra pelo conteúdo do ícone
      .click(); // Clica no ícone

    cy.contains("button", "Pesquisar Categoria").should("be.visible").click();
    cy.contains("div.categoryOption", "Acessórios para Veículos")
      .find("button")
      .click();
    cy.get(".categoryOption")
      .contains("h2", "Outros") // garante que é o card que tem o título "Outros"
      .parents(".categoryOption") // volta ao contêiner completo
      .find("button") // encontra o botão dentro do card certo
      .click();

    cy.contains("mat-label", "Título")
      .parents(".mat-form-field")
      .find("input")
      .click()
      .type("{selectall}{backspace}") // Seleciona tudo e apaga
      .type("PEÇA AUTOMATIZADA{enter}");

    cy.contains("button", " Salvar ").should("be.visible").click();
    cy.contains("button", "Não anunciar").should("be.visible").click();
    cy.contains("button", "Cancelar").should("be.visible").click();
    cy.contains("Peça unitária cadastrada com sucesso!").should("be.visible");

    cy.visit("https://beta-desmonte.ibrsoftweb.com.br/erp/products");
    cy.contains("PEÇA AUTOMATIZADA").should("be.visible");
    cy.contains("mat-card", "PEÇA AUTOMATIZADA")
      .find("mat-icon")
      .contains("visibility")
      .click();

    cy.validateProductDetails({
      Descrição: "PEÇA AUTOMATIZADA",
      Placa: "MYF5568",
      Estoque: "1",
      Chassi: "68491346408",
      CST: "102 Tributada Pelo Simples Nacional sem Permissão de Crédito",
      CFOP: "5102 Venda de mercadoria adquirida ou recebida de terceiros",
    });

    cy.get("button").contains("Fechar").click();
    cy.contains("mat-card", "PEÇA AUTOMATIZADA")
      .find("mat-icon")
      .contains("delete")
      .click();
    cy.contains("Deseja mesmo deletar este produto?").should("be.visible");
    cy.contains("button", "Confirmar").should("be.visible").click();
    cy.contains("Produto removido com sucesso!").should("be.visible");
  });
});
