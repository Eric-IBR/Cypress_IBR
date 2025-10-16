/// <reference types="cypress" />
import "../../support/commands";
describe("Validação de Cadastro da sucata com informação fiscal", () => {
    beforeEach(function () {
        cy.login();
    });

    it("Cadastro de sucata com informação fiscal", () => {
        const fixtureFile = "xml_sample.xml";
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

        cy.placaSucataAleatoria("#licensePlate");
        cy.get("#mat-input-8").type("A");
        cy.contains("mat-option", "Amarelo").click();
        cy.get("#chassis").type("12345678910123456");
        cy.get("#lot").type("4225");
        cy.get("#vehicleCertificate").type("TESTE");
        cy.get("#locations").type("{enter}", { force: true });
        cy.contains("div.mr-3.ml-3", "Teste IAGO").should("be.visible").click();
        cy.contains("div.mr-3.ml-3", " TESTE-3 ").should("be.visible").click();

       //INFO FISCAL DA SUCATA 
        cy.get('[role="tab"]').contains('Informações Gerais da Compra').click()
        cy.wait(200)
        cy.contains('Dados fiscais só podem ser importados via XML').should('be.visible')
        cy.get('input[type="file"][accept="text/xml"]')
            .selectFile(`cypress/fixtures/${fixtureFile}`, { force: true });

        cy.wait(500);
        cy.fixture('expected-nfe-data.json').then(data => {
            cy.validarCamposNFe(data);
        });
       
        cy.contains("button", " Salvar ").click();
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
})