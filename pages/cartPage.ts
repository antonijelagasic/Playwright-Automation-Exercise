import { Page } from "@playwright/test"

export class Cart{
    page: Page

    constructor(page: Page){
        this.page = page
    }

    get subscriptionTitle(){
        return this.page.locator('.single-widget h2')
    }
    get subrscribeEmailField(){
        return this.page.locator('#susbscribe_email')
    }
    get subrscribeButton(){
        return this.page.locator('.fa.fa-arrow-circle-o-right')
    }
    get successSubcribeNotification(){
        return this.page.locator('#success-subscribe')
    }
    get footer(){
        return this.page.locator('#footer')
    }

}