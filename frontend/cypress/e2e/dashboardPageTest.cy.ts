 /// <reference types="cypress" />
 
 describe('template spec', () => {
    beforeEach('passes', () => {
      cy.visit('http://localhost:8080/dashboard')
    })
  
    it("testing the button",()=>{
      cy.get("button")
      cy.get("[class='MuiTypography-root MuiTypography-c2 css-qudz6d-MuiTypography-root']")
 
    })
     
    it("should match the content of page",()=>{
      cy.contains("Watchlist")
      cy.contains("My Portfolio Value")
      cy.contains("Click on currency name below to display it on the graph")
      cy.contains("Recent Transactions")
      cy.contains("My Wallet")
    })

    it("should move to the trade page when discover assets is clicked",()=>{
        cy.contains("Discover Assets").click()
        cy.visit("http://localhost:8080/trade")
    })

    it("should  logout when logout is selected ",()=>{
        cy.get("[class='MuiBox-root css-0']").find("[alt='logout icon']").click()
        cy.visit("http://localhost:8081/login")
    })

  })