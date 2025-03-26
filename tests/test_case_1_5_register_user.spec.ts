import {test, expect} from '@playwright/test'
import { Homepage } from '../pages/homepage'
import { AuthPage } from '../pages/authPage'
import { TRUE } from '../constants/helperConstants'
import { LOGIN_URL, ACCOUNT_CREATED_URL } from '../constants/urlsConstants'
import * as testData from '../test_data/user_ana.json'
import { TestUser } from '../test_data/TestUser'

test.describe.serial('User registartion flow', () => {
test('register user', async ({page}) => {
    const homepage = new Homepage(page)
    const authPage = new AuthPage(page)
    const user_ana: TestUser = testData.user

    await page.goto('/')
    expect(await homepage.logo.isVisible()).toBe(TRUE)
    expect(await homepage.navBar.isVisible()).toBe(TRUE)
    await homepage.signUpLoginButton.click()
    expect(page.url()).toBe(LOGIN_URL)
    expect(await authPage.signUpForm.isVisible()).toBe(TRUE)
    
    await authPage.signUp(user_ana)
    
    expect (await authPage.notificationSuccess.isVisible()).toBe(TRUE)
    expect(page.url()).toBe(ACCOUNT_CREATED_URL)
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
    expect(await homepage.logo.isVisible()).toBe(TRUE)
    expect(await homepage.navBar.isVisible()).toBe(TRUE)
    await homepage.signUpLoginButton.click()
    expect(page.url()).toBe(LOGIN_URL)
    expect(await authPage.signUpForm.isVisible()).toBe(TRUE)
    await authPage.signUpNameField.fill(user_ana.name)
    await authPage.signUpEmailField.fill(user_ana.loginEmail)
    await authPage.signUpButton.click()

    expect(await authPage.emailExsistNotification.isVisible()).toBe(TRUE)

})

test('delete account', async ({page}) => {
    const homepage = new Homepage(page)
    const authPage = new AuthPage(page)
    const user_ana = testData.user

    await page.goto('/')
    expect(await homepage.logo.isVisible()).toBe(TRUE)
    expect(await homepage.navBar.isVisible()).toBe(TRUE)
    await homepage.signUpLoginButton.click()
    expect(page.url()).toBe(LOGIN_URL)
    expect(await authPage.loginForm.isVisible()).toBe(TRUE)
    await authPage.emailLoginField.fill(user_ana.email)
    await authPage.passwordLoginField.fill(user_ana.password)
    await authPage.loginButton.click()

    await expect(authPage.loggedInAs).toBeVisible()
    const expectedText = `Logged in as ${user_ana.name}`
    expect(await authPage.loggedInAs.textContent()).toContain(expectedText)
    await authPage.deleteAccountButton.click()
    expect (await authPage.accountDeletedNotification.isVisible()).toBe(TRUE)
})

})
