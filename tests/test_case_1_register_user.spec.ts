import {test, expect} from '@playwright/test'
import { Homepage } from '../pages/homepage'
import { SignUpLogin } from '../pages/singUpLoginPage'
import * as testData from '../test_data/user_ana.json'

test('register user', async ({page}) => {
    const homepage = new Homepage(page)
    const signUpLoginPage = new SignUpLogin(page)
    const user_ana = testData.user

    await page.goto('/')
    expect(await homepage.logo.isVisible()).toBeTruthy()
    expect(await homepage.navBar.isVisible()).toBeTruthy()
    await homepage.signUpLoginButton.click()
    expect(page.url()).toBe('https://www.automationexercise.com/login')
    expect(await signUpLoginPage.signUpForm.isVisible()).toBeTruthy()
    await signUpLoginPage.signUpNameField.fill(user_ana.name)
    await signUpLoginPage.signUpEmailField.fill(user_ana.email)
    await signUpLoginPage.signUpButton.click()

    await signUpLoginPage.genderCheckbox.check()
    await expect(signUpLoginPage.nameField).toHaveValue(user_ana.name)
    await expect(signUpLoginPage.emailField).toHaveValue(user_ana.email)
    await signUpLoginPage.passwordField.fill(user_ana.password)
    await signUpLoginPage.dayDropdown.selectOption(user_ana.day)
    await signUpLoginPage.monthDropdown.selectOption(user_ana.month)
    await signUpLoginPage.yearDropdown.selectOption(user_ana.year)
    await signUpLoginPage.newsletterCheckbox.check()
    await signUpLoginPage.offersCheckbox.check()
    await signUpLoginPage.firstNameField.fill(user_ana.firstName)
    await signUpLoginPage.lastNameField.fill(user_ana.lastName)
    await signUpLoginPage.companyField.fill(user_ana.company)
    await signUpLoginPage.address1Field.fill(user_ana.address1)
    await signUpLoginPage.address2Field.fill(user_ana.address2)
    await signUpLoginPage.countryDropdown.selectOption(user_ana.country)
    await signUpLoginPage.stateField.fill(user_ana.state)
    await signUpLoginPage.cityField.fill(user_ana.city)
    await signUpLoginPage.zipCodeField.fill(user_ana.zipCode)
    await signUpLoginPage.mobileNumberField.fill(user_ana.password)
    await signUpLoginPage.createAccountButton.click()
    expect (await signUpLoginPage.notificationSuccess.isVisible()).toBeTruthy()
    expect(page.url()).toBe('https://www.automationexercise.com/account_created')
    await signUpLoginPage.continueButton.click()
    await expect(signUpLoginPage.loggedInAs).toBeVisible()
    const expectedText = `Logged in as ${user_ana.name}`
    expect(await signUpLoginPage.loggedInAs.textContent()).toContain(expectedText)
})

test.skip('delete account', async ({page}) => {
    const homepage = new Homepage(page)
    const signUpLoginPage = new SignUpLogin(page)
    const user_ana = testData.user

    await page.goto('/')
    expect(await homepage.logo.isVisible()).toBeTruthy()
    expect(await homepage.navBar.isVisible()).toBeTruthy()
    await homepage.signUpLoginButton.click()
    expect(page.url()).toBe('https://www.automationexercise.com/login')
    expect(await signUpLoginPage.loginForm.isVisible()).toBeTruthy()
    await signUpLoginPage.emailLoginField.fill(user_ana.email)
    await signUpLoginPage.passwordLoginField.fill(user_ana.password)
    await signUpLoginPage.loginButton.click()

    await expect(signUpLoginPage.loggedInAs).toBeVisible()
    const expectedText = `Logged in as ${user_ana.name}`
    expect(await signUpLoginPage.loggedInAs.textContent()).toContain(expectedText)
    await signUpLoginPage.deleteAccountButton.click()
    expect (await signUpLoginPage.accountDeletedNotification.isVisible()).toBeTruthy()
})



