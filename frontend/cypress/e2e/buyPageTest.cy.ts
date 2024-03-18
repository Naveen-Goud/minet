/// <refernce types="cypress"/>

describe("testing the buy page",()=>{
    beforeEach("buy page",()=>{
        cy.visit("http://localhost:8080/purchase?coinId=1")
    })

    it("should the page components",()=>{
        cy.get("[class='MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-1 css-fhjc4v-MuiGrid-root']")
        .contains("Bitcoin").click()
        cy.get("[class='MuiTypography-root MuiTypography-b1 css-1k7enw8-MuiTypography-root']")
        .contains("Bitcoin")
    })

    it("slider should move completly when we select the buy max",()=>{
        cy.get("button").contains("Buy max").click() 
        cy.get("[class='MuiTypography-root MuiTypography-subtitle1 css-1atzdrp-MuiTypography-root']")
         .contains("$10.00")
    })
    
    it("should the drop down to select the time of delivery",()=>{
        cy.get("[class='MuiAccordionSummary-expandIconWrapper css-yw020d-MuiAccordionSummary-expandIconWrapper']").click()
        cy.get("[class='MuiCollapse-root MuiCollapse-vertical MuiCollapse-entered css-pwcg7p-MuiCollapse-root']")
        cy.get("[class='MuiTypography-root MuiTypography-b2 css-i4724b-MuiTypography-root']")
        .contains("2-5 minutes") 
        
    })
 
})