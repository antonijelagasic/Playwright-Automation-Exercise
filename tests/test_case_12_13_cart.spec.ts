import {test, expect} from '@playwright/test'
import { Homepage } from '../pages/homepage'
import { ProductsPage } from '../pages/productsPage'
import { ProductDetailsPage } from '../pages/productDetailsPage'
import { CartPage } from '../pages/cartPage'
import { TRUE } from '../constants/helperConstants'

test('Add Products in Cart', async({page})=>{
    const homepage = new Homepage(page)
    const productsPage = new ProductsPage(page)
    const cartPage = new CartPage(page)

    await page.goto('/')
    expect(await homepage.logo.isVisible()).toBe(TRUE)
    expect(await homepage.navBar.isVisible()).toBe(TRUE)
    await homepage.productsButton.click()

    await productsPage.addToCartByNumber(0)
    await productsPage.continueShoppingButton.click()
    await productsPage.addToCartByNumber(1)

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

test('Verify Product quantity in Cart', async({page})=>{
    const homepage = new Homepage(page)
    const productsPage = new ProductsPage(page)
    const productDetailsPage = new ProductDetailsPage(page)
    const cartPage = new CartPage(page)

    await page.goto('/')
    expect(await homepage.logo.isVisible()).toBe(TRUE)
    expect(await homepage.navBar.isVisible()).toBe(TRUE)
    await homepage.productsButton.click()
    await productsPage.viewProductButton.first().click()

    expect(page.url()).toContain('https://www.automationexercise.com/product_details')
    await productDetailsPage.addProductToCartByQuantity(4)
    await productDetailsPage.addToCartButton.click()
    await productDetailsPage.viewCartButton.click()

    expect(await cartPage.quantity.textContent()).toBe('4')
})