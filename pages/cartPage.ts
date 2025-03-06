import { Page } from "@playwright/test"

export class Cart{
    page: Page

    constructor(page: Page){
        this.page = page
    }

    get name(){
        return this.page.locator('#cart_info_table h4 a')
    }
    get price(){
        return this.page.locator('#cart_info_table .cart_price p')
    }
    get quantity(){
        return this.page.locator('#cart_info_table button')
    }
    get totalPrice(){
        return this.page.locator('#cart_info_table .cart_total_price')
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