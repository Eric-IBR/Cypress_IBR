// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("login", function () {
  cy.visit(
    "https://beta-desmonte.ibrsoftweb.com.br/account/signin?redirectFrom=%2Ferp%2Fdashboard"
  );
  cy.get("#mat-input-0").type("eric.araujo@ibrsoft.com.br");
  cy.get("#mat-input-1").type("Teste@2025");
  cy.get('[type="submit"').click();
  //cy.get('#mat-dialog-title-0').should('have.text', 'Lembrete de Vencimento Contas a Pagar / Receber')
  //cy.get('.mat-dialog-actions > .mat-focus-indicator').click()
});

Cypress.Commands.add("loginSisdev", function () {
  cy.visit(
    "https://beta-desmonte.ibrsoftweb.com.br/account/signin?redirectFrom=%2Ferp%2Fdashboard"
  );
  cy.get("#mat-input-0").type("sisdev@teste.com");
  cy.get("#mat-input-1").type("Teste@2025");
  cy.get('[type="submit"').click();
  //cy.get('#mat-dialog-title-0').should('have.text', 'Lembrete de Vencimento Contas a Pagar / Receber')
  //cy.get('.mat-dialog-actions > .mat-focus-indicator').click()
});

Cypress.Commands.add("cadSucata", function () {
  const fixtureFile = "sample.png";
    cy.get("#mat-expansion-panel-header-0").click();
    cy.contains("div.button-toggle-title", "Cadastro de Sucatas").click();

    // Usando cy.selectFile() (recomendado - Cypress v12+)

    // Interage diretamente com o input file (sem clicar no botão)
    cy.get('input[type="file"][accept="image/*"]').selectFile(
      `cypress/fixtures/${fixtureFile}`,
      { force: true }
    );

    // Valida que a imagem foi carregada
    cy.get(".waste-images-content img", { timeout: 10000 })
      .should("have.attr", "src")
      .and((src) => {
        expect(src).not.to.contain("product-without-image.png");
      });

    cy.contains("mat-label", "Grupo de Peças") // encontra o label
      .parents(".mat-form-field") // sobe até o container do campo
      .find("mat-icon") // busca os ícones dentro dele
      .contains("search") // filtra pelo texto do ícone
      .click(); // clica no ícone

    cy.get("#search").type("Carro Teste{enter}");
    cy.wait(600);
    cy.contains("td", /^Carro TESTE$/)
      .parents("tr")
      .dblclick();

    cy.contains("mat-label", "Fornecedor") // encontra o label
      .parents(".mat-form-field") // sobe até o container do campo
      .find("mat-icon") // busca os ícones dentro dele
      .contains("search") // filtra pelo texto do ícone
      .click(); // clica no ícone

    cy.get("#search").type("IBR Teste{enter}");
    cy.contains("td", /^IBR Teste$/)
      .parents("tr")
      .dblclick();

    //cy.get("#providers").type("Teste");
    cy.get("#purchaseValue").type("800,00");

    cy.get("#mat-chip-list-input-0").click();
    cy.get("span").contains("BMW").click();
    //cy.get("#brand").type("CY");
    cy.get("#mat-chip-list-input-1").type("I3"); //CAMPO MODELO
    cy.get("span").contains("i3").click();

    cy.get("#mat-chip-list-input-2").click();
    cy.get("span").contains("2015").click();

    cy.get("#mat-chip-list-input-3").type("0.6 Rex Full 5p Eléctrico");
    cy.get("span").contains("0.6 Rex Full 5p Eléctrico").click();

    cy.placaSucataAleatoria("#licensePlate");
    cy.get("#mat-input-8").type("A");
    cy.contains("mat-option", "Amarelo").click();
    cy.get("#chassis").type("12345678910123456");
    cy.get("#lot").type("4225");
    cy.get("#vehicleCertificate").type("TESTE");
    cy.get("#locations").type("{enter}", { force: true });
    cy.contains("div.mr-3.ml-3", "Teste IAGO").should("be.visible").click();
    cy.contains("div.mr-3.ml-3", " TESTE-3 ").should("be.visible").click();
    cy.contains("button", " Salvar ").should("be.visible").click();
    cy.wait(700);
    cy.get("button").contains("Cancelar").click({ force: true });
});

