import {test, expect} from '@playwright/test'
import { Homepage } from '../pages/homepage'
import { ProductsPage } from '../pages/productsPage'
import { CartPage } from '../pages/cartPage'
import { AuthPage } from '../pages/authPage'
import { TRUE } from '../constants/helperConstants'
import * as testData from '../test_data/user_ana.json'
import { TestUser } from '../test_data/TestUser'
import { ORDER_NOTIFICATION_TEXT, ORDER_CONFIRMATION_URL, ORDER_MESSAGE } from '../constants/orderNotificationConstants'
import { LOGIN_URL, VIEW_CART_URL, ACCOUNT_CREATED_URL, PAYMENT_URL, CHECKOUT_URL } from '../constants/urlsConstants'

test.describe.serial('Place order', () => {
test('Place Order: Register while Checkout', async({page})=>{
    const homepage = new Homepage(page)
    const productsPage = new ProductsPage(page)
    const cartPage = new CartPage(page)
    const authPage = new AuthPage(page)
    const user_ana: TestUser = testData.user

    await page.goto('/')
    expect(await homepage.logo.isVisible()).toBe(TRUE)
    expect(await homepage.navBar.isVisible()).toBe(TRUE)
    await homepage.productsButton.click()

    await productsPage.addToCartByNumber(0)
    await productsPage.continueShoppingButton.click()
    await productsPage.addToCartByNumber(1)

    await homepage.cartButton.click()
    expect(page.url()).toBe(VIEW_CART_URL)
    await cartPage.checkoutButton.click()
    await cartPage.registerButton.click()

    expect(page.url()).toBe(LOGIN_URL)
    await authPage.signUpForm.waitFor({state: 'visible'})
    expect(await authPage.signUpForm.isVisible()).toBe(TRUE)

    await authPage.signUp(user_ana)
    
    expect (await authPage.notificationSuccess.isVisible()).toBe(TRUE)
    expect(page.url()).toBe(ACCOUNT_CREATED_URL)
    await authPage.continueButton.click()
    await expect(authPage.loggedInAs).toBeVisible()
    const expectedText = `Logged in as ${user_ana.name}`
    expect(await authPage.loggedInAs.textContent()).toContain(expectedText)

    await homepage.cartButton.click()
    await cartPage.checkoutButton.click()
    expect(page.url()).toBe(CHECKOUT_URL)
    expect (await cartPage.nameDetailsD.textContent()).toBe(`${user_ana.title} ${user_ana.firstName} ${user_ana.lastName}`)
    expect (await cartPage.companyD.textContent()).toBe(`${user_ana.company}`)
    expect (await cartPage.address1D.textContent()).toBe(`${user_ana.address1}`)
    expect (await cartPage.address2D.textContent()).toBe(`${user_ana.address2}`)
    const actualText = (await cartPage.cityStateZipCodeD.textContent() ?? '').replace(/\s+/g, ' ').trim()
    const user_anaInfo = `${user_ana.city} ${user_ana.state} ${user_ana.zipCode}`
    expect(actualText).toBe(user_anaInfo)
    expect (await cartPage.countryD.textContent()).toBe(`${user_ana.country}`)
    expect (await cartPage.phoneD.textContent()).toBe(`${user_ana.mobileNumber}`)
    
    await cartPage.message.fill(ORDER_MESSAGE)
    await cartPage.placeOrderButton.click()

    expect(page.url()).toBe(PAYMENT_URL)
    expect(await cartPage.paymentInformationForm.isVisible()).toBe(TRUE)
    await cartPage.cardName.fill(user_ana.cardName)
    await cartPage.cardNumber.fill(user_ana.cardNumber)
    await cartPage.cvc.fill(user_ana.cvc)
    await cartPage.expirationMonth.fill(user_ana.expirationMonth)
    await cartPage.expirationYear.fill(user_ana.expirationYear)
    await cartPage.confirmOrder.click()
    
    expect(page.url()).toContain(ORDER_CONFIRMATION_URL)
    expect(await cartPage.orderNotification.textContent()).toBe(ORDER_NOTIFICATION_TEXT)

    await authPage.deleteAccountButton.click()
    expect (await authPage.accountDeletedNotification.isVisible()).toBe(TRUE) 
})

test('Place Order: Register before Checkout', async({page})=>{
    const homepage = new Homepage(page)
    const authPage = new AuthPage(page)
    const productsPage = new ProductsPage(page)
    const cartPage = new CartPage(page)
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
    const actualText = (await cartPage.cityStateZipCodeD.textContent() ?? '').replace(/\s+/g, ' ').trim()
    const user_anaInfo = `${user_ana.city} ${user_ana.state} ${user_ana.zipCode}`
    expect(actualText).toBe(user_anaInfo)

    expect (await cartPage.countryD.textContent()).toBe(`${user_ana.country}`)
    expect (await cartPage.phoneD.textContent()).toBe(`${user_ana.mobileNumber}`)
    await cartPage.message.fill(ORDER_MESSAGE)
    await cartPage.placeOrderButton.click()

    expect(page.url()).toBe(PAYMENT_URL)
    expect(await cartPage.paymentInformationForm.isVisible()).toBe(TRUE)
    await cartPage.cardName.fill(user_ana.cardName)
    await cartPage.cardNumber.fill(user_ana.cardNumber)
    await cartPage.cvc.fill(user_ana.cvc)
    await cartPage.expirationMonth.fill(user_ana.expirationMonth)
    await cartPage.expirationYear.fill(user_ana.expirationYear)
    await cartPage.confirmOrder.click()
    
    expect(page.url()).toContain(ORDER_CONFIRMATION_URL)
    expect(await cartPage.orderNotification.textContent()).toBe(ORDER_NOTIFICATION_TEXT)

    await authPage.deleteAccountButton.click()
    expect (await authPage.accountDeletedNotification.isVisible()).toBe(TRUE)
})

test('Place Order: Login before Checkout', async({page})=>{
    const homepage = new Homepage(page)
    const authPage = new AuthPage(page)
    const productsPage = new ProductsPage(page)
    const cartPage = new CartPage(page)
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

    await homepage.productsButton.click()
    await productsPage.product.first().hover()
    await productsPage.addToCartHoverButton.first().click()
    await productsPage.continueShoppingButton.click()
    await productsPage.product.nth(1).hover()
    await productsPage.addToCartHoverButton.nth(1).click()

    await homepage.cartButton.click()
    expect(page.url()).toBe(VIEW_CART_URL)
    await cartPage.checkoutButton.click()
    expect(page.url()).toBe(CHECKOUT_URL)
    expect (await cartPage.nameDetailsD.textContent()).toBe(`${user_ana.title} ${user_ana.firstName} ${user_ana.lastName}`)
    expect (await cartPage.companyD.textContent()).toBe(`${user_ana.company}`)
    expect (await cartPage.address1D.textContent()).toBe(`${user_ana.address1}`)
    expect (await cartPage.address2D.textContent()).toBe(`${user_ana.address2}`)
    const actualText = (await cartPage.cityStateZipCodeD.textContent() ?? '').replace(/\s+/g, ' ').trim()
    const user_anaInfo = `${user_ana.city} ${user_ana.state} ${user_ana.zipCode}`
    expect(actualText).toBe(user_anaInfo)

    expect (await cartPage.countryD.textContent()).toBe(`${user_ana.country}`)
    expect (await cartPage.phoneD.textContent()).toBe(`${user_ana.mobileNumber}`)
    await cartPage.message.fill(ORDER_MESSAGE)
    await cartPage.placeOrderButton.click()

    expect(page.url()).toBe(PAYMENT_URL)
    expect(await cartPage.paymentInformationForm.isVisible()).toBe(TRUE)
    await cartPage.cardName.fill(user_ana.cardName)
    await cartPage.cardNumber.fill(user_ana.cardNumber)
    await cartPage.cvc.fill(user_ana.cvc)
    await cartPage.expirationMonth.fill(user_ana.expirationMonth)
    await cartPage.expirationYear.fill(user_ana.expirationYear)
    await cartPage.confirmOrder.click()
    
    expect(page.url()).toContain(ORDER_CONFIRMATION_URL)
    expect(await cartPage.orderNotification.textContent()).toBe(ORDER_NOTIFICATION_TEXT)
})
})