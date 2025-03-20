import { Page } from "@playwright/test"

export class Cart{
    page: Page

    constructor(page: Page){
        this.page = page
    }

    get removeProductButton(){
        return this.page.locator('.cart_delete .fa-times')
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
    get emptyCartNotification(){
        return this.page.locator('#empty_cart p b')
    }
    get checkoutButton(){
        return this.page.locator('.check_out')
    }
    get registerButton(){
        return this.page.locator('.modal-content [href="/login"]')
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

    //checkout
    //Delivery details
    get nameDetailsD(){
        return this.page.locator('#address_delivery .address_firstname.address_lastname')
    }
    get companyD(){
        return this.page.locator('#address_delivery .address_address1').first()
    }
    get address1D(){
        return this.page.locator('#address_delivery .address_address1').nth(1)
    }
    get address2D(){
        return this.page.locator('#address_delivery .address_address1').nth(2)
    }
    get cityStateZipCodeD(){
        return this.page.locator('#address_delivery .address_city')
    }
    get countryD(){
        return this.page.locator('#address_delivery .address_country_name')
    }
    get phoneD(){
        return this.page.locator('#address_delivery .address_phone')
    }
    //Biling details
    get nameDetailsB(){
        return this.page.locator('#address_invoice .address_firstname.address_lastname')
    }
    get companyB(){
        return this.page.locator('#address_invoice .address_address1').first()
    }
    get address1B(){
        return this.page.locator('#address_invoice .address_address1').nth(1)
    }
    get address2B(){
        return this.page.locator('#address_invoice .address_address1').nth(2)
    }
    get cityStateZipCodeB(){
        return this.page.locator('#address_invoice .address_city')
    }
    get countryB(){
        return this.page.locator('#address_invoice .address_country_name')
    }
    get phoneB(){
        return this.page.locator('#address_invoice .address_phone')
    }
    //
    get message(){
        return this.page.locator('[name="message"]')
    }
    get placeOrderButton(){
        return this.page.locator('[href="/payment"]')
    }
    get paymentInformationForm(){
        return this.page.locator('.payment-information')
    }
    get cardName(){
        return this.page.locator('[data-qa="name-on-card"]')
    }
    get cardNumber(){
        return this.page.locator('[data-qa="card-number"]')
    }
    get cvc(){
        return this.page.locator('[data-qa="cvc"]')
    }
    get expirationMonth(){
        return this.page.locator('[data-qa="expiry-month"]')
    }
    get expirationYear(){
        return this.page.locator('[data-qa="expiry-year"]')
    }
    get confirmOrder(){
        return this.page.locator('#submit')
    }
    get orderNotification(){
        return this.page.locator('#form p')
    }


}