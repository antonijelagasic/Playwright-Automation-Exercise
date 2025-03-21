import {test, expect} from '@playwright/test'
import { Homepage } from '../pages/homepage'
import { Products } from '../pages/productsPage'
import { Cart } from '../pages/cartPage'
import { SignUpLogin } from '../pages/singUpLoginPage'
import * as testData from '../test_data/user_ana.json'

test('Download Invoice after purchase order', async({page})=>{
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
    const cartProductNames = await cartPage.name.allTextContents()
    const cartProductPrices = await cartPage.price.allTextContents()
    await cartPage.checkoutButton.click()
    expect(page.url()).toBe('https://www.automationexercise.com/checkout')
    expect (await cartPage.nameDetailsD.textContent()).toContain(`${user_ana.firstName} ${user_ana.lastName}`)
    expect (await cartPage.companyD.textContent()).toContain(`${user_ana.company}`)
    expect (await cartPage.address1D.textContent()).toContain(`${user_ana.address1}`)
    expect (await cartPage.address2D.textContent()).toContain(`${user_ana.address2}`)
    const textContentD = await cartPage.cityStateZipCodeD.textContent()
    expect(textContentD).toContain(user_ana.city)
    expect(textContentD).toContain(user_ana.state)
    expect(textContentD).toContain(user_ana.zipCode)
    expect (await cartPage.countryD.textContent()).toContain(`${user_ana.country}`)
    expect (await cartPage.phoneD.textContent()).toContain(`${user_ana.mobileNumber}`)

    expect (await cartPage.nameDetailsB.textContent()).toContain(`${user_ana.firstName} ${user_ana.lastName}`)
    expect (await cartPage.companyB.textContent()).toContain(`${user_ana.company}`)
    expect (await cartPage.address1B.textContent()).toContain(`${user_ana.address1}`)
    expect (await cartPage.address2B.textContent()).toContain(`${user_ana.address2}`)
    const textContentB = await cartPage.cityStateZipCodeB.textContent()
    expect(textContentB).toContain(user_ana.city)
    expect(textContentB).toContain(user_ana.state)
    expect(textContentB).toContain(user_ana.zipCode)
    expect (await cartPage.countryB.textContent()).toContain(`${user_ana.country}`)
    expect (await cartPage.phoneB.textContent()).toContain(`${user_ana.mobileNumber}`)

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

    await signUpLoginPage.deleteAccountButton.click()
    await signUpLoginPage.continueButtonAfterDeletingAccount.click()  
})