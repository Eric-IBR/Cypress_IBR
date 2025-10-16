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


// APIS
/*
Cypress.Commands.add("apiLogin", () => {
  cy.request("POST", "https://beta-desmonte.ibrsoftweb.com.br/account/signin?redirectFrom=%2Faccount%2Fsignin", {
    email: Cypress.env("eric.araujo@ibrsoft.com.br"),
    password: Cypress.env("Teste@2025")
  }).then((resp) => {
    expect(resp.status).to.eq(200);
    const token = resp.body.token;
    Cypress.env("token", token);
    return token;
  });
});

Cypress.Commands.add("criarPecaApi", () => {
  const token = Cypress.env("token");
  const payload = {
    purchaseWasteId: null,
    autoProductCode: true,
    code: null,
    codeJump: null,
    description: "Bolsa Airbag Volante Audi a 4 1995 1 8 4p", // 🔥 DESCRIÇÃO FIXA
    categoryId: "MLB47007",
    categoryName: "Air Bags",
    brand: "Audi",
    model: "A4",
    year: 1995,
    trim: "1.8 4p",
    quantity: 1,
    cstId: 14,
    cfopId: 254,
    ncm: "87089521",
    cest: "0000000",
    currentCost: 0.01,
    saleValue: 0,
    additionalSaleValue: -100,
    pieceWasteQuality: "A",
    height: 20,
    width: 20,
    length: 20,
    weight: 20,
    brandId: 16,
    modelId: 586,
    trimId: 23885,
    standardPartId: 2575,
    yearId: 7192,
    compatibilities: [
      {
        brandId: 16,
        brandMeliId: "40661",
        brandDescription: "Audi",
        modelId: 586,
        modelMeliId: "66459",
        modelDescription: "A4",
        trimId: 23885,
        trimMeliId: "457824",
        trimDescription: "1.8 4p",
        vehicleYearId: 7192,
        vehicleYearMeliId: "459652",
        vehicleYearDescription: "1995",
        automatic: true
      }
    ]
  };

  return cy.request({
    method: "POST",
    url: "https://beta-api-desmonte.ibrsoftweb.com.br/api/v1/PurchaseWaste/PurchaseWasteUnitary",
    headers: { Authorization: `Bearer ${token}` },
    body: payload,
  }).then((response) => {
    expect(response.status).to.eq(200);
    cy.log(`Peça criada com ID: ${response.body.id}`);
    return response.body;
  });
});


Cypress.Commands.add("deletarPecaApi", (id) => {
  const token = Cypress.env("token");
  return cy.request({
    method: "DELETE",
    url: `https://beta-api-desmonte.ibrsoftweb.com.br/api/v1/Products/${id}`,
    headers: { Authorization: `Bearer ${token}` },
  }).then((response) => {
    expect(response.status).to.eq(204);
    cy.log(`Peça ${id} deletada com sucesso!`);
  });
});

*/

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

Cypress.Commands.add('selecionaModeloCarro', function () {
  cy.get("#mat-chip-list-input-0").type("FIAT");
  cy.get("span").contains("Fiat").click();
  cy.get("#mat-chip-list-input-1").type("UNO");
  cy.get('div.mat-autocomplete-panel:visible', { timeout: 10000 })
    .should('be.visible')
    .find('.mat-option-text')
    .should('exist')
    .filter((_, el) => el.innerText.trim() === 'Uno')
    .first()
    .click({ force: true });

  cy.get("#mat-chip-list-input-2").click();
  cy.get("span").contains("2015").click();

  cy.get("#mat-chip-list-input-3").click();
  cy.get("span").contains(" 1.0 Vivace Flex 5p ").click();
})

Cypress.Commands.add("clica3pontinhos", function () {
  cy.contains("mat-card-title", "BMW i3 2015")
    .parents("mat-card")
    .within(() => {
      cy.get("mat-icon").contains("more_vert").click();
    });
});

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

//============================= SISDEV ================================

Cypress.Commands.add("cadSucataSisdev", function () {
  cy.get("#mat-expansion-panel-header-0").click();
  cy.wait(400);
  cy.contains("div.button-toggle-title", "Cadastro de Sucatas").click();

  cy.preencherImagensSucata();
  cy.selecionarAnguloDaImagem();

  cy.contains("mat-label", "Grupo de Peças")
    .parents(".mat-form-field")
    .find("mat-icon")
    .contains("search")
    .click();

  cy.get("#search").type("Carro rastreabilidade (SISDEV){enter}");
  cy.wait(600);
  cy.contains("td", "Carro rastreabilidade (SISDEV)")
    .parents("tr")
    .dblclick();

  cy.contains("mat-label", "Fornecedor")
    .parents(".mat-form-field")
    .find("mat-icon")
    .contains("search")
    .click();

  cy.get("#search").type("IBR TECNOLOGIA{enter}");
  cy.contains("td", "IBR TECNOLOGIA")
    .parents("tr")
    .dblclick();

  cy.get("#purchaseValue").type("800,00");

  cy.get("#mat-chip-list-input-0").type("FIAT");
  cy.get("span").contains("Fiat").click();
  cy.get("#mat-chip-list-input-1").type("UNO");
  cy.get('div.mat-autocomplete-panel:visible', { timeout: 10000 })
    .should('be.visible')
    .find('.mat-option-text')
    .should('exist')
    .filter((_, el) => el.innerText.trim() === 'Uno')
    .first()
    .click({ force: true });

  cy.get("#mat-chip-list-input-2").click();
  cy.get("span").contains("2015").click();

  cy.get("#mat-chip-list-input-3").click();
  cy.get("span").contains(" 1.0 Vivace Flex 5p ").click();

  cy.placaSucataAleatoria("#licensePlate");
  cy.get("#mat-input-8").type("A");
  cy.contains("mat-option", "Amarelo").click();
  cy.get("#chassis").type("12345678910123456");
  cy.get("#lot").type("4225");
  cy.get("#vehicleCertificate").type("TESTE");
  cy.preencherDadosDetranAleatorio();
  cy.get("#entryDate").type("12/12/2015");
  cy.get("#renavamDate").type("12/12/2025");
  cy.wait(300);
  cy.contains("button", " Salvar ").should("be.visible").click();
  cy.wait(700);
  cy.get("button").contains("Cancelar").click({ force: true });
  cy.wait(400);
  cy.get("button").contains("Cancelar").click({ force: true });
  cy.wait(1500);
})

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


