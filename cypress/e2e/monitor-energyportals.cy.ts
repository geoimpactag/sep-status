import * as url from "url";

const WEBFLOW_TOKEN = Cypress.env('WEBFLOW_TOKEN')
const languages = [
    "de-CH",
    "fr-CH",
    "it-CH"
];
describe("test", function (){
    it("should work", function (){
        cy.request({
            url: 'https://api.webflow.com/collections/6321d649488f5f57b87f085a/items',
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${WEBFLOW_TOKEN}`,
            }
        }).then(myRes => {
            console.log("Got energy portals from WebFlow item collection", {
                res: myRes, WEBFLOW_TOKEN
            })
            myRes.body.items
                .filter(item => (
                    item._archived === false
                    && item.ejected === "false"
                ))
                .forEach(item => {
                    languages.forEach(language => {
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
})

/*

*/
