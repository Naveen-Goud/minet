import { BaseHands, BaseEyes, BaseDependencies } from '../BaseRobot';


export class Dependencies extends BaseDependencies {
   
    visitLoginPage(){
        this.accessUrl('https://localhost:8080/login');
    }
    visitDashboardPage(){
        this.accessUrl('https://localhost:8080/dashboard');
    }
    visitTradePage(){
        this.accessUrl('https://localhost:8080/trade');
    }
    visitSellPage(){
        this.accessUrl('https://localhost:8080/sell');
    }
    visitBuyPage(){
        this.accessUrl('https://localhost:8080/buy');
    }

}

export class RobotEyes extends BaseEyes{
    seesLoginPage(){
        this.seesDomVisible("login")
    }  
    seesDashboardPage(){
        this.seesDomVisible("Dashboard")
    } 
    seesTradePage(){
        this.seesDomVisible("Trade")
    } 
    seesSellPage(){
        this.seesDomVisible("Sell")
    } 
    seesBuyPage(){
        this.seesDomVisible("Buy")
    } 
}

export class RobotHands extends BaseHands{
    searchtesting(){
        this.typeTextonDom("email", "email", "naveen123@gmail.com")
            .clickOnDomElement("button")
    }
}