Cypress.Commands.add('preencherImagensSucata', () => {
  const imagens = [
    "arquivopdf.pdf",
    "sample2.png",
    "sample3.png",
    "sample4.png",
    "sample5.png",
    "sample.png",
    "sample7.png",
  ];

  cy.get('input[type="file"][accept="image/*,application/pdf"]').selectFile(
    imagens.map((img) => `cypress/fixtures/${img}`),
    { force: true }
  );
  cy.wait(700);

  // Valida que a imagem foi carregada
  cy.get(".waste-images-content img", { timeout: 10000 })
    .should("have.attr", "src")
    .and((src) => {
      expect(src).not.to.contain("product-without-image.png");
    });
});

Cypress.Commands.add('selecionarAnguloDaImagem', () => {
  cy.get("button").contains(" Selecionar Ângulo ").eq(0).click();
  cy.get("#cdk-overlay-1").contains(" Parte Traseira ").click();
  //================================
  cy.get("button").contains(" Selecionar Ângulo ").eq(0).click();
  cy.get("#cdk-overlay-2").contains(" Lado Esquerdo ").click();
  //================================
  cy.get("button").contains(" Selecionar Ângulo ").eq(0).click();
  cy.get("#cdk-overlay-3").contains(" Lado Direito ").click();
  //===============================
  cy.get("button").contains(" Selecionar Ângulo ").eq(0).click();
  cy.get("#cdk-overlay-4").contains(" Motor ").click();
  //===============================
  cy.get("button").contains(" Selecionar Ângulo ").eq(0).click();
  cy.get("#cdk-overlay-5").contains(" Parte Dianteira ").click();
  //===============================
  cy.get("button").contains(" Selecionar Ângulo ").eq(0).click();
  cy.get("#cdk-overlay-6").contains(" Chassi Veículo ").click();
  cy.wait(300);
});

//================ VALIDAÇÃO DE XML DA INFO FISCAL DA SUCATA ================


Cypress.Commands.add('validarCamposNFe', (expectedData) => {
  const camposValidacao = [
    // Inputs de texto
    { type: 'input', formControlName: 'providerCnpj', value: expectedData.providerCnpj },
    { type: 'input', formControlName: 'accessKey', value: expectedData.accessKey },
    { type: 'input', formControlName: 'nfeNumber', value: expectedData.nfeNumber },
    { type: 'input', formControlName: 'protocolNumber', value: expectedData.protocolNumber },
    { type: 'input', formControlName: 'natureOfTheOperation', value: expectedData.natureOfOperation },
    { type: 'input', formControlName: 'serie', value: expectedData.serie },
    { type: 'input', formControlName: 'model', value: expectedData.model },

    // Inputs monetários
    { type: 'input', formControlName: 'bcIcms', value: expectedData.bcIcms },
    { type: 'input', formControlName: 'vIcms', value: expectedData.vIcms },
    { type: 'input', formControlName: 'bcIcmsSt', value: expectedData.bcIcmsSt },
    { type: 'input', formControlName: 'vIcmsSt', value: expectedData.vIcmsSt },
    { type: 'input', formControlName: 'vIcmsDeson', value: expectedData.vIcmsDeson },
    { type: 'input', formControlName: 'vProduct', value: expectedData.vProduct },
    { type: 'input', formControlName: 'vFreight', value: expectedData.vFreight },
    { type: 'input', formControlName: 'vSafe', value: expectedData.vSafe },
    { type: 'input', formControlName: 'vDiscount', value: expectedData.vDiscount },
    { type: 'input', formControlName: 'vii', value: expectedData.vii },
    { type: 'input', formControlName: 'vIpi', value: expectedData.vIpi },
    { type: 'input', formControlName: 'vPis', value: expectedData.vPis },
    { type: 'input', formControlName: 'vTributes', value: expectedData.vTributes },
    { type: 'input', formControlName: 'vTotalNote', value: expectedData.vTotalNote },
    { type: 'input', formControlName: 'vAntiPovertyFund', value: expectedData.vAntiPovertyFund },
    { type: 'input', formControlName: 'vIcmsUfDest', value: expectedData.vIcmsUfDest },
    { type: 'input', formControlName: 'vIcmsUfRemet', value: expectedData.vIcmsUfRemet },
  ];

  camposValidacao.forEach(campo => {
    cy.get(`input[formcontrolname="${campo.formControlName}"]`)
      .should('have.value', campo.value);
  });
});