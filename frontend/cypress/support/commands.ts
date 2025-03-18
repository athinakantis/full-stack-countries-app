/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
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
//
declare global {
  namespace Cypress {
    interface Chainable {
      login(): Chainable<void>;
      drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>;
      dismiss(
        subject: string,
        options?: Partial<TypeOptions>
      ): Chainable<Element>;
      visit(
        originalFn: CommandOriginalFn<any>,
        url: string,
        options: Partial<VisitOptions>
      ): Chainable<Element>;
      getCountryCards(index?: number): Chainable<JQuery<HTMLElement>>;
    }
  }
}

import '@testing-library/cypress/add-commands';

Cypress.Commands.add('getCountryCards', (index?: number) => {
  const cards = cy.get('.country-card');
  return typeof index === 'number' ? cards.eq(index) : cards;
});

Cypress.Commands.add('login', () => {
//   cy.request({
//     method: 'POST',
//     url: `https://${Cypress.env(
//       'SUPABASE_URL'
//     )}/auth/v1/token?grant_type=password`,
//     body: {
//       email: Cypress.env('TEST_USER_EMAIL'),
//       password: Cypress.env('TEST_USER_PW'),
//     },
//     headers: {
//       apikey: Cypress.env('SUPABASE_ANON_KEY'),
//     },
//   }).then(({ body }) => {
//     localStorage.setItem('supabase.auth.token', JSON.stringify(body));
//   });

cy.visit('/login')
cy.get('#email').type(Cypress.env('TEST_USER_EMAIL'))
cy.get('input[type="password"]').type(Cypress.env('TEST_USER_PW'))
cy.get('button[type="submit"]').click()
cy.log('Logged in to test user account')
});
