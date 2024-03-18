 /// <reference types="cypress" />

import { Dependencies, RobotEyes, RobotHands } from "../robots/wikipedia/Robot"

 
 describe('template spec', () => {
  // const robotEyes=new RobotEyes;
  // const robotHands=new RobotHands;
  // const dependencies =new Dependencies;

    beforeEach('passes', () => {
      cy.visit('http://localhost:8080/login')
    })
  
    it("testing the button",()=>{
      cy.get("button")
      cy.get("[class='MuiTypography-root MuiTypography-c2 css-qudz6d-MuiTypography-root']")
      cy.get('h4')
      cy.get('[data-testid="Auth0"]')
      cy.get("[class='MuiTypography-root MuiTypography-c2 css-qudz6d-MuiTypography-root']")
      // robotEyes.seesIdVisible('h4')
      // robotEyes.seesIdVisible('button')
    })
     
  
  
    it("should match the  content",()=>{
      cy.contains("Login To Minet")
      cy.contains("Email")
      cy.contains("Password")
      cy.contains("Don't have an account?")
      
    })
      
    it("should move to dashboard when button is clicked",()=>{
        cy.get("input[placeholder='Email']").type
        cy.get("input[placeholder='Password']").type
        cy.get("button ").click({force:true})
        cy.visit("http://localhost:8080/dashboard")
        
     })
     
    
  })