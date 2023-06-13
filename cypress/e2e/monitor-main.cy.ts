import * as chai from "chai";
const urls = [
  {
    "name": "SEP",
    "url": "https://sep.energyapps.ch"
  },
  {
    "name": "Geoimpact",
    "url": "https://www.geoimpact.ch"
  },
  {
    "name": "SwissEnergyPlanning",
    "url": "https://www.swissenergyplanning.ch"
  },
  {
    "name": "Reporterenergie",
    "url": "https://reporterenergie.ch/"
  },
  {
    "name": "Reporterenergetico",
    "url": "https://reporterenergetico.ch/"
  },
  {
    "name": "Energiereporter",
    "url": "https://energiereporter.ch/"
  }
]
function testUrl(urlElement): void {
  cy.visit(urlElement.url);
  cy.get("body").should("exist");
}

urls.forEach(urlElement => {
  it(`opens ${urlElement.url}`,() => {
    Cypress.config('defaultCommandTimeout', 5000);
    testUrl(urlElement);
  })
});

const languages = [
  "de-CH",
  "fr-CH",
  "it-CH"
];
const energyPortalUrls = [
  `https://energieportal.energyapps.ch/ep/bernex`,
  `https://energieportal.energyapps.ch/ep/kloten`
]
energyPortalUrls.forEach(urlElement => {
  languages.forEach(language => {
    let url = `${urlElement}?lng=${language}`;
    it(`loads ${url}`,() => {
      Cypress.config('defaultCommandTimeout', 5000);
      cy.visit(url);
      cy.get("body").should("exist");
      cy.get("#sep-map").should("exist");
      cy.get("#sep-core").should("exist");
      cy.get("#object-address-autocomplete").should("exist");
      cy.get("#sep-contact-form").should("exist");
    })
  })
});