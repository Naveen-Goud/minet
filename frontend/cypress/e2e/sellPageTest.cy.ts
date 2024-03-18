/// <referrence types="cypress"/>

describe("testing the sell page",()=>{
    beforeEach("",()=>{
        cy.visit("http://localhost:8080/sell?coinId=1")
    })

    it("should contain the buy button",()=>{
        cy.contains("button","BUY")
        
    })

    it("should move to checkout when sell now is clicked",()=>{
        cy.contains("button","SELL NOW").click()
        cy.visit("http://localhost:8080/sell?coinId=1").contains("Checkout").should("be.visible")
    })
})