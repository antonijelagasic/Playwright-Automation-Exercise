import {test, expect} from '@playwright/test'
import { Homepage } from '../pages/homepage'
import { ProductsPage } from '../pages/productsPage'
import { CartPage } from '../pages/cartPage'
import { AuthPage } from '../pages/authPage'
import * as testData from '../test_data/user_ana.json'

test('Download Invoice after purchase order', async({page})=>{
    const homepage = new Homepage(page)
    const productsPage = new ProductsPage(page)
    const cartPage = new CartPage(page)
    const authPage = new AuthPage(page)
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

    await homepage.cartButton.click()
    const cartProductNames = await cartPage.name.allTextContents()
    const cartProductPrices = await cartPage.price.allTextContents()
    await cartPage.checkoutButton.click()
    expect(page.url()).toBe('https://www.automationexercise.com/checkout')
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

    expect(await cartPage.reviewOrderSection.isVisible()).toBeTruthy()
    const checkoutProductNames = await cartPage.productNameCheckout.allTextContents()
    const checkoutProductPrices = await cartPage.productPriceCheckout.allTextContents()
    expect(cartProductNames).toEqual(checkoutProductNames)
    expect(cartProductPrices).toEqual(checkoutProductPrices)

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

    const downloadPromise = page.waitForEvent('download')
    await cartPage.downloadInvoiceButton.click()
    const download = await downloadPromise
    const suggestedFileName = await download.suggestedFilename()
    const filePath = `./downloads/${suggestedFileName}`
    await download.saveAs(filePath)
    console.log(`Invoice downloaded successfully: ${filePath}`)

    await cartPage.continueButton.click()

    await authPage.deleteAccountButton.click()
    await authPage.continueButtonAfterDeletingAccount.click()  
})