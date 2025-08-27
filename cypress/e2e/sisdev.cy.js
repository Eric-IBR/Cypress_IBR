/// <references types =”Cypress”/>
import "../support/commands";
describe("Cenários de Cadastro de Sucata", () => {
  beforeEach(function () {
    cy.loginSisdev();
  });

  it("Cadastro de Sucada com 7 imagens", () => {
    const imagens = [
      "sample.png",
      "sample2.png",
      "sample3.png",
      "sample4.png",
      "sample5.png",
      "sample6.png",
      "sample7.png",
    ];

    cy.wait(700);
    cy.get("#mat-expansion-panel-header-0").click();
    cy.wait(400);
    cy.contains("div.button-toggle-title", "Cadastro de Sucatas").click();

    cy.get('input[type="file"][accept="image/*"]').selectFile(
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

    cy.get("button").contains(" Selecionar Ângulo ").eq(0).click();
    cy.get("#cdk-overlay-0").contains(" Parte Dianteira ").click();
    //=================================
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
    cy.get("#cdk-overlay-5").contains(" NF Entrada ").click();
    //===============================
    cy.get("button").contains(" Selecionar Ângulo ").eq(0).click();
    cy.get("#cdk-overlay-6").contains(" Chassi Veículo ").click();
    cy.wait(300);

    cy.contains("mat-label", "Grupo de Peças") // encontra o label
      .parents(".mat-form-field") // sobe até o container do campo
      .find("mat-icon") // busca os ícones dentro dele
      .contains("search") // filtra pelo texto do ícone
      .click(); // clica no ícone

    cy.get("#search").type("Carro rastreabilidade (SISDEV){enter}");
    cy.wait(600);
    cy.get(
      ":nth-child(1) > .cdk-column-actions > .mat-focus-indicator"
    ).click();

    cy.contains("mat-label", "Fornecedor") // encontra o label
      .parents(".mat-form-field") // sobe até o container do campo
      .find("mat-icon") // busca os ícones dentro dele
      .contains("search") // filtra pelo texto do ícone
      .click(); // clica no ícone

    cy.get("#search").type("IBR TECNOLOGIA{enter}");
    cy.get(
      ":nth-child(1) > .cdk-column-actions > .mat-focus-indicator"
    ).click();

    //cy.get("#providers").type("Teste");
    cy.get("#purchaseValue").type("800,00");

    cy.get("#mat-chip-list-input-0").type("FIAT");
    cy.get("span").contains("FIAT").click();
    //cy.get("#brand").type("CY");
    cy.get("#mat-chip-list-input-1").type("UNO"); //CAMPO MODELO
    cy.get("span").contains("UNO").click();

    cy.get("#mat-chip-list-input-2").click();
    cy.get("span").contains("2015").click();

    cy.get("#mat-chip-list-input-3").click();
    cy.get("span").contains("1.0 VIVACE CELEB. FLEX 3P").click();

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

    cy.visit("https://beta-desmonte.ibrsoftweb.com.br/erp/waste");
    cy.contains("FIAT UNO 2015").should("be.visible");
    cy.wait(300);
    cy.contains("mat-card-title", "FIAT UNO 2015")
      .parents("mat-card")
      .within(() => {
        cy.get("mat-icon").contains("more_vert").click();
      });
    cy.contains("mat-icon", "verified_user").click();

    cy.contains("Laudo Técnico das Peças").should("be.visible");
    cy.clicarCarregarMaisNVezes(2, 600);

    cy.get('select[formcontrolname="pieceQuality"]', { timeout: 10000 })
      .should("have.length", 49) // Confirma que encontrou os 49 selects
      .each(($select, index) => {
        cy.wrap($select).select("2: 35").should("have.value", "2: 35"); // Valida que foi selecionado

        cy.log(`Select ${index + 1}/49 configurado`);
      });

    cy.contains(" Enviar Laudo Técnico ").click();
    cy.wait(500);
    //cy.get("#email").type("matheus.arend@ibrsoft.com.br");
    //cy.get("#password").type("Arend@2024");
    //cy.contains("Confirmar").click({ force: true });
    //cy.wait(1500);
    cy.contains(
      "Laudo técnico enviado com sucesso sob a responsabilidade do engenherio 'Teste'."
    ).should("be.visible");
    //cy.get("mat-icon").contains("Sucata enviada com sucesso.");
    cy.get('mat-icon[mattooltip="Sucata enviada com sucesso."]').should(
      "be.visible"
    );

    cy.contains("mat-card-title", "FIAT UNO 2015")
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

  //============================== Erro ao cadastrar Apenas com 6 imagens ==============================

  it("Erro ao cadastrar Apenas com 6 imagens", () => {
    const imagens = [
      "sample.png",
      "sample2.png",
      "sample3.png",
      "sample4.png",
      "sample5.png",
      "sample6.png",
    ];

    cy.get("#mat-expansion-panel-header-0").click();
    cy.wait(400);
    cy.contains("div.button-toggle-title", "Cadastro de Sucatas").click();

    cy.get('input[type="file"][accept="image/*"]').selectFile(
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

    cy.get("button").contains(" Selecionar Ângulo ").eq(0).click();
    cy.get("#cdk-overlay-0").contains(" Parte Dianteira ").click();
    //=================================
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
    cy.get("#cdk-overlay-5").contains(" NF Entrada ").click();

    cy.contains("mat-label", "Grupo de Peças") // encontra o label
      .parents(".mat-form-field") // sobe até o container do campo
      .find("mat-icon") // busca os ícones dentro dele
      .contains("search") // filtra pelo texto do ícone
      .click(); // clica no ícone

    cy.get("#search").type("Carro rastreabilidade (SISDEV){enter}");
    cy.wait(600);
    cy.get(
      ":nth-child(1) > .cdk-column-actions > .mat-focus-indicator"
    ).click();

    cy.contains("mat-label", "Fornecedor") // encontra o label
      .parents(".mat-form-field") // sobe até o container do campo
      .find("mat-icon") // busca os ícones dentro dele
      .contains("search") // filtra pelo texto do ícone
      .click(); // clica no ícone

    cy.get("#search").type("IBR TECNOLOGIA{enter}");
    cy.get(
      ":nth-child(1) > .cdk-column-actions > .mat-focus-indicator"
    ).click();

    //cy.get("#providers").type("Teste");
    cy.get("#purchaseValue").type("800,00");

    cy.get("#mat-chip-list-input-0").type("FIAT");
    cy.get("span").contains("FIAT").click();
    //cy.get("#brand").type("CY");
    cy.get("#mat-chip-list-input-1").type("UNO"); //CAMPO MODELO
    cy.get("span").contains("UNO").click();

    cy.get("#mat-chip-list-input-2").click();
    cy.get("span").contains("2015").click();

    cy.get("#mat-chip-list-input-3").click();
    cy.get("span").contains("1.0 VIVACE CELEB. FLEX 3P").click();

    cy.placaSucataAleatoria("#licensePlate");
    cy.get("#mat-input-8").type("A");
    cy.contains("mat-option", "Amarelo").click();
    cy.get("#chassis").type("12345678910123456");
    cy.get("#lot").type("4225");
    cy.get("#vehicleCertificate").type("TESTE");
    cy.preencherDadosDetranAleatorio();
    cy.get("#entryDate").type("12/12/2015");
    cy.get("#renavamDate").type("12/12/2025");
    cy.contains("button", " Salvar ").should("be.visible").click();
    cy.contains("Selecione as 7 imagens do veículo.").should("be.visible");
  });

  //====================== Erro ao tentar cadastrar sucata sem informar angulo =====================

  it("Erro ao tentar cadastrar sucata sem informar angulo", () => {
    const imagens = [
      "sample.png",
      "sample2.png",
      "sample3.png",
      "sample4.png",
      "sample5.png",
      "sample6.png",
      "sample7.png",
    ];

    cy.get("#mat-expansion-panel-header-0").click();
    cy.wait(400);
    cy.contains("div.button-toggle-title", "Cadastro de Sucatas").click();

    cy.get('input[type="file"][accept="image/*"]').selectFile(
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
    cy.wait(300);

    cy.contains("mat-label", "Grupo de Peças") // encontra o label
      .parents(".mat-form-field") // sobe até o container do campo
      .find("mat-icon") // busca os ícones dentro dele
      .contains("search") // filtra pelo texto do ícone
      .click(); // clica no ícone

    cy.get("#search").type("Carro rastreabilidade (SISDEV){enter}");
    cy.wait(600);
    cy.get(
      ":nth-child(1) > .cdk-column-actions > .mat-focus-indicator"
    ).click();

    cy.contains("mat-label", "Fornecedor") // encontra o label
      .parents(".mat-form-field") // sobe até o container do campo
      .find("mat-icon") // busca os ícones dentro dele
      .contains("search") // filtra pelo texto do ícone
      .click(); // clica no ícone

    cy.get("#search").type("IBR TECNOLOGIA{enter}");
    cy.get(
      ":nth-child(1) > .cdk-column-actions > .mat-focus-indicator"
    ).click();

    //cy.get("#providers").type("Teste");
    cy.get("#purchaseValue").type("800,00");

    cy.get("#mat-chip-list-input-0").type("FIAT");
    cy.get("span").contains("FIAT").click();
    //cy.get("#brand").type("CY");
    cy.get("#mat-chip-list-input-1").type("UNO"); //CAMPO MODELO
    cy.get("span").contains("UNO").click();

    cy.get("#mat-chip-list-input-2").click();
    cy.get("span").contains("2015").click();

    cy.get("#mat-chip-list-input-3").click();
    cy.get("span").contains("1.0 VIVACE CELEB. FLEX 3P").click();

    cy.placaSucataAleatoria("#licensePlate");
    cy.get("#mat-input-8").type("A");
    cy.contains("mat-option", "Amarelo").click();
    cy.get("#chassis").type("12345678910123456");
    cy.get("#lot").type("4225");
    cy.get("#vehicleCertificate").type("TESTE");
    cy.preencherDadosDetranAleatorio();
    cy.get("#entryDate").type("12/12/2015");
    cy.get("#renavamDate").type("12/12/2025");
    cy.contains("button", " Salvar ").should("be.visible").click();
    cy.contains(
      "Algumas imagens não estão com seus ângulos definidos. Defina um ângulo para todas as imagens informadas."
    ).should("be.visible");
  });

  //===================== VALIDAR QUE BOTÃO DO LAUDO FICA INATIVO AO CADASTRAR SUCATA INCOMPLETA ==============================

  it("Validar que botão do laudo fica inativo ao cadastrar sucata incompleta", () => {
    const imagens = [
      "sample.png",
      "sample2.png",
      "sample3.png",
      "sample4.png",
      "sample5.png",
      "sample6.png",
      "sample7.png",
    ];

    cy.get("#mat-expansion-panel-header-0").click();
    cy.wait(400);
    cy.contains("div.button-toggle-title", "Cadastro de Sucatas").click();

    cy.get('input[type="file"][accept="image/*"]').selectFile(
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

    cy.get("button").contains(" Selecionar Ângulo ").eq(0).click();
    cy.get("#cdk-overlay-0").contains(" Parte Dianteira ").click();
    //=================================
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
    cy.get("#cdk-overlay-5").contains(" NF Entrada ").click();
    //===============================
    cy.get("button").contains(" Selecionar Ângulo ").eq(0).click();
    cy.get("#cdk-overlay-6").contains(" Chassi Veículo ").click();
    cy.wait(300);

    cy.contains("mat-label", "Grupo de Peças") // encontra o label
      .parents(".mat-form-field") // sobe até o container do campo
      .find("mat-icon") // busca os ícones dentro dele
      .contains("search") // filtra pelo texto do ícone
      .click(); // clica no ícone

    cy.get("#search").type("Carro rastreabilidade (SISDEV){enter}");
    cy.wait(600);
    cy.get(
      ":nth-child(1) > .cdk-column-actions > .mat-focus-indicator"
    ).click();

    cy.contains("mat-label", "Fornecedor") // encontra o label
      .parents(".mat-form-field") // sobe até o container do campo
      .find("mat-icon") // busca os ícones dentro dele
      .contains("search") // filtra pelo texto do ícone
      .click(); // clica no ícone

    cy.get("#search").type("IBR TECNOLOGIA{enter}");
    cy.get(
      ":nth-child(1) > .cdk-column-actions > .mat-focus-indicator"
    ).click();

    //cy.get("#providers").type("Teste");
    cy.get("#purchaseValue").type("800,00");

    cy.get("#mat-chip-list-input-0").type("FIAT");
    cy.get("span").contains("FIAT").click();
    //cy.get("#brand").type("CY");
    cy.get("#mat-chip-list-input-1").type("UNO"); //CAMPO MODELO
    cy.get("span").contains("UNO").click();

    cy.get("#mat-chip-list-input-2").click();
    cy.get("span").contains("2015").click();

    cy.get("#mat-chip-list-input-3").click();
    cy.get("span").contains("1.0 VIVACE CELEB. FLEX 3P").click();

    cy.placaSucataAleatoria("#licensePlate");
    cy.get("#mat-input-8").type("A");
    cy.contains("mat-option", "Amarelo").click();
    cy.get("#chassis").type("12345678910123456");
    cy.get("#lot").type("4225");
    cy.get("#vehicleCertificate").type("TESTE");
    //cy.preencherDadosDetranAleatorio();
    cy.get("#entryDate").type("12/12/2015");
    cy.get("#renavamDate").type("12/12/2025");
    cy.contains("button", " Salvar ").should("be.visible").click();
    cy.wait(700);
    cy.get("button").contains("Cancelar").click({ force: true });
    cy.wait(400);
    cy.get("button").contains("Cancelar").click({ force: true });

    cy.visit("https://beta-desmonte.ibrsoftweb.com.br/erp/waste");
    cy.contains("FIAT UNO 2015").should("be.visible");
    cy.wait(300);
    cy.contains("mat-card-title", "FIAT UNO 2015")
      .parents("mat-card")
      .within(() => {
        cy.get("mat-icon").contains("more_vert").click();
      });
    cy.contains("mat-icon", "verified_user")
      .parents("button")
      .should("be.disabled");

    cy.contains("mat-icon", "delete").click();
    cy.contains("Deseja deletar esta sucata?").should("be.visible");
    cy.get("button").contains("Confirmar").click({ force: true });
    cy.contains("Deseja deletar os produtos que serão desvinculados?").should(
      "be.visible"
    );
    cy.get("button").contains("Sim").click({ force: true });
    cy.contains("Sucata deletada!").should("be.visible");
  });

  //======================================== VALIDAÇÃO DO ICONE DE ALERTA, AJUSTAR DADOS FALTANTES E VALIDAR QUE ICONE FICOU POSITIVO ===============

  it("Validar modal de ajuste", () => {
    const imagens = [
      "sample.png",
      "sample2.png",
      "sample3.png",
      "sample4.png",
      "sample5.png",
      "sample6.png",
      "sample7.png",
    ];
    const expectedTexts = [
      "Número da NFe.",
      "Série da NFe.",
      "Número da cartela.",
      "Renavam.",
      "Laudo Técnico não enviado.",
    ];
    //-------------------------------------------------------------------------------
    cy.get("#mat-expansion-panel-header-0").click();
    cy.wait(400);
    cy.contains("div.button-toggle-title", "Cadastro de Sucatas").click();

    cy.get('input[type="file"][accept="image/*"]').selectFile(
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

    cy.get("button").contains(" Selecionar Ângulo ").eq(0).click();
    cy.get("#cdk-overlay-0").contains(" Parte Dianteira ").click();
    //=================================
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
    cy.get("#cdk-overlay-5").contains(" NF Entrada ").click();
    //===============================
    cy.get("button").contains(" Selecionar Ângulo ").eq(0).click();
    cy.get("#cdk-overlay-6").contains(" Chassi Veículo ").click();
    cy.wait(300);

    cy.contains("mat-label", "Grupo de Peças") // encontra o label
      .parents(".mat-form-field") // sobe até o container do campo
      .find("mat-icon") // busca os ícones dentro dele
      .contains("search") // filtra pelo texto do ícone
      .click(); // clica no ícone

    cy.get("#search").type("Carro rastreabilidade (SISDEV){enter}");
    cy.wait(600);
    cy.get(
      ":nth-child(1) > .cdk-column-actions > .mat-focus-indicator"
    ).click();

    cy.contains("mat-label", "Fornecedor") // encontra o label
      .parents(".mat-form-field") // sobe até o container do campo
      .find("mat-icon") // busca os ícones dentro dele
      .contains("search") // filtra pelo texto do ícone
      .click(); // clica no ícone

    cy.get("#search").type("IBR TECNOLOGIA{enter}");
    cy.get(
      ":nth-child(1) > .cdk-column-actions > .mat-focus-indicator"
    ).click();

    //cy.get("#providers").type("Teste");
    cy.get("#purchaseValue").type("800,00");

    cy.get("#mat-chip-list-input-0").type("FIAT");
    cy.get("span").contains("FIAT").click();
    //cy.get("#brand").type("CY");
    cy.get("#mat-chip-list-input-1").type("UNO"); //CAMPO MODELO
    cy.get("span").contains("UNO").click();

    cy.get("#mat-chip-list-input-2").click();
    cy.get("span").contains("2015").click();

    cy.get("#mat-chip-list-input-3").click();
    cy.get("span").contains("1.0 VIVACE CELEB. FLEX 3P").click();

    cy.placaSucataAleatoria("#licensePlate");
    cy.get("#mat-input-8").type("A");
    cy.contains("mat-option", "Amarelo").click();
    cy.get("#chassis").type("12345678910123456");
    cy.get("#lot").type("4225");
    cy.get("#vehicleCertificate").type("TESTE");
    //cy.preencherDadosDetranAleatorio();
    cy.get("#entryDate").type("12/12/2015");
    cy.get("#renavamDate").type("12/12/2025");
    cy.contains("button", " Salvar ").should("be.visible").click();
    cy.wait(700);
    cy.get("button").contains("Cancelar").click({ force: true });
    cy.wait(400);
    cy.get("button").contains("Cancelar").click({ force: true });

    cy.visit("https://beta-desmonte.ibrsoftweb.com.br/erp/waste");
    cy.contains("FIAT UNO 2015").should("be.visible");
    cy.wait(300);
    cy.contains("mat-card-title", "FIAT UNO 2015")
      .parents("mat-card")
      .within(() => {
        cy.get("mat-icon").contains("more_vert").click();
      });
    cy.contains("mat-icon", "verified_user")
      .parents("button")
      .should("be.disabled");
    cy.visit("https://beta-desmonte.ibrsoftweb.com.br/erp/waste");
    cy.get('mat-icon[mattooltip="Dados não preenchidos completamente."]')
      .eq(0)
      .click();
    cy.contains(
      "Para permitir o envio do laudo técnico, preencha os seguintes campos:"
    ).should("be.visible");

    cy.get('mat-list[class="mat-list mat-list-base"]').then(($list) => {
      expectedTexts.forEach((text) => {
        expect($list).to.contain.text(text);
      });
    });

    cy.contains(" Cancelar ").click();
    cy.contains("mat-card-title", "FIAT UNO 2015")
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

  //=================================== ENVIO DE FORMULÁRIO POR DESMEMBRAMENTO ===========================

  it("Envio de laudo com sucata desmembrada", () => {
    const imagens = [
      "sample.png",
      "sample2.png",
      "sample3.png",
      "sample4.png",
      "sample5.png",
      "sample6.png",
      "sample7.png",
    ];
    const expectedTexts = [
      "Número da NFe.",
      "Série da NFe.",
      "Número da cartela.",
      "Renavam.",
      "Laudo Técnico não enviado.",
    ];
    //-------------------------------------------------------------------------------
    cy.get("#mat-expansion-panel-header-0").click();
    cy.wait(400);
    cy.contains("div.button-toggle-title", "Cadastro de Sucatas").click();

    cy.get('input[type="file"][accept="image/*"]').selectFile(
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

    cy.get("button").contains(" Selecionar Ângulo ").eq(0).click();
    cy.get("#cdk-overlay-0").contains(" Parte Dianteira ").click();
    //=================================
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
    cy.get("#cdk-overlay-5").contains(" NF Entrada ").click();
    //===============================
    cy.get("button").contains(" Selecionar Ângulo ").eq(0).click();
    cy.get("#cdk-overlay-6").contains(" Chassi Veículo ").click();
    cy.wait(300);

    cy.contains("mat-label", "Grupo de Peças") // encontra o label
      .parents(".mat-form-field") // sobe até o container do campo
      .find("mat-icon") // busca os ícones dentro dele
      .contains("search") // filtra pelo texto do ícone
      .click(); // clica no ícone

    cy.get("#search").type("Carro rastreabilidade (SISDEV){enter}");
    cy.wait(600);
    cy.get(
      ":nth-child(1) > .cdk-column-actions > .mat-focus-indicator"
    ).click();

    cy.contains("mat-label", "Fornecedor") // encontra o label
      .parents(".mat-form-field") // sobe até o container do campo
      .find("mat-icon") // busca os ícones dentro dele
      .contains("search") // filtra pelo texto do ícone
      .click(); // clica no ícone

    cy.get("#search").type("IBR TECNOLOGIA{enter}");
    cy.get(
      ":nth-child(1) > .cdk-column-actions > .mat-focus-indicator"
    ).click();

    //cy.get("#providers").type("Teste");
    cy.get("#purchaseValue").type("800,00");

    cy.get("#mat-chip-list-input-0").type("FIAT");
    cy.get("span").contains("FIAT").click();
    //cy.get("#brand").type("CY");
    cy.get("#mat-chip-list-input-1").type("UNO"); //CAMPO MODELO
    cy.get("span").contains("UNO").click();

    cy.get("#mat-chip-list-input-2").click();
    cy.get("span").contains("2015").click();

    cy.get("#mat-chip-list-input-3").click();
    cy.get("span").contains("1.0 VIVACE CELEB. FLEX 3P").click();

    cy.placaSucataAleatoria("#licensePlate");
    cy.get("#mat-input-8").type("A");
    cy.contains("mat-option", "Amarelo").click();
    cy.get("#chassis").type("12345678910123456");
    cy.get("#lot").type("4225");
    cy.get("#vehicleCertificate").type("TESTE");
    //cy.preencherDadosDetranAleatorio();
    cy.get("#entryDate").type("12/12/2015");
    cy.get("#renavamDate").type("12/12/2025");
    cy.contains("button", " Salvar ").should("be.visible").click();
    cy.wait(700);
    cy.get("button").contains("Cancelar").click({ force: true });
    cy.wait(400);
    cy.get("button").contains("Cancelar").click({ force: true });
    cy.wait(1500);
    cy.visit("https://beta-desmonte.ibrsoftweb.com.br/erp/waste");
    cy.contains("FIAT UNO 2015").should("be.visible");
    cy.wait(300);
    cy.contains("mat-card-title", "FIAT UNO 2015")
      .parents("mat-card")
      .within(() => {
        cy.get("mat-icon").contains("more_vert").click();
      });
    cy.contains("mat-icon", "verified_user")
      .parents("button")
      .should("be.disabled");
    cy.visit("https://beta-desmonte.ibrsoftweb.com.br/erp/waste");
    cy.get('mat-icon[mattooltip="Dados não preenchidos completamente."]')
      .eq(0)
      .click();
    cy.contains(
      "Para permitir o envio do laudo técnico, preencha os seguintes campos:"
    ).should("be.visible");

    cy.get('mat-list[class="mat-list mat-list-base"]').then(($list) => {
      expectedTexts.forEach((text) => {
        expect($list).to.contain.text(text);
      });
    });

    cy.contains(" AJUSTAR AGORA ").click();
    cy.wait(700);
    cy.ajustarDadosDetranAleatorio();
    cy.contains("Salvar").click();

    cy.contains("mat-card-title", "FIAT UNO 2015")
      .parents("mat-card")
      .within(() => {
        cy.get("mat-icon").contains("plumbing").click();
      });

    cy.contains("Peças da Sucata").should("be.visible");
    cy.wait(1300);
    cy.get("mat-icon").contains(" chevron_right ").click();
    cy.contains("label.mat-checkbox-layout", "Alternador")
      .click()
      .find('input[type="checkbox"]')
      .should("be.checked");

    cy.contains("label.mat-checkbox-layout", "Bloco do Motor")
      .click()
      .find('input[type="checkbox"]')
      .should("be.checked");

    cy.get("button").contains("Adicionar Peças").click();
    cy.get(".mt-6").contains("(Progresso: 1/2)").should("be.visible");
    cy.get('mat-select[formcontrolname="pieceQuality"]').click();
    cy.get("mat-option").contains("Passível Reutilização").click();

    cy.get("button").contains("Salvar e Avançar").click();
    cy.get(".mt-6").contains("(Progresso: 2/2)").should("be.visible");
    cy.get('mat-select[formcontrolname="pieceQuality"]').click();
    cy.get("mat-option").contains("Passível Reutilização").click();
    cy.get("button").contains("Salvar e Finalizar").click();

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

    cy.contains("FIAT UNO 2015").should("be.visible");
    cy.wait(300);
    cy.contains("mat-card-title", "FIAT UNO 2015")
      .parents("mat-card")
      .within(() => {
        cy.get("mat-icon").contains("more_vert").click();
      });
    cy.contains("mat-icon", "verified_user").click();

    cy.contains("Laudo Técnico das Peças").should("be.visible");

    cy.get('select[formcontrolname="pieceQuality"]', { timeout: 10000 })
      .should("have.length", 2) // Confirma que encontrou os 2 selects
      .each(($select, index) => {
        cy.wrap($select).select("2: 35").should("have.value", "2: 35"); // Valida que foi selecionado

        cy.log(`Select ${index + 1}/2 configurado`);
      });

    cy.contains(" Enviar Laudo Técnico ").click();
    cy.wait(500);
    //cy.get("#email").type("matheus.arend@ibrsoft.com.br");
    //cy.get("#password").type("Arend@2024");
    //cy.contains("Confirmar").click({ force: true });
    //cy.wait(1500);
    cy.contains(
      "Laudo técnico enviado com sucesso sob a responsabilidade do engenherio 'Teste'."
    ).should("be.visible");
    //cy.get("mat-icon").contains("Sucata enviada com sucesso.");
    cy.get('mat-icon[mattooltip="Sucata enviada com sucesso."]').should(
      "be.visible"
    );

    cy.contains("mat-card-title", "FIAT UNO 2015")
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
