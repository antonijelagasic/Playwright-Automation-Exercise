import {test, expect} from '@playwright/test'
import { Homepage } from '../pages/homepage'
import { AuthPage } from '../pages/authPage'
import * as testData from '../test_data/user_ana.json'

test.describe.serial('User registartion flow', () => {
test('register user', async ({page}) => {
    const homepage = new Homepage(page)
    const authPage = new AuthPage(page)
    const user_ana = testData.user

    await page.goto('/')
    expect(await homepage.logo.isVisible()).toBeTruthy()
    expect(await homepage.navBar.isVisible()).toBeTruthy()
    await homepage.signUpLoginButton.click()
    expect(page.url()).toBe('https://www.automationexercise.com/login')
    expect(await authPage.signUpForm.isVisible()).toBeTruthy()
    await authPage.signUpNameField.fill(user_ana.name)
    await authPage.signUpEmailField.fill(user_ana.email)
    await authPage.signUpButton.click()

    await authPage.genderCheckbox.check()
    await expect(authPage.nameField).toHaveValue(user_ana.name)
    await expect(authPage.emailField).toHaveValue(user_ana.email)
    await authPage.passwordField.fill(user_ana.password)
    await authPage.dayDropdown.selectOption(user_ana.day)
    await authPage.monthDropdown.selectOption(user_ana.month)
    await authPage.yearDropdown.selectOption(user_ana.year)
    await authPage.newsletterCheckbox.check()
    await authPage.offersCheckbox.check()
    await authPage.firstNameField.fill(user_ana.firstName)
    await authPage.lastNameField.fill(user_ana.lastName)
    await authPage.companyField.fill(user_ana.company)
    await authPage.address1Field.fill(user_ana.address1)
    await authPage.address2Field.fill(user_ana.address2)
    await authPage.countryDropdown.selectOption(user_ana.country)
    await authPage.stateField.fill(user_ana.state)
    await authPage.cityField.fill(user_ana.city)
    await authPage.zipCodeField.fill(user_ana.zipCode)
    await authPage.mobileNumberField.fill(user_ana.mobileNumber)
    await authPage.createAccountButton.click()
    expect (await authPage.notificationSuccess.isVisible()).toBeTruthy()
    expect(page.url()).toBe('https://www.automationexercise.com/account_created')
    await authPage.continueButton.click()
    await expect(authPage.loggedInAs).toBeVisible()
    const expectedText = `Logged in as ${user_ana.name}`
    expect(await authPage.loggedInAs.textContent()).toContain(expectedText)
})

test('Register User with existing email', async ({page}) => {
    const homepage = new Homepage(page)
    const authPage = new AuthPage(page)
    const user_ana = testData.user

    await page.goto('/')
    expect(await homepage.logo.isVisible()).toBeTruthy()
    expect(await homepage.navBar.isVisible()).toBeTruthy()
    await homepage.signUpLoginButton.click()
    expect(page.url()).toBe('https://www.automationexercise.com/login')
    expect(await authPage.signUpForm.isVisible()).toBeTruthy()
    await authPage.signUpNameField.fill(user_ana.name)
    await authPage.signUpEmailField.fill(user_ana.loginEmail)
    await authPage.signUpButton.click()

    expect(await authPage.emailExsistNotification.isVisible()).toBeTruthy()

})

test('delete account', async ({page}) => {
    const homepage = new Homepage(page)
    const authPage = new AuthPage(page)
    const user_ana = testData.user

    await page.goto('/')
    expect(await homepage.logo.isVisible()).toBeTruthy()
    expect(await homepage.navBar.isVisible()).toBeTruthy()
    await homepage.signUpLoginButton.click()
    expect(page.url()).toBe('https://www.automationexercise.com/login')
    expect(await authPage.loginForm.isVisible()).toBeTruthy()
    await authPage.emailLoginField.fill(user_ana.email)
    await authPage.passwordLoginField.fill(user_ana.password)
    await authPage.loginButton.click()

    await expect(authPage.loggedInAs).toBeVisible()
    const expectedText = `Logged in as ${user_ana.name}`
    expect(await authPage.loggedInAs.textContent()).toContain(expectedText)
    await authPage.deleteAccountButton.click()
    expect (await authPage.accountDeletedNotification.isVisible()).toBeTruthy()
})


})
