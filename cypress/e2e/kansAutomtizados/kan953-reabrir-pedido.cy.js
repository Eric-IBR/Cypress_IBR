/// <references types =”Cypress”/>
import "../../support/commands";
describe("Cenários de Cadastro de Sucata", () => {
  beforeEach(function () {
    cy.login();
  });

  it("Reabrir pedido fechado no carrinho", () => {
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

    // cy.get(".mat-option-text").contains("PEÇA AUTOMATIZADA").click();
    cy.contains("button", " Salvar ").should("be.visible").click();
    cy.contains("button", "Não anunciar").should("be.visible").click();
    cy.contains("button", "Cancelar").should("be.visible").click();
    cy.contains("Peça unitária cadastrada com sucesso!").should("be.visible");

    cy.visit("https://beta-desmonte.ibrsoftweb.com.br/erp/products");
    cy.wait(500);
    cy.contains("PEÇA AUTOMATIZADA").should("be.visible");
    cy.contains("mat-card", "PEÇA AUTOMATIZADA")
      .find("mat-icon")
      .contains("local_grocery_store")
      .click();

    cy.get("mat-icon").contains("local_grocery_store").click();
    cy.get("mat-radio-button").contains("Abertos").click();
    cy.get("mat-icon").contains("download_done").click();
    cy.contains("Deseja fechar esse pedido?").should("be.visible");
    cy.get("button").contains(" Confirmar ").click();
    cy.get("button").contains(" Cancelar ").click();

    cy.contains("Pedido fechado com sucesso").should("be.visible");
    cy.get("mat-radio-button").contains("Fechados").click();

    cy.get("mat-icon").contains("replay").should("be.visible").click();
    cy.contains("Deseja re-abrir esse pedido?").should("be.visible");
    cy.get("button").contains(" Confirmar ").click();
    cy.contains("Pedido reaberto com sucesso").should("be.visible");

    cy.get("mat-radio-button").contains("Abertos").click();
    cy.get("mat-icon").contains("delete_forever").click();
    cy.get("button").contains(" Confirmar ").click();
    cy.contains("Pedido deletado com sucesso").should("be.visible");
    cy.get("button").contains(" Fechar ").click();

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

  //======================================================================================

  it("Erro ao tentar reabrir pedido quando já possuir pedido em aberto", () => {
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
    // cy.get(".mat-option-text").contains("PEÇA AUTOMATIZADA").click();
    cy.contains("button", " Salvar ").should("be.visible").click();
    cy.contains("button", "Não anunciar").should("be.visible").click();
    cy.contains("button", "Cancelar").should("be.visible").click();
    cy.contains("Peça unitária cadastrada com sucesso!").should("be.visible");

    cy.visit("https://beta-desmonte.ibrsoftweb.com.br/erp/products");
    cy.wait(500);
    cy.get("#mat-expansion-panel-header-0").click();
    cy.contains("div.button-toggle-title", "Cadastro de Peças").click();
    cy.get("#purchaseWasteIdFormWaste").click();
    cy.contains("mat-icon", "search").click();
    cy.get("#search").type("SUBARU");
    cy.contains("tr", "Subaru").dblclick();
    //cy.get("#mat-input-12").type("10");

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
      .type("PEÇA CY{enter}");
    // cy.get(".mat-option-text").contains("PEÇA AUTOMATIZADA").click();
    cy.contains("button", " Salvar ").should("be.visible").click();
    cy.contains("button", "Não anunciar").should("be.visible").click();
    cy.contains("button", "Cancelar").should("be.visible").click();
    cy.contains("Peça unitária cadastrada com sucesso!").should("be.visible");

    cy.visit("https://beta-desmonte.ibrsoftweb.com.br/erp/products");
    cy.wait(500);

    cy.contains("mat-card", "PEÇA AUTOMATIZADA")
      .find("mat-icon")
      .contains("local_grocery_store")
      .click();

    cy.get("mat-icon").contains("local_grocery_store").click();
    cy.get("mat-radio-button").contains("Abertos").click();
    cy.get("mat-icon").contains("download_done").click();
    cy.contains("Deseja fechar esse pedido?").should("be.visible");
    cy.get("button").contains(" Confirmar ").click();
    cy.get("button").contains(" Cancelar ").click();

    cy.contains("Pedido fechado com sucesso").should("be.visible");
    cy.get("button").contains(" Fechar ").click();

    cy.contains("mat-card", "PEÇA CY")
      .find("mat-icon")
      .contains("local_grocery_store")
      .click();

    cy.get("mat-icon").contains("local_grocery_store").click();
    cy.get("mat-radio-button").contains("Fechados").click();

    cy.get("mat-icon").contains("replay").should("be.visible").click();
    cy.contains("Deseja re-abrir esse pedido?").should("be.visible");
    cy.get("button").contains(" Confirmar ").click();
    cy.contains(
      "Já existe pedido em aberto, necessário excluir ou fechar o pedido atual antes de reabrir outro."
    ).should("be.visible");

    cy.get("mat-radio-button").contains("Abertos").click();
    cy.get("mat-icon").contains("delete_forever").click();
    cy.get("button").contains(" Confirmar ").click();
    cy.contains("Pedido deletado com sucesso").should("be.visible");

    cy.get("mat-radio-button").contains("Fechados").click();
    cy.get("mat-icon").contains("delete_forever").click();
    cy.get("button").contains(" Confirmar ").click();
    cy.contains("Pedido deletado com sucesso").should("be.visible");
    cy.get("button").contains(" Fechar ").click();

    cy.wait(500);
    cy.contains("mat-card", "PEÇA CY")
      .find("mat-icon")
      .contains("delete")
      .click();
    cy.contains("Deseja mesmo deletar este produto?").should("be.visible");
    cy.contains("button", "Confirmar").should("be.visible").click();
    cy.contains("Produto removido com sucesso!").should("be.visible");

    cy.wait(500);
    cy.contains("mat-card", "PEÇA AUTOMATIZADA")
      .find("mat-icon")
      .contains("delete")
      .click();
    cy.contains("Deseja mesmo deletar este produto?").should("be.visible");
    cy.contains("button", "Confirmar").should("be.visible").click();
    cy.contains("Produto removido com sucesso!").should("be.visible");
  });

  //======================================================================================

  it("Tentar reabrir pedido quando já possuir pedido em aberto, excluir pedido aberto e reabrir o fechado", () => {
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
    // cy.get(".mat-option-text").contains("PEÇA AUTOMATIZADA").click();
    cy.contains("button", " Salvar ").should("be.visible").click();
    cy.contains("button", "Não anunciar").should("be.visible").click();
    cy.contains("button", "Cancelar").should("be.visible").click();
    cy.contains("Peça unitária cadastrada com sucesso!").should("be.visible");
    cy.visit("https://beta-desmonte.ibrsoftweb.com.br/erp/products");

    cy.wait(500);
    cy.contains("mat-card", "PEÇA AUTOMATIZADA")
      .find("mat-icon")
      .contains("local_grocery_store")
      .click();

    cy.get("mat-icon").contains("local_grocery_store").click();
    cy.get("mat-radio-button").contains("Abertos").click();
    cy.get("mat-icon").contains("download_done").click();
    cy.contains("Deseja fechar esse pedido?").should("be.visible");
    cy.get("button").contains(" Confirmar ").click();
    cy.get("button").contains(" Cancelar ").click();

    cy.contains("Pedido fechado com sucesso").should("be.visible");
    cy.get("button").contains(" Fechar ").click();

    cy.wait(500);
    cy.get("#mat-expansion-panel-header-0").click();
    cy.contains("div.button-toggle-title", "Cadastro de Peças").click();
    cy.get("#purchaseWasteIdFormWaste").click();
    cy.contains("mat-icon", "search").click();
    cy.get("#search").type("SUBARU");
    cy.contains("tr", "Subaru").dblclick();
    //cy.get("#mat-input-12").type("10");

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
      .type("PEÇA CY{enter}");
    // cy.get(".mat-option-text").contains("PEÇA AUTOMATIZADA").click();
    cy.contains("button", " Salvar ").should("be.visible").click();
    cy.contains("button", "Não anunciar").should("be.visible").click();
    cy.contains("button", "Cancelar").should("be.visible").click();
    cy.contains("Peça unitária cadastrada com sucesso!").should("be.visible");

    cy.visit("https://beta-desmonte.ibrsoftweb.com.br/erp/products");
    cy.wait(500);

    cy.contains("mat-card", "PEÇA CY")
      .find("mat-icon")
      .contains("local_grocery_store")
      .click();

    cy.get("mat-icon").contains("local_grocery_store").click();
    cy.get("mat-radio-button").contains("Fechados").click();

    cy.get("mat-icon").contains("replay").should("be.visible").click();
    cy.contains("Deseja re-abrir esse pedido?").should("be.visible");
    cy.get("button").contains(" Confirmar ").click();
    cy.contains(
      "Já existe pedido em aberto, necessário excluir ou fechar o pedido atual antes de reabrir outro."
    ).should("be.visible");
    cy.wait(1300);
    cy.get("mat-radio-button").contains("Abertos").click();
    cy.wait(700);
    cy.get("mat-icon").contains("delete_forever").click();
    cy.get("button").contains(" Confirmar ").click();
    cy.contains("Pedido deletado com sucesso").should("be.visible");

    cy.get("mat-radio-button").contains("Fechados").click();
    cy.get("mat-icon").contains("replay").should("be.visible").click();
    cy.contains("Deseja re-abrir esse pedido?").should("be.visible");
    cy.get("button").contains(" Confirmar ").click();
    cy.contains("Pedido reaberto com sucesso").should("be.visible");

    cy.get("mat-radio-button").contains("Abertos").click();
    cy.get("mat-icon").contains("delete_forever").click();
    cy.get("button").contains(" Confirmar ").click();
    cy.contains("Pedido deletado com sucesso").should("be.visible");
    cy.get("button").contains(" Fechar ").click();

    cy.wait(500);
    cy.contains("mat-card", "PEÇA CY")
      .find("mat-icon")
      .contains("delete")
      .click();
    cy.contains("Deseja mesmo deletar este produto?").should("be.visible");
    cy.contains("button", "Confirmar").should("be.visible").click();
    cy.contains("Produto removido com sucesso!").should("be.visible");

    cy.wait(500);
    cy.contains("mat-card", "PEÇA AUTOMATIZADA")
      .find("mat-icon")
      .contains("delete")
      .click();
    cy.contains("Deseja mesmo deletar este produto?").should("be.visible");
    cy.contains("button", "Confirmar").should("be.visible").click();
    cy.contains("Produto removido com sucesso!").should("be.visible");
  });
});
