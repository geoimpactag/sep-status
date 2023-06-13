import * as util from "./util"
/*
* This is a dynamic cypress test: https://github.com/cypress-io/cypress-example-recipes/tree/master/examples/fundamentals__dynamic-tests
* https://stackoverflow.com/questions/72766346/pre-scan-web-page-for-dynamic-tests/72795255#72795255
* https://stackoverflow.com/questions/72766346/pre-scan-web-page-for-dynamic-tests/72795255#72795255
* */

import * as collectionItems from '../fixtures/webflow-collection.json'

const languages = [
    "de-CH",
    "fr-CH",
    "it-CH"
]
describe("Tests all the unarchived energy portals", function (){
    collectionItems
        .filter(item => item._archived === false)
        .forEach(item => {
            languages.forEach(language => {
                it(`opens energy portal "${item.slug}" in ${language}`, () => {
                    const url = `https://energieportal.energyapps.ch/ep/${item.slug}?lng=${language}`;
                    console.log(`Testing Energyportal ${url}`)
                    cy.visit(url);
                    cy.get("body").should("exist");
                    cy.get("#sep-map").should("exist");
                    cy.get("#sep-core").should("exist");
                    cy.get("#object-address-autocomplete").should("exist");
                    cy.get("#sep-contact-form").should("exist");
                })
            })
        })
})
