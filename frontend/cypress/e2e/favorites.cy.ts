describe('Testing favorites', () => {
    before(() => Cypress.session.getCurrentSessionData());

    beforeEach(() => {
        cy.login(Cypress.env('TEST_USER_EMAIL'), Cypress.env('TEST_USER_PW'));
    });

    it('Can add countries as favorites', () => {
        cy.visit('/countries');
        cy.intercept(
            'POST',
            `${Cypress.env('SUPABASE_URL')}/rest/v1/country_favorites*`
        ).as('favoriteRequest');
        cy.get('button[data-test-id="favorite-button"]').first().click();
        cy.wait('@favoriteRequest');
        cy.visit('/favorites').getCountryCards().should('have.length', 1);
    });

    it('Can remove from favorites', () => {
        cy.visit('/favorites');
        cy.intercept(
            'DELETE',
            `${Cypress.env('SUPABASE_URL')}/rest/v1/country_favorites*`
        ).as('favoriteRequest');
        cy.get('button[data-test-id="favorite-button"]').first().click();
        cy.wait('@favoriteRequest');
        cy.getCountryCards().should('not.exist');
    });
});
