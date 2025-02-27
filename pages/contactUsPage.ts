import { Page } from "@playwright/test"

export class ContactUs {
    page: Page

    constructor (page: Page){
        this.page = page
    }

    get contactUsForm(){
        return this.page.locator('#contact-us-form')
    }
    get getInTouchTitle(){
        return this.page.locator('.contact-form h2')
    }
    get nameField(){
        return this.page.locator('[data-qa="name"]')
    }
    get emailField(){
        return this.page.locator('[data-qa="email"]')
    }
    get subjectField(){
        return this.page.locator('[data-qa="subject"]')
    }
    get messageField(){
        return this.page.locator('[data-qa="message"]')
    }
    get uploadButton(){
        return this.page.locator('[name="upload_file"]')
    }
    get submitButton(){
        return this.page.locator('[data-qa="submit-button"]')
    }
    get successNotification(){
        return this.page.locator('.status.alert.alert-success')
    }

}