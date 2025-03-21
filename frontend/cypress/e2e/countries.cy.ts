describe('Countries application', () => {
    beforeEach(() => {
        cy.visit('/countries');
    });

    it('Countries displays 10 country cards', () => {
        cy.getCountryCards().should('have.length', 10);
    });

    const filterTestValues = ['Europe', 'Oceania'];

    filterTestValues.forEach((region) => {
        it(`Should correctly filter by region: ${region}`, () => {
            cy.intercept('https://restcountries.com/v3.1/region/*').as(
                'RegionRequest'
            );
            cy.get('select').select(region);
            cy.wait('@RegionRequest');
            cy.getCountryCards().first().click();
            cy.findByText(region).children().should('have.text', 'Region:');
        });
    });
});

describe('Testing search function', () => {
    beforeEach(() => {
        cy.intercept('https://restcountries.com/v3.1/all*').as(
            'CountriesRequest'
        );
        cy.visit('/countries');
        cy.wait('@CountriesRequest');
    });

    const searchTestValues = [
        {
            input: 'zi',
            expected: {
                length: 2,
            },
        },
        {
            input: 'sw',
            expected: {
                length: 4,
            },
        },
    ];

    searchTestValues.forEach((search) => {
        it(`Test search with input: ${search.input}`, () => {
            cy.get('#searchBar').type(search.input);
            cy.getCountryCards().should('have.length', search.expected.length);
        });
    });

    const filteredSearchTestValues = [
        {
            filter: 'Europe',
            search: 'sw',
            expected: {
                length: 2,
            },
        },
        {
            filter: 'Africa',
            search: 'b',
            expected: {
                length: 10,
            },
        },
    ];

    filteredSearchTestValues.forEach((filteredSearch) => {
        it(`Searches only results of filter: ${filteredSearch.filter}`, () => {
            cy.intercept('https://restcountries.com/v3.1/region/*').as(
                'RegionRequest'
            );
            cy.get('select').select(filteredSearch.filter);
            cy.wait('@RegionRequest');
            cy.get('#searchBar').type(filteredSearch.search);
            cy.getCountryCards().should(
                'have.length',
                filteredSearch.expected.length
            );
        });
    });

    filteredSearchTestValues.forEach((filteredSearch) => {
        it(`Apply filter after search`, () => {
            cy.intercept('https://restcountries.com/v3.1/region/*').as(
                'RegionRequest'
            );
            cy.get('#searchBar').type(filteredSearch.search);
            cy.get('select').select(filteredSearch.filter);
            cy.wait('@RegionRequest');
            cy.getCountryCards().should(
                'have.length',
                filteredSearch.expected.length
            );
        });
    });
});
