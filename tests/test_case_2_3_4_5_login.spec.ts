import {test, expect} from '@playwright/test'
import { Homepage } from '../pages/homepage'
import { SignUpLogin } from '../pages/singUpLoginPage'
import * as testData from '../test_data/user_ana.json'

test('Login User with correct email and password', async ({page}) => {
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
})

test('Login User with incorrect email and password', async ({page}) => {
    const homepage = new Homepage(page)
    const signUpLoginPage = new SignUpLogin(page)
    const user_ana = testData.user

    await page.goto('/')
    expect(await homepage.logo.isVisible()).toBeTruthy()
    expect(await homepage.navBar.isVisible()).toBeTruthy()
    await homepage.signUpLoginButton.click()
    expect(page.url()).toBe('https://www.automationexercise.com/login')
    expect(await signUpLoginPage.loginForm.isVisible()).toBeTruthy()
    await signUpLoginPage.emailLoginField.fill(user_ana.invalidEmail)
    await signUpLoginPage.passwordLoginField.fill(user_ana.invalidPassword)
    await signUpLoginPage.loginButton.click()
    expect (await signUpLoginPage.incorrectNotification.isVisible()).toBeTruthy()
})

test('Logout User', async ({page}) => {
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

    await signUpLoginPage.logoutButton.click()
    expect(page.url()).toBe('https://www.automationexercise.com/login')
    await expect(signUpLoginPage.loggedInAs).not.toBeVisible()
})