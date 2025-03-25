import {test, expect} from '@playwright/test'
import { Homepage } from '../pages/homepage'
import { AuthPage } from '../pages/authPage'
import * as testData from '../test_data/user_ana.json'

test('Login User with correct email and password', async ({page}) => {
    const homepage = new Homepage(page)
    const authPage = new AuthPage(page)
    const user_ana = testData.user

    await page.goto('/')
    expect(await homepage.logo.isVisible()).toBeTruthy()
    expect(await homepage.navBar.isVisible()).toBeTruthy()
    await homepage.signUpLoginButton.click()
    expect(page.url()).toBe('https://www.automationexercise.com/login')
    expect(await authPage.loginForm.isVisible()).toBeTruthy()
    await authPage.emailLoginField.fill(user_ana.loginEmail)
    await authPage.passwordLoginField.fill(user_ana.password)
    await authPage.loginButton.click()

    await expect(authPage.loggedInAs).toBeVisible()
    const expectedText = `Logged in as ${user_ana.name}`
    expect(await authPage.loggedInAs.textContent()).toContain(expectedText)
})

test('Login User with incorrect email and password', async ({page}) => {
    const homepage = new Homepage(page)
    const authPage = new AuthPage(page)
    const user_ana = testData.user

    await page.goto('/')
    expect(await homepage.logo.isVisible()).toBeTruthy()
    expect(await homepage.navBar.isVisible()).toBeTruthy()
    await homepage.signUpLoginButton.click()
    expect(page.url()).toBe('https://www.automationexercise.com/login')
    expect(await authPage.loginForm.isVisible()).toBeTruthy()
    await authPage.emailLoginField.fill(user_ana.invalidEmail)
    await authPage.passwordLoginField.fill(user_ana.invalidPassword)
    await authPage.loginButton.click()
    expect (await authPage.incorrectNotification.isVisible()).toBeTruthy()
})

test('Logout User', async ({page}) => {
    const homepage = new Homepage(page)
    const authPagePage = new AuthPage(page)
    const user_ana = testData.user

    await page.goto('/')
    expect(await homepage.logo.isVisible()).toBeTruthy()
    expect(await homepage.navBar.isVisible()).toBeTruthy()
    await homepage.signUpLoginButton.click()
    expect(page.url()).toBe('https://www.automationexercise.com/login')
    expect(await authPagePage.loginForm.isVisible()).toBeTruthy()
    await authPagePage.emailLoginField.fill(user_ana.loginEmail)
    await authPagePage.passwordLoginField.fill(user_ana.password)
    await authPagePage.loginButton.click()

    await expect(authPagePage.loggedInAs).toBeVisible()
    const expectedText = `Logged in as ${user_ana.name}`
    expect(await authPagePage.loggedInAs.textContent()).toContain(expectedText)

    await authPagePage.logoutButton.click()
    expect(page.url()).toBe('https://www.automationexercise.com/login')
    await expect(authPagePage.loggedInAs).not.toBeVisible()
})