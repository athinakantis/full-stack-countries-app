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
            cy.get('select').select(region).wait(1000);
            cy.getCountryCards().first().click();
            cy.findByText(region).children().should('have.text', 'Region:');
        });
    });
});

describe('Testing search function', () => {
    beforeEach(() => {
        cy.visit('/countries');
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
            cy.get('#searchBar').type(search.input).wait(1000);
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
            cy.get('select').select(filteredSearch.filter).wait(1000);
            cy.get('#searchBar').type(filteredSearch.search).wait(1000);
            cy.getCountryCards().should(
                'have.length',
                filteredSearch.expected.length
            );
        });
    });

    filteredSearchTestValues.forEach((filteredSearch) => {
        it(`Apply filter after search`, () => {
            cy.get('#searchBar').type(filteredSearch.search).wait(1000);
            cy.get('select').select(filteredSearch.filter).wait(1000);
            cy.getCountryCards().should(
                'have.length',
                filteredSearch.expected.length
            );
        });
    });
});
