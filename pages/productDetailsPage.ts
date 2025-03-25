import { Page } from "@playwright/test"

export class ProductDetailsPage {
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
    get writeYourReviewTitle(){
        return this.page.locator('[href="#reviews"]')
    }
    get nameField(){
        return this.page.locator('#name')
    }
    get emailField(){
        return this.page.locator('#email')
    }
    get reviewField(){
        return this.page.locator('[name="review"]')
    }
    get submitReview(){
        return this.page.locator('#button-review')
    }
    get reviewNotification(){
        return this.page.locator('#review-form .alert-success')
    }

    //
    async addReview(name: string, email: string, review: string): Promise<void>{
        await this.nameField.fill(name)
        await this.emailField.fill(email)
        await this.reviewField.fill(review)
        await this.submitReview.click()
    }
}