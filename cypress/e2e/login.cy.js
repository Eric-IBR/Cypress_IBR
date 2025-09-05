 /// <references types =”Cypress”/> 

describe('Testes de Login', () => {
  it('Realizar Login Correto', () => {
    cy.visit('https://beta-desmonte.ibrsoftweb.com.br/account/signin?redirectFrom=%2Ferp%2Fdashboard')
    cy.get('#mat-input-0').type('eric.araujo@ibrsoft.com.br')
    cy.get('#mat-input-1').type('Teste@2025')
    cy.get('[type="submit"').click()
    //cy.get('#mat-dialog-title-0').should('have.text', 'Lembrete de Vencimento Contas a Pagar / Receber')
    //cy.get('.mat-dialog-actions > .mat-focus-indicator').click()
    cy.get('.example-icon > :nth-child(1) > .mat-focus-indicator > .mat-button-wrapper > :nth-child(2)').click()
    cy.get('.mat-menu-content > button.mat-focus-indicator').click()
    cy.get('#mat-input-0').should('be.visible')
  })

  it('Login com Email inválido', () => {
    cy.visit('https://beta-desmonte.ibrsoftweb.com.br/account/signin?redirectFrom=%2Ferp%2Fdashboard')
    cy.get('#mat-input-0').type('testeincorreto@gmail.com')
    cy.get('#mat-input-1').type('Teste@2025')
    cy.get('[type="submit"').click()
    cy.contains('notify-bar', 'Email ou senha inválidos.').should('be.visible')
  })

  it('Login com Senha inválida', () => {
    cy.visit('https://beta-desmonte.ibrsoftweb.com.br/account/signin?redirectFrom=%2Ferp%2Fdashboard')
    cy.get('#mat-input-0').type('eric.araujo@ibrsoft.com.br')
    cy.get('#mat-input-1').type('invalida123')
    cy.get('[type="submit"').click()
    cy.contains('notify-bar', 'Usuário ou senha inválidos').should('be.visible')
  })
})