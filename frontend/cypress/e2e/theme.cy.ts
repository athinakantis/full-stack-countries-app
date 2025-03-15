describe('Testing theme, and theme switcher', () => {
    beforeEach(() => cy.visit('/'));

    it('Initial theme is dark', () => {
        cy.clearLocalStorage('theme');
        cy.get('header')
            .should('have.css', 'background-color')
            .and('have.string', 'oklch(0.279 0.041 260.031)');
    });

    it('Switching theme from dark to light', () => {
        cy.get('#themeToggle').click();

        cy.getAllLocalStorage().then((storage) => {
            const countriesStorage = storage['http://localhost:5180'];
            expect(countriesStorage)
                .to.have.key('theme')
                .and.deep.equal({ theme: 'light' });
        });

        cy.get('header')
            .should('have.css', 'background-color')
            .and('have.string', 'oklch(0.882 0.059 254.128)');
    });
});
