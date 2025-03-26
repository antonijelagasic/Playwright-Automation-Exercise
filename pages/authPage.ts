import { Page } from "@playwright/test"
import { TestUser } from '../test_data/TestUser'

export class AuthPage {
    page: Page

    constructor(page: Page){
        this.page = page
    }

    //LOGIN
    get loginForm(){
        return this.page.locator('.login-form')
    }
    get loginTitle(){
        return this.page.locator
    }
    get emailLoginField(){
        return this.page.locator('[data-qa="login-email"]')
    }
    get passwordLoginField(){
        return this.page.locator('[data-qa="login-password"]')
    }
    get loginButton(){
        return this.page.locator('[data-qa="login-button"]')
    }
    get incorrectNotification(){
        return this.page.locator('.login-form p')
    }
    get logoutButton(){
        return this.page.locator('[href="/logout"]')
    }
    //SIGN UP
    get signUpForm(){
        return this.page.locator('.signup-form')
    }
    get signUpTitle(){
        return this.page.locator('.signup-form h2')
    }
    get signUpNameField(){
        return this.page.locator('[data-qa="signup-name"]')
    }
    get signUpEmailField(){
        return this.page.locator('[data-qa="signup-email"]')
    }
    get signUpButton(){
        return this.page.locator('[data-qa="signup-button"]')
    }
    get emailExsistNotification(){
        return this.page.locator('.signup-form p')
    }
    //SIGN UP DETAILS
    get genderCheckbox(){
        return this.page.locator('#id_gender2')
    }
    get nameField(){
        return this.page.locator('#name')
    }
    get emailField(){
        return this.page.locator('#email')
    }
    get passwordField(){
        return this.page.locator('#password')
    }
    get dayDropdown(){
        return this.page.locator('#days')
    }
    get monthDropdown(){
        return this.page.locator('#months')
    }
    get yearDropdown(){
        return this.page.locator('#years')
    }
    get newsletterCheckbox(){
        return this.page.locator('#newsletter')
    }
    get offersCheckbox(){
        return this.page.locator('#newsletter')
    }
    get firstNameField(){
        return this.page.locator('#first_name')
    }
    get lastNameField(){
        return this.page.locator('#last_name')
    }
    get companyField(){
        return this.page.locator('#company')
    }
    get address1Field(){
        return this.page.locator('#address1')
    }
    get address2Field(){
        return this.page.locator('#address2')
    }
    get countryDropdown(){
        return this.page.locator('#country')
    }
    get stateField(){
        return this.page.locator('#state')
    }
    get cityField(){
        return this.page.locator('#city')
    }
    get zipCodeField(){
        return this.page.locator('#zipcode')
    }
    get mobileNumberField(){
        return this.page.locator('#mobile_number')
    }
    get createAccountButton(){
        return this.page.locator('[data-qa="create-account"]')
    }
    get notificationSuccess(){
        return this.page.locator('[data-qa="account-created"] b')
    }
    get continueButton(){
        return this.page.locator('[data-qa="continue-button"]')
    }
    get loggedInAs(){
        return this.page.locator('.navbar-nav a').nth(9)
    }
    get deleteAccountButton(){
        return this.page.locator('[href="/delete_account"]')
    }
    get accountDeletedNotification(){
        return this.page.locator('[data-qa="account-deleted"]')
    }
    get continueButtonAfterDeletingAccount(){
        return this.page.locator('[data-qa="continue-button"]')
    }

    //SIGN UP METHOD
    async signUp(user: TestUser){
        await this.signUpNameField.fill(user.name)
        await this.signUpEmailField.fill(user.email)
        await this.signUpButton.click()
        await this.genderCheckbox.check()
        await this.passwordField.fill(user.password)
        await this.dayDropdown.selectOption({ value: user.day })
        await this.monthDropdown.selectOption({ value: user.month })
        await this.yearDropdown.selectOption({ value: user.year })
        await this.newsletterCheckbox.check()
        await this.offersCheckbox.check()
        await this.firstNameField.fill(user.firstName)
        await this.lastNameField.fill(user.lastName)
        await this.companyField.fill(user.company)
        await this.address1Field.fill(user.address1)
        await this.address2Field.fill(user.address2)
        await this.countryDropdown.selectOption({ value: user.country })
        await this.stateField.fill(user.state)
        await this.cityField.fill(user.city)
        await this.zipCodeField.fill(user.zipCode)
        await this.mobileNumberField.fill(user.mobileNumber)
        await this.createAccountButton.click()
    }

}