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
  if(urlElement.url === "https://sep.energyapps.ch"){
    cy.get("body").should("exist");
  }
  else if(urlElement.url === "https://www.geoimpact.ch"){
    cy.get("body").should("exist");
  }
  else if(urlElement.url === "https://www.swissenergyplanning.ch"){
    cy.get("body").should("exist");
  } else {
    cy.get("body").should("exist");
  }
}

urls.forEach(urlElement => {
  it(`opens ${urlElement.url}`,() => {
    testUrl(urlElement);
  })
});