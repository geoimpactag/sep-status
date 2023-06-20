/*
* This is a dynamic cypress test that fetches data from an external source and creates a fixture file before
* running the test. Cypress is not able to create a dynamic number of "it("", ()=>{})" tests.
* https://github.com/cypress-io/cypress-example-recipes/tree/master/examples/fundamentals__dynamic-tests
* https://stackoverflow.com/questions/72766346/pre-scan-web-page-for-dynamic-tests/72795255#72795255
* https://stackoverflow.com/questions/72766346/pre-scan-web-page-for-dynamic-tests/72795255#72795255
* */

import * as collectionItems from '../fixtures/webflow-collection.json'

const languages = [
    "de-CH",
    "fr-CH",
    "it-CH"
]
describe("Tests all the unarchived energy portals", {
    retries: {
        runMode: 2,
        openMode: 1,
    },
},function (){
    collectionItems
        .filter(item => item._archived === false)
        .forEach(item => {
            languages.forEach(language => {
                Cypress.config('defaultCommandTimeout', 10 * 1000);
                it(`opens energy portal "${item.slug}" in ${language}`, () => {
                    const url = `https://energieportal.energyapps.ch/ep/${item.slug}?lng=${language}`;
                    console.log(`Testing Energyportal ${url}`)
                    cy.visit(url);
                    cy.get("body").should("exist");
                    cy.get("#sep-map").should("exist");
                    cy.get("#sep-core").should("exist");
                    cy.get("#object-address-autocomplete").should("exist");
                    cy.get("#sep-contact-form").should("exist");
                    // check if the map has been loaded in the correct language based on map attributions
                    if(language === "de-CH"){
                        cy.get(".leaflet-control-attribution").should("contain", "Amtliche Vermessung Schweiz / FL")
                    }
                    if(language === "fr-CH"){
                        cy.get(".leaflet-control-attribution").should("contain", "Mensuration Officielle Suisse / FL")
                    }
                    if(language === "it-CH"){
                        cy.get(".leaflet-control-attribution").should("contain", "Misurazione Ufficiale Svizzera / FL")
                    }
                })
            })
        })
})
