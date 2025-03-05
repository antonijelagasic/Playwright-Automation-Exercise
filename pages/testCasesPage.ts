import { Page } from "@playwright/test"

export class TestCases {
    page: Page

    constructor (page: Page){
        this.page = page
    }

    get title(){
        return this.page.locator('h2.title')
    }
    get testCasesList(){
        return this.page.locator('.panel-title a u')
    }
    get firstTestCase(){
        return this.page.locator('[href="#collapse1"]')
    }
}