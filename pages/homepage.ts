import { Page } from "@playwright/test"

export class Homepage {
    page: Page

    constructor (page: Page){
        this.page = page
    }

    get logo(){
        return this.page.locator('.logo.pull-left')
    }
    get navBar(){
        return this.page.locator('.navbar-nav')
    }
    get productsButton(){
        return this.page.locator('[href="/products"]')
    }
    get cartButton(){
        return this.page.locator('[href="/view_cart"] .fa-shopping-cart')
    }
    get signUpLoginButton(){
        return this.page.locator('[href="/login"]')
    }
    get testCaseButton(){
        return this.page.locator('[href="/test_cases"] .fa-list')
    }
    get apiTestingButton(){
        return this.page.locator('[href="/api_list"] .fa-list')
    }
    get contactUsOption(){
        return this.page.locator('[href="/contact_us"]')
    }
    get logoutButton(){
        return this.page.locator('[href="/logout"]')
    }
    get deleteButton(){
        return this.page.locator('[href="/delete_account"]')
    }
    get accountDeletedNotification(){
        return this.page.locator('[data-qa="account-deleted"]')
    }

}