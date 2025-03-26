import {test, expect} from '@playwright/test'
import { Homepage } from '../pages/homepage'
import { AuthPage } from '../pages/authPage'
import { TRUE } from '../constants/helperConstants'
import { LOGIN_URL } from '../constants/urlsConstants'
import * as testData from '../test_data/user_ana.json'

test('Login User with correct email and password', async ({page}) => {
    const homepage = new Homepage(page)
    const authPage = new AuthPage(page)
    const user_ana = testData.user

    await page.goto('/')
    expect(await homepage.logo.isVisible()).toBe(TRUE)
    expect(await homepage.navBar.isVisible()).toBe(TRUE)
    await homepage.signUpLoginButton.click()
    expect(page.url()).toBe(LOGIN_URL)
    expect(await authPage.loginForm.isVisible()).toBe(TRUE)
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
    expect(await homepage.logo.isVisible()).toBe(TRUE)
    expect(await homepage.navBar.isVisible()).toBe(TRUE)
    await homepage.signUpLoginButton.click()
    expect(page.url()).toBe(LOGIN_URL)
    expect(await authPage.loginForm.isVisible()).toBe(TRUE)
    await authPage.emailLoginField.fill(user_ana.invalidEmail)
    await authPage.passwordLoginField.fill(user_ana.invalidPassword)
    await authPage.loginButton.click()
    expect (await authPage.incorrectNotification.isVisible()).toBe(TRUE)
})

test('Logout User', async ({page}) => {
    const homepage = new Homepage(page)
    const authPagePage = new AuthPage(page)
    const user_ana = testData.user

    await page.goto('/')
    expect(await homepage.logo.isVisible()).toBe(TRUE)
    expect(await homepage.navBar.isVisible()).toBe(TRUE)
    await homepage.signUpLoginButton.click()
    expect(page.url()).toBe(LOGIN_URL)
    expect(await authPagePage.loginForm.isVisible()).toBe(TRUE)
    await authPagePage.emailLoginField.fill(user_ana.loginEmail)
    await authPagePage.passwordLoginField.fill(user_ana.password)
    await authPagePage.loginButton.click()

    await expect(authPagePage.loggedInAs).toBeVisible()
    const expectedText = `Logged in as ${user_ana.name}`
    expect(await authPagePage.loggedInAs.textContent()).toContain(expectedText)

    await authPagePage.logoutButton.click()
    expect(page.url()).toBe(LOGIN_URL)
    await expect(authPagePage.loggedInAs).not.toBeVisible()
})