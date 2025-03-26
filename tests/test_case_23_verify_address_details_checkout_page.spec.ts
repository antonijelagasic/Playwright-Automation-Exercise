import {test, expect} from '@playwright/test'
import { Homepage } from '../pages/homepage'
import { ProductsPage } from '../pages/productsPage'
import { CartPage } from '../pages/cartPage'
import { AuthPage } from '../pages/authPage'
import { TRUE } from '../constants/helperConstants'
import { LOGIN_URL, VIEW_CART_URL, ACCOUNT_CREATED_URL, CHECKOUT_URL } from '../constants/urlsConstants'
import * as testData from '../test_data/user_ana.json'
import { TestUser } from '../test_data/TestUser'

test('Verify address details in checkout page', async({page})=>{
    const homepage = new Homepage(page)
    const productsPage = new ProductsPage(page)
    const cartPage = new CartPage(page)
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

    await homepage.productsButton.click()

    await productsPage.addToCartByNumber(0)
    await productsPage.continueShoppingButton.click()
    await productsPage.addToCartByNumber(1)

    await homepage.cartButton.click()
    expect(page.url()).toBe(VIEW_CART_URL)
    await cartPage.checkoutButton.click()
    expect(page.url()).toBe(CHECKOUT_URL)
    expect (await cartPage.nameDetailsD.textContent()).toBe(`${user_ana.title} ${user_ana.firstName} ${user_ana.lastName}`)
    expect (await cartPage.companyD.textContent()).toBe(`${user_ana.company}`)
    expect (await cartPage.address1D.textContent()).toBe(`${user_ana.address1}`)
    expect (await cartPage.address2D.textContent()).toBe(`${user_ana.address2}`)
    const actualTextD = (await cartPage.cityStateZipCodeD.textContent() ?? '').replace(/\s+/g, ' ').trim()
    const user_anaInfoD = `${user_ana.city} ${user_ana.state} ${user_ana.zipCode}`
    expect(actualTextD).toBe(user_anaInfoD)
    expect (await cartPage.countryD.textContent()).toBe(`${user_ana.country}`)
    expect (await cartPage.phoneD.textContent()).toBe(`${user_ana.mobileNumber}`)

    expect (await cartPage.nameDetailsB.textContent()).toBe(`${user_ana.title} ${user_ana.firstName} ${user_ana.lastName}`)
    expect (await cartPage.companyB.textContent()).toBe(`${user_ana.company}`)
    expect (await cartPage.address1B.textContent()).toBe(`${user_ana.address1}`)
    expect (await cartPage.address2B.textContent()).toBe(`${user_ana.address2}`)
    const actualTextB = (await cartPage.cityStateZipCodeD.textContent() ?? '').replace(/\s+/g, ' ').trim()
    const user_anaInfoB = `${user_ana.city} ${user_ana.state} ${user_ana.zipCode}`
    expect(actualTextB).toBe(user_anaInfoB)
    expect (await cartPage.countryB.textContent()).toBe(`${user_ana.country}`)
    expect (await cartPage.phoneB.textContent()).toBe(`${user_ana.mobileNumber}`)

    await authPage.deleteAccountButton.click()
    expect (await authPage.accountDeletedNotification.isVisible()).toBe(TRUE)
})