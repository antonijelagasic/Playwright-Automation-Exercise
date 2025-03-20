import {test, expect} from '@playwright/test'
import { Homepage } from '../pages/homepage'
import { Products } from '../pages/productsPage'
import { Cart } from '../pages/cartPage'
import { SignUpLogin } from '../pages/singUpLoginPage'
import * as testData from '../test_data/user_ana.json'

test('Place Order: Register while Checkout', async({page})=>{
    const homepage = new Homepage(page)
    const productsPage = new Products(page)
    const cartPage = new Cart(page)
    const signUpLoginPage = new SignUpLogin(page)
    const user_ana = testData.user

    await page.goto('/')
    expect(await homepage.logo.isVisible()).toBeTruthy()
    expect(await homepage.navBar.isVisible()).toBeTruthy()
    await homepage.productsButton.click()

    await productsPage.product.first().hover()
    await productsPage.addToCartHoverButton.first().click()
    await productsPage.continueShoppingButton.click()
    await productsPage.product.nth(1).hover()
    await productsPage.addToCartHoverButton.nth(1).click()

    await homepage.cartButton.click()
    expect(page.url()).toBe('https://www.automationexercise.com/view_cart')
    await cartPage.checkoutButton.click()
    await cartPage.registerButton.click()

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
    await signUpLoginPage.mobileNumberField.fill(user_ana.mobileNumber)
    await signUpLoginPage.createAccountButton.click()
    expect (await signUpLoginPage.notificationSuccess.isVisible()).toBeTruthy()
    expect(page.url()).toBe('https://www.automationexercise.com/account_created')
    await signUpLoginPage.continueButton.click()
    await expect(signUpLoginPage.loggedInAs).toBeVisible()
    const expectedText = `Logged in as ${user_ana.name}`
    expect(await signUpLoginPage.loggedInAs.textContent()).toContain(expectedText)

    await homepage.cartButton.click()
    await cartPage.checkoutButton.click()
    expect(page.url()).toBe('https://www.automationexercise.com/checkout')
    expect (await cartPage.nameDetailsD.textContent()).toContain(`${user_ana.firstName} ${user_ana.lastName}`)
    expect (await cartPage.companyD.textContent()).toContain(`${user_ana.company}`)
    expect (await cartPage.address1D.textContent()).toContain(`${user_ana.address1}`)
    expect (await cartPage.address2D.textContent()).toContain(`${user_ana.address2}`)
    const textContent = await cartPage.cityStateZipCodeD.textContent()
    expect(textContent).toContain(user_ana.city)
    expect(textContent).toContain(user_ana.state)
    expect(textContent).toContain(user_ana.zipCode)
    expect (await cartPage.countryD.textContent()).toContain(`${user_ana.country}`)
    expect (await cartPage.phoneD.textContent()).toContain(`${user_ana.mobileNumber}`)
    await cartPage.message.fill('Message for checkout.')
    await cartPage.placeOrderButton.click()

    expect(page.url()).toBe('https://www.automationexercise.com/payment')
    expect(await cartPage.paymentInformationForm.isVisible()).toBeTruthy()
    await cartPage.cardName.fill(user_ana.cardName)
    await cartPage.cardNumber.fill(user_ana.cardNumber)
    await cartPage.cvc.fill(user_ana.cvc)
    await cartPage.expirationMonth.fill(user_ana.expirationMonth)
    await cartPage.expirationYear.fill(user_ana.expirationYear)
    await cartPage.confirmOrder.click()
    
    expect(page.url()).toContain('https://www.automationexercise.com/payment_done')
    expect(await cartPage.orderNotification.textContent()).toBe('Congratulations! Your order has been confirmed!')

    await signUpLoginPage.deleteAccountButton.click()
    expect (await signUpLoginPage.accountDeletedNotification.isVisible()).toBeTruthy()   
})

