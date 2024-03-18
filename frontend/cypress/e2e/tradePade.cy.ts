 /// <reference types="cypress" />
  
 describe('template spec', () => {
    beforeEach('passes', () => {
      cy.visit('http://localhost:8080/trade?allAssets=true&watchlist=false')
    })

    it("should move to the details page",()=>{
        cy.get("[data-id=1]").click()
        cy.visit("http://localhost:8080/details")
    })
 
    it("should contain the buy button",()=>{
        cy.get("button") 
    })
    it("should display watchlist elements",()=>{
        cy.contains("Watchlist").click()
        cy.visit("http://localhost:8080/trade?allAssets=false&watchlist=true")
    })
 })