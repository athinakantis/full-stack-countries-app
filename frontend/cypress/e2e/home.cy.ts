describe('Countries application', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('Displays the navigation bar correctly', () => {
        cy.findByRole('link', { name: 'Home' }).should('exist');
        cy.findByRole('link', { name: 'Countries' }).should('exist');
    });

    it('Shows a list of countries', () => {
        cy.findByRole('link', { name: 'Countries' }).click();
        cy.url().should('include', '/countries');
    });

    it('Has a log in page', () => {
        cy.findByRole('link', { name: 'Log in' }).click();
        cy.findByLabelText('Email address').should('exist');
    });
});
