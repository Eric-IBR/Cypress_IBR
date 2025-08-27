/// <references types =”Cypress”/>
import "../support/commands";
describe("Cenários de Cadastro de Sucata", () => {
  beforeEach(function () {
    cy.login();
  });

  it("Cadastro de Sucada", () => {
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

    cy.contains("Fotos restantes: 9").should("be.visible");

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

    cy.visit("https://beta-desmonte.ibrsoftweb.com.br/erp/waste");
    cy.wait(1200);
    cy.contains("mat-card-title", "BMW i3 2015")
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

  //===================== CENÁRIO 02 =============================

  it("Mensagem de alerta ao tentar cadastrar sem informar Valor", () => {
    cy.get("#mat-expansion-panel-header-0").click();
    cy.contains("div.button-toggle-title", "Cadastro de Sucatas").click();

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

    cy.get("#mat-chip-list-input-0").click();
    cy.get("span").contains("BMW").click();
    //cy.get("#brand").type("CY");
    cy.get("#mat-chip-list-input-1").type("I3"); //CAMPO MODELO
    cy.get("span").contains("i3").click();

    cy.get("#mat-chip-list-input-2").click();
    cy.get("span").contains("2015").click();

    cy.get("#mat-chip-list-input-3").type("0.6 Rex Full 5p Eléctrico");
    cy.get("span").contains("0.6 Rex Full 5p Eléctrico").click();

    cy.get("#licensePlate").type("ABC-1234");
    cy.get("#mat-input-8").type("A");
    cy.contains("mat-option", "Amarelo").click();
    cy.get("#chassis").type("12345678910123456");
    cy.get("#lot").type("4225");
    cy.get("#vehicleCertificate").type("TESTE");
    cy.get("#locations").type("{enter}", { force: true });
    cy.contains("div.mr-3.ml-3", "Teste IAGO").should("be.visible").click();
    cy.contains("div.mr-3.ml-3", " TESTE-3 ").should("be.visible").click();
    cy.contains("button", " Salvar ").should("be.visible").click();
    cy.contains("Preencha todos os formulários corretamente!").should(
      "be.visible"
    );
  });

  //===================== CENÁRIO 03 =============================

  it("Mensagem de alerta ao ultrapassar limite de caracteres da Marca", () => {
    cy.get("#mat-expansion-panel-header-0").click();
    cy.contains("div.button-toggle-title", "Cadastro de Sucatas").click();

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

    cy.get("#mat-chip-list-input-0").type("a".repeat(70));
    //cy.get("#brand").type("CY");

    cy.get("#licensePlate").type("ABC-1234");
    cy.get("#mat-input-8").type("A");
    cy.contains("mat-option", "Amarelo").click();
    cy.get("#chassis").type("12345678910123456");
    cy.get("#lot").type("4225");
    cy.get("#vehicleCertificate").type("TESTE");
    cy.get("#locations").type("{enter}", { force: true });
    cy.contains("div.mr-3.ml-3", "Teste IAGO").should("be.visible").click();
    cy.contains("div.mr-3.ml-3", " TESTE-3 ").should("be.visible").click();

    cy.contains("button", " Salvar ").should("be.visible").click();
    cy.contains("Preencha todos os formulários corretamente!").should(
      "be.visible"
    );
  });

  //===================== CENÁRIO 04 =============================

  it("Mensagem de alerta ao inseir menos que o minino de caracteres da Chassi", () => {
    cy.get("#mat-expansion-panel-header-0").click();
    cy.contains("div.button-toggle-title", "Cadastro de Sucatas").click();

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

    cy.get("#licensePlate").type("ABC-1234");
    cy.get("#mat-input-8").type("A");
    cy.contains("mat-option", "Amarelo").click();
    cy.get("#chassis").type("a".repeat(2));
    cy.get("#lot").type("4225");
    cy.get("#vehicleCertificate").type("TESTE");
    cy.get("#locations").type("{enter}", { force: true });
    cy.contains("div.mr-3.ml-3", "Teste IAGO").should("be.visible").click();
    cy.contains("div.mr-3.ml-3", " TESTE-3 ").should("be.visible").click();

    cy.contains("button", " Salvar ").should("be.visible").click();
    cy.contains("Preencha todos os formulários corretamente!").should(
      "be.visible"
    );
  });

  //===================== CENÁRIO 05 =============================

  it("Mensagem de alerta ao informar ano inválido", () => {
    cy.get("#mat-expansion-panel-header-0").click();
    cy.contains("div.button-toggle-title", "Cadastro de Sucatas").click();

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

    cy.get("#purchaseValue").type("800,00");

    cy.get("#mat-chip-list-input-2").type("3000");
    cy.contains("button", " Salvar ").should("be.visible").click();
    cy.contains("Preencha todos os formulários corretamente!").should(
      "be.visible"
    );
  });

  //===================== CENÁRIO 06 =============================

  it("Mensagem de alerta ao ultrapassar limite de caracteres da Certidão", () => {
    cy.get("#mat-expansion-panel-header-0").click();
    cy.contains("div.button-toggle-title", "Cadastro de Sucatas").click();

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

    cy.get("#licensePlate").type("ABC-1234");
    cy.get("#mat-input-8").type("A");
    cy.contains("mat-option", "Amarelo").click();
    cy.get("#chassis").type("12345678910123456");
    cy.get("#lot").type("4225");
    cy.get("#vehicleCertificate").type("a".repeat(70));
    cy.get("#locations").type("{enter}", { force: true });
    cy.contains("div.mr-3.ml-3", "Teste IAGO").should("be.visible").click();
    cy.contains("div.mr-3.ml-3", " TESTE-3 ").should("be.visible").click();
    cy.contains("button", " Salvar ").should("be.visible").click();
    cy.contains("Preencha todos os formulários corretamente!").should(
      "be.visible"
    );
  });

  //===================== CENÁRIO 07 =============================

  it("Mensagem de alerta ao tentar cadastrar sem informar NCM", () => {
    cy.get("#mat-expansion-panel-header-0").click();
    cy.contains("div.button-toggle-title", "Cadastro de Sucatas").click();

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

    cy.get("#licensePlate").type("ABC-1234");
    cy.get("#mat-input-8").type("A");
    cy.contains("mat-option", "Amarelo").click();
    cy.get("#chassis").type("12345678910123456");
    cy.get("#lot").type("4225");
    cy.get("#vehicleCertificate").type("TESTE");
    cy.get("#locations").type("{enter}", { force: true });
    cy.contains("div.mr-3.ml-3", "Teste IAGO").should("be.visible").click();
    cy.contains("div.mr-3.ml-3", " TESTE-3 ").should("be.visible").click();
    cy.get("#ncm").clear();
    cy.contains("button", " Salvar ").click();
    cy.contains("Preencha todos os formulários corretamente!").should(
      "be.visible"
    );
  });

  //===================== CENÁRIO 08 =============================

  it("Mensagem de alerta ao ultrapassar limite de caracteres da versão", () => {
    cy.get("#mat-expansion-panel-header-0").click();
    cy.contains("div.button-toggle-title", "Cadastro de Sucatas").click();

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

    cy.get("#mat-chip-list-input-3").type("a".repeat(70));

    cy.get("#licensePlate").type("ABC-1234");
    cy.get("#mat-input-8").type("A");
    cy.contains("mat-option", "Amarelo").click();
    cy.get("#chassis").type("12345678910123456");
    cy.get("#lot").type("4225");
    cy.get("#vehicleCertificate").type("TESTE");
    cy.get("#locations").type("{enter}", { force: true });
    cy.contains("div.mr-3.ml-3", "Teste IAGO").should("be.visible").click();
    cy.contains("div.mr-3.ml-3", " TESTE-3 ").should("be.visible").click();
    cy.contains("button", " Salvar ").should("be.visible").click();
    cy.contains("Preencha todos os formulários corretamente!").should(
      "be.visible"
    );
  });

  //===================== CENÁRIO 09 =============================

  it("Mensagem de alerta ao inseir menos que o minino de caracteres da Placa", () => {
    cy.get("#mat-expansion-panel-header-0").click();
    cy.contains("div.button-toggle-title", "Cadastro de Sucatas").click();

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

    cy.get("#licensePlate").type("AB");
    cy.get("#mat-input-8").type("A");
    cy.contains("mat-option", "Amarelo").click();
    cy.get("#chassis").type("12345678910123456");
    cy.get("#lot").type("4225");
    cy.get("#vehicleCertificate").type("TESTE");
    cy.get("#locations").type("{enter}", { force: true });
    cy.contains("div.mr-3.ml-3", "Teste IAGO").should("be.visible").click();
    cy.contains("div.mr-3.ml-3", " TESTE-3 ").should("be.visible").click();
    cy.contains("button", " Salvar ").should("be.visible").click();
    cy.contains("Preencha todos os formulários corretamente!").should(
      "be.visible"
    );
  });

  //===================== CENÁRIO 10 =============================

  it("Mensagem de alerta ao inseir Placa inválida", () => {
    cy.get("#mat-expansion-panel-header-0").click();
    cy.contains("div.button-toggle-title", "Cadastro de Sucatas").click();

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

    cy.get("#licensePlate").type("1111111");
    cy.get("#mat-input-8").type("A");
    cy.contains("mat-option", "Amarelo").click();
    cy.get("#chassis").type("12345678910123456");
    cy.get("#lot").type("4225");
    cy.get("#vehicleCertificate").type("TESTE");
    cy.get("#locations").type("{enter}", { force: true });
    cy.contains("div.mr-3.ml-3", "Teste IAGO").should("be.visible").click();
    cy.contains("div.mr-3.ml-3", " TESTE-3 ").should("be.visible").click();
    cy.contains("button", " Salvar ").should("be.visible").click();
    cy.contains("Preencha todos os formulários corretamente!").should(
      "be.visible"
    );
    cy.contains(
      "Formato de placa inválido. Use o modelo antigo ou Mercosul."
    ).should("be.visible");
  });

  //-------------------------------------------------------------------------

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

    cy.get("#mat-expansion-panel-header-0").click();
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
    //cy.contains("Fotos restantes: 3");
    cy.wait(1500);
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

    cy.visit("https://beta-desmonte.ibrsoftweb.com.br/erp/waste");
    cy.contains("BMW i3 2015").should("be.visible");
    cy.wait(300);
    cy.contains("mat-card-title", "BMW i3 2015")
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
