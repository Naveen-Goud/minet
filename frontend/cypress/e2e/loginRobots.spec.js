 /// <reference types="cypress" />

import { Dependencies, RobotEyes, RobotHands } from "../robots/minetApp/LoginRobot";

 

 
 describe('template spec', () => {
  const robotEyes=new RobotEyes();
  const robotHands=new RobotHands();
  const dependencies =new Dependencies();

    beforeEach('passes', () => {
      dependencies.visitLoginPage
    })

    it("test for the components",()=>{
        robotEyes.seesLoginPage
        robotEyes.seesDomVisible("h4")
        robotEyes.seesIdVisible(":r3:")
    })
})