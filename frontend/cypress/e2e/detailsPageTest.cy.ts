/// <refernce types="cypress"/>

describe("testing the details page",()=>{

    beforeEach("should visit the login page",()=>{
        cy.visit("http://localhost:8080/details?coinId=1&coinName=BTC")
    })

    it("should contains the details",()=>{
        cy.contains("Trade").should("be.visible")
        cy.contains("Overview")
        cy.contains("Price corelation with")
    })

    it("should move to the sell page when sell button clicked",()=>{
        cy.get("button").contains("SELL").click()
        cy.visit("http://localhost:8080/sell?coinId=1")
        cy.contains("Sell Crypto").should("be.visible")
    })

    it("should contain corelation items",()=>{
        cy.get("[class='MuiBox-root css-9hhmvf']").contains("Bitcoin")
    })

    it("should move to the buy page when buy button clicked",()=>{
        cy.get("button").contains("BUY").click()
        cy.visit("http://localhost:8080/purchase?coinId=1")
        cy.contains("Buy Crypto").should("be.visible")
    })
    
})