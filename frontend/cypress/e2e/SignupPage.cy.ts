 /// <reference types="cypress" />
 
describe('template spec', () => {
  beforeEach('passes', () => {
    cy.visit('http://localhost:8080/')
  })

  it("testing the button",()=>{
    cy.get("button")
    cy.get("[class='MuiTypography-root MuiTypography-c2 css-qudz6d-MuiTypography-root']")
    cy.get('h4')
    cy.get('[data-testid="Auth0"]')
    cy.get("[class='MuiTypography-root MuiTypography-c2 css-qudz6d-MuiTypography-root']")
  })
   

  it("testing the content",()=>{
    cy.contains("Signup with Minet")
    cy.contains("Full Name")
    cy.contains("Email")
    cy.contains("Password")
    cy.contains("Already have an account?")
  })
    
  
})