describe('Testing Country Information', () => {
  const testCountries = [
    {
      name: 'Finland',
      region: 'Europe',
    },
    {
      name: 'Guatemala',
      region: 'Americas',
    },
  ];

  testCountries.forEach((country) => {
    it(`Has a flag displayed`, () => {
      cy.visit(`/countries/${country.name.toLowerCase()}`).wait(1000);
      const regex = /^https:\/\/flagcdn\.com\/w320\/.*\.png$/;
      cy.get('img[id="country-flag"]')
        .should('have.attr', 'src')
        .and('match', regex);
    });
  });

  testCountries.forEach((country) => {
    it(`${country.name}: has a heading with country name`, () => {
      cy.visit(`/countries/${country.name.toLowerCase()}`).wait(1000);
      cy.get('h1').should('have.text', country.name);
    });
  });

  testCountries.forEach((country) => {
    it(`${country.name}: has a region`, () => {
      cy.visit(`/countries/${country.name.toLowerCase()}`).wait(1000);
      cy.findByText('Region:').parent().should('include.text', country.region);
    });
  });
});

describe('Test map', () => {
  const testCountries = ['Finland', 'Guatemala'];

  testCountries.forEach((country) => {
    it(`${country} displays a map`, () => {
      cy.visit(`/countries/${country.toLowerCase()}`).wait(1000);
      cy.findByTestId('map').should('exist');
    });
  });
});

describe('Test weather report', () => {
  const testCountries = [
    { input: 'Finland', expected: 'data' },
    { input: 'South Georgia', expected: 'no data' },
  ];
  testCountries.forEach((country) => {
    it(`${country.input} `, () => {
      cy.visit(`/countries/${country.input.toLowerCase()}`).wait(1000);
      const weatherComponent = cy.findByTestId('weather');

      country.expected === 'data'
        ? weatherComponent.should('include.text', 'Weather report')
        : weatherComponent.should(
            'include.text',
            'Weather report currently not available.'
          );
    });
  });
});

describe('Test "back to countries" navigation', () => {
  it('Navigates to /countries', () => {
    cy.visit('/countries/Finland').wait(1000);
    cy.findByRole('link', { name: 'Back to countries' }).click();
    cy.location('pathname').should('eq', '/countries')
  });
});
