import {test, expect} from '@playwright/test'
import { Homepage } from '../pages/homepage'
import { ProductsPage } from '../pages/productsPage'
import { CartPage } from '../pages/cartPage'

test('Remove Products From Cart', async({page})=>{
    const homepage = new Homepage(page)
    const productsPage = new ProductsPage(page)
    const cartPage = new CartPage(page)

    await page.goto('/')
    expect(await homepage.logo.isVisible()).toBeTruthy()
    expect(await homepage.navBar.isVisible()).toBeTruthy()
    await homepage.productsButton.click()

    await productsPage.product.first().hover()
    await productsPage.addToCartHoverButton.first().click()
    await productsPage.continueShoppingButton.click()
    const firstProductName = (await productsPage.productName.first().textContent()) || ''
    await productsPage.product.nth(1).hover()
    await productsPage.addToCartHoverButton.nth(1).click()

    await homepage.cartButton.click()
    expect(page.url()).toBe('https://www.automationexercise.com/view_cart')
    const firstProductCartName = await cartPage.name.first().textContent()
    expect (firstProductName).toBe(firstProductCartName)
    await cartPage.removeProductButton.first().click()
    await expect(cartPage.name.first()).not.toHaveText(firstProductName)
})

test('Remove all products from the cart', async({page})=>{
    const homepage = new Homepage(page)
    const productsPage = new ProductsPage(page)
    const cartPage = new CartPage(page)

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

    await cartPage.removeAllProducts()
    expect(await cartPage.emptyCartNotification.textContent()).toBe('Cart is empty!')
})