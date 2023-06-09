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
  }
]
function test(urlElement){
  cy.visit(urlElement.url);
  if(urlElement.url === "https://sep.energyapps.ch"){
    cy.get("body").should("exist");
  }
  if(urlElement.url === "https://www.geoimpact.ch"){
    cy.get("body").should("exist");
  }
  if(urlElement.url === "https://www.swissenergyplanning.ch"){
    cy.get("body").should("exist");
  }
}

urls.forEach(urlElement => {
  it(`opens ${urlElement.url}`,() => {
    test(urlElement);
  })
})