Cypress.Commands.add("clica3pontinhos", function () {
  cy.contains("mat-card-title", "BMW i3 2015")
    .parents("mat-card")
    .within(() => {
      cy.get("mat-icon").contains("more_vert").click();
    });
});

// Comando customizado mais robusto
Cypress.Commands.add("validateProductDetails", (expectedFields) => {
  Object.entries(expectedFields).forEach(([label, expectedValue]) => {
    cy.get("p")
      .filter((_, el) => {
        return el
          .querySelector("b")
          ?.textContent?.trim()
          .startsWith(`${label}:`);
      })
      .should("contain.text", expectedValue);
  });
});

Cypress.Commands.add("placaSucataAleatoria", (selector) => {
  // Gera 3 letras maiúsculas aleatórias A–Z
  const letters = Array.from({ length: 3 }, () =>
    String.fromCharCode(65 + Math.floor(Math.random() * 26))
  ).join("");
  // Gera um número aleatório de 4 dígitos (1000–9999)
  const numbers = Math.floor(1000 + Math.random() * 9000).toString();
  const plate = `${letters}-${numbers}`;

  // opcional: verificar que o plate bate o regex
  if (!/^[A-Z]{3}-\d{4}$/.test(plate)) {
    throw new Error(`Placa gerada fora do padrão: ${plate}`);
  }

  cy.get(selector).clear().type(plate);
});

Cypress.Commands.add("preencherDadosDetranAleatorio", () => {
  const gerarNumero = (tamanho = 11) => {
    return Math.floor(Math.random() * Math.pow(10, tamanho))
      .toString()
      .padStart(tamanho, "0");
  };

  const renavam = gerarNumero(11);
  const numeroNF = gerarNumero(11);
  const serieNF = gerarNumero(11);
  const cartela = gerarNumero(11);

  cy.get("#renavam").type(renavam);
  cy.get("#numberNF").type(numeroNF);
  cy.get("#seriesNF").type(serieNF);
  cy.get("#cardNumber").type(cartela);

  return cy.wrap({
    renavam,
    numeroNF,
    serieNF,
    cartela,
  });
});

Cypress.Commands.add("ajustarDadosDetranAleatorio", () => {
  const gerarNumero = (tamanho = 11) => {
    return Math.floor(Math.random() * Math.pow(10, tamanho))
      .toString()
      .padStart(tamanho, "0");
  };

  const renavam = gerarNumero(11);
  const numeroNF = gerarNumero(11);
  const serieNF = gerarNumero(11);
  const cartela = gerarNumero(11);

  cy.get('input[formcontrolname="renavam"]')
    .clear()
    .type(renavam, { force: true });
  cy.get('input[formcontrolname="numberNF"]')
    .clear()
    .type(numeroNF, { force: true });
  cy.get('input[formcontrolname="seriesNF"]')
    .clear()
    .type(serieNF, { force: true });
  cy.get('input[formcontrolname="cardNumber"]')
    .clear()
    .type(cartela, { force: true });

  return cy.wrap({
    renavam,
    numeroNF,
    serieNF,
    cartela,
  });
});

// cypress/support/commands.js
Cypress.Commands.add("clicarCarregarMaisNVezes", (quantidade, delay = 800) => {
  // Usa _.times para gerar as iterações de forma mais Cypress‑friendly
  Cypress._.times(quantidade, (i) => {
    cy.contains("div.button.light", "Carregar Mais")
      .should("be.visible")
      .click()
      .then(() => cy.log(`✅ Clique ${i + 1} de ${quantidade}`));

    // delay opcional entre cliques
    if (i < quantidade - 1) {
      cy.wait(delay);
    }
  });
});
