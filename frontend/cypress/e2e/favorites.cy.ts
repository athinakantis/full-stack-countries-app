describe('Testing favorites', () => {
  beforeEach(() => cy.login().wait(1000))

  it('Can add countries as favorites', () => {
    cy.visit('/countries').wait(4000)
    cy.get('button[data-test-id="favorite-button"]').first().click().wait(1000)

    cy.visit('/favorites').getCountryCards().should('have.length', 1)
  })

  it('Can remove from favorites', () => {
    cy.visit('/favorites').wait(4000)
    cy.get('button[data-test-id="favorite-button"]').first().click().wait(1000)
    cy.getCountryCards().should('not.exist')
  })
})