import { Page } from "@playwright/test"

export class ProductDetails {
    page: Page

    constructor(page: Page){
        this.page = page
    }

    get productName(){
        return this.page.locator('.product-information h2')
    }
    get category(){
        return this.page.locator('.product-information p').filter({hasText: 'Category'})
    }
    get price(){
        return this.page.locator('.product-information span span')
    }
    get availability(){
        return this.page.locator('.product-information p').filter({hasText: 'Availability'})
    }
    get condition(){
        return this.page.locator('.product-information p').filter({hasText: 'Condition'})
    }
    get brand(){
        return this.page.locator('.product-information p').filter({hasText: 'Brand'})
    }    

    get quantityField(){
        return this.page.locator('#quantity')
    }
    get addToCartButton(){
        return this.page.locator('.btn-default.cart')
    }
    get viewCartButton(){
        return this.page.locator('.modal-content [href="/view_cart"]')
    }
}