test('Place Order: Register before Checkout', async({page})=>{
    const homepage = new Homepage(page)
    const signUpLoginPage = new SignUpLogin(page)
    const productsPage = new Products(page)
    const cartPage = new Cart(page)
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
    await signUpLoginPage.mobileNumberField.fill(user_ana.mobileNumber)
    await signUpLoginPage.createAccountButton.click()
    expect (await signUpLoginPage.notificationSuccess.isVisible()).toBeTruthy()
    expect(page.url()).toBe('https://www.automationexercise.com/account_created')
    await signUpLoginPage.continueButton.click()
    await expect(signUpLoginPage.loggedInAs).toBeVisible()
    const expectedText = `Logged in as ${user_ana.name}`
    expect(await signUpLoginPage.loggedInAs.textContent()).toContain(expectedText)

    await homepage.productsButton.click()
    await productsPage.product.first().hover()
    await productsPage.addToCartHoverButton.first().click()
    await productsPage.continueShoppingButton.click()
    await productsPage.product.nth(1).hover()
    await productsPage.addToCartHoverButton.nth(1).click()

    await homepage.cartButton.click()
    expect(page.url()).toBe('https://www.automationexercise.com/view_cart')
    await cartPage.checkoutButton.click()
    expect(page.url()).toBe('https://www.automationexercise.com/checkout')
    expect (await cartPage.nameDetailsD.textContent()).toContain(`${user_ana.firstName} ${user_ana.lastName}`)
    expect (await cartPage.companyD.textContent()).toContain(`${user_ana.company}`)
    expect (await cartPage.address1D.textContent()).toContain(`${user_ana.address1}`)
    expect (await cartPage.address2D.textContent()).toContain(`${user_ana.address2}`)
    const textContent = await cartPage.cityStateZipCodeD.textContent()
    expect(textContent).toContain(user_ana.city)
    expect(textContent).toContain(user_ana.state)
    expect(textContent).toContain(user_ana.zipCode)
    expect (await cartPage.countryD.textContent()).toContain(`${user_ana.country}`)
    expect (await cartPage.phoneD.textContent()).toContain(`${user_ana.mobileNumber}`)
    await cartPage.message.fill('Message for checkout.')
    await cartPage.placeOrderButton.click()

    expect(page.url()).toBe('https://www.automationexercise.com/payment')
    expect(await cartPage.paymentInformationForm.isVisible()).toBeTruthy()
    await cartPage.cardName.fill(user_ana.cardName)
    await cartPage.cardNumber.fill(user_ana.cardNumber)
    await cartPage.cvc.fill(user_ana.cvc)
    await cartPage.expirationMonth.fill(user_ana.expirationMonth)
    await cartPage.expirationYear.fill(user_ana.expirationYear)
    await cartPage.confirmOrder.click()
    
    expect(page.url()).toContain('https://www.automationexercise.com/payment_done')
    expect(await cartPage.orderNotification.textContent()).toBe('Congratulations! Your order has been confirmed!')

    await signUpLoginPage.deleteAccountButton.click()
    expect (await signUpLoginPage.accountDeletedNotification.isVisible()).toBeTruthy()
})

test('Place Order: Login before Checkout', async({page})=>{
    const homepage = new Homepage(page)
    const signUpLoginPage = new SignUpLogin(page)
    const productsPage = new Products(page)
    const cartPage = new Cart(page)
    const user_ana = testData.user

    await page.goto('/')
    expect(await homepage.logo.isVisible()).toBeTruthy()
    expect(await homepage.navBar.isVisible()).toBeTruthy()
    await homepage.signUpLoginButton.click()
    expect(page.url()).toBe('https://www.automationexercise.com/login')
    expect(await signUpLoginPage.loginForm.isVisible()).toBeTruthy()
    await signUpLoginPage.emailLoginField.fill(user_ana.loginEmail)
    await signUpLoginPage.passwordLoginField.fill(user_ana.password)
    await signUpLoginPage.loginButton.click()

    await expect(signUpLoginPage.loggedInAs).toBeVisible()
    const expectedText = `Logged in as ${user_ana.name}`
    expect(await signUpLoginPage.loggedInAs.textContent()).toContain(expectedText)

    await homepage.productsButton.click()
    await productsPage.product.first().hover()
    await productsPage.addToCartHoverButton.first().click()
    await productsPage.continueShoppingButton.click()
    await productsPage.product.nth(1).hover()
    await productsPage.addToCartHoverButton.nth(1).click()

    await homepage.cartButton.click()
    expect(page.url()).toBe('https://www.automationexercise.com/view_cart')
    await cartPage.checkoutButton.click()
    expect(page.url()).toBe('https://www.automationexercise.com/checkout')
    expect (await cartPage.nameDetailsD.textContent()).toContain(`${user_ana.firstName} ${user_ana.lastName}`)
    expect (await cartPage.companyD.textContent()).toContain(`${user_ana.company}`)
    expect (await cartPage.address1D.textContent()).toContain(`${user_ana.address1}`)
    expect (await cartPage.address2D.textContent()).toContain(`${user_ana.address2}`)
    const textContent = await cartPage.cityStateZipCodeD.textContent()
    expect(textContent).toContain(user_ana.city)
    expect(textContent).toContain(user_ana.state)
    expect(textContent).toContain(user_ana.zipCode)
    expect (await cartPage.countryD.textContent()).toContain(`${user_ana.country}`)
    expect (await cartPage.phoneD.textContent()).toContain(`${user_ana.mobileNumber}`)
    await cartPage.message.fill('Message for checkout.')
    await cartPage.placeOrderButton.click()

    expect(page.url()).toBe('https://www.automationexercise.com/payment')
    expect(await cartPage.paymentInformationForm.isVisible()).toBeTruthy()
    await cartPage.cardName.fill(user_ana.cardName)
    await cartPage.cardNumber.fill(user_ana.cardNumber)
    await cartPage.cvc.fill(user_ana.cvc)
    await cartPage.expirationMonth.fill(user_ana.expirationMonth)
    await cartPage.expirationYear.fill(user_ana.expirationYear)
    await cartPage.confirmOrder.click()
    
    expect(page.url()).toContain('https://www.automationexercise.com/payment_done')
    expect(await cartPage.orderNotification.textContent()).toBe('Congratulations! Your order has been confirmed!')
})