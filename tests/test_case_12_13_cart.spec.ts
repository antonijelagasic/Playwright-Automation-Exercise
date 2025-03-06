import {test, expect} from '@playwright/test'
import { Homepage } from '../pages/homepage'
import { Products } from '../pages/productsPage'
import { ProductDetails } from '../pages/productDetailsPage'
import { Cart } from '../pages/cartPage'

test('Add Products in Cart', async({page})=>{
    const homepage = new Homepage(page)
    const productsPage = new Products(page)
    const cartPage = new Cart(page)

    await page.goto('/')
    expect(await homepage.logo.isVisible()).toBeTruthy()
    expect(await homepage.navBar.isVisible()).toBeTruthy()
    await homepage.productsButton.click()

    await productsPage.product.first().hover()
    await productsPage.addToCartHoverButton.first().click()
    await productsPage.continueShoppingButton.click()
    await productsPage.product.nth(1).hover()
    await productsPage.addToCartHoverButton.nth(1).click()

    const firstProductName = await productsPage.productName.first().textContent()
    const firstProductPrice = await productsPage.productPrice.first().textContent()
    const secondProductName = await productsPage.productName.nth(1).textContent()
    const secondProductPrice = await productsPage.productPrice.nth(1).textContent()
    await productsPage.viewCartButton.click()

    const firstCartProductName = await cartPage.name.first().textContent()
    const firstCartProductPrice = await cartPage.price.first().textContent()
    const secondCartProductName = await cartPage.name.nth(1).textContent()
    const secondCartProductPrice = await cartPage.price.nth(1).textContent()

    expect(firstProductName).toBe(firstCartProductName)
    expect(firstProductPrice).toBe(firstCartProductPrice)
    expect(secondProductName).toBe(secondCartProductName)
    expect(secondProductPrice).toBe(secondCartProductPrice)

    expect(await cartPage.quantity.first().textContent()).toBe('1')
    expect(await cartPage.quantity.nth(1).textContent()).toBe('1')
})

test.only('Verify Product quantity in Cart', async({page})=>{
    const homepage = new Homepage(page)
    const productsPage = new Products(page)
    const productDetailsPage = new ProductDetails(page)
    const cartPage = new Cart(page)

    await page.goto('/')
    expect(await homepage.logo.isVisible()).toBeTruthy()
    expect(await homepage.navBar.isVisible()).toBeTruthy()
    await homepage.productsButton.click()
    await productsPage.viewProductButton.first().click()

    expect(page.url()).toContain('https://www.automationexercise.com/product_details')
    await productDetailsPage.quantityField.fill('4')
    await productDetailsPage.addToCartButton.click()
    await productDetailsPage.addToCartButton.click()
    await productDetailsPage.viewCartButton.click()

    expect(await cartPage.quantity.textContent()).toBe('4')
})