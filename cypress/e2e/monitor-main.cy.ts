import * as chai from "chai";
import axios from "axios";
describe.skip("Test body of generic websites",  () => {
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
      Cypress.config('defaultCommandTimeout', 10 * 1000);
      testUrl(urlElement);
    })
  });
})

describe.only("Test Energyportals", async function (){
  const WEBFLOW_TOKEN = Cypress.env('WEBFLOW_TOKEN')
  const languages = [
    "de-CH",
    "fr-CH",
    "it-CH"
  ];
  /*
  * fetch all the energy portal items from webflow
  * */
  async function fetchEnergyPortalCollection(){
    const res = await axios({
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://api.webflow.com/collections/6321d649488f5f57b87f085a/items',
      headers: {
        'Content-Type': "application/json",
        'Authorization': `Bearer ${WEBFLOW_TOKEN}`,
      }
    });
    return res;
  }
  const energyPortalUrls = [
    `https://energieportal.energyapps.ch/ep/bernex`,
    `https://energieportal.energyapps.ch/ep/kloten`
  ];
  const allUrls = await fetchEnergyPortalCollection();
  console.log("Got Energyportals from WebFlow item collection", {
    allUrls, WEBFLOW_TOKEN
  })
  energyPortalUrls.forEach(urlElement => {
    languages.forEach(language => {
      const url = `${urlElement}?lng=${language}`;
      it(`loads ${url}`,() => {
        Cypress.config('defaultCommandTimeout', 10 * 1000);
        cy.visit(url);
        cy.get("body").should("exist");
        cy.get("#sep-map").should("exist");
        cy.get("#sep-core").should("exist");
        cy.get("#object-address-autocomplete").should("exist");
        cy.get("#sep-contact-form").should("exist");
      })
    })
  });
})
