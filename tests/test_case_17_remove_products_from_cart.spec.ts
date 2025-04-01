import {test, expect} from '@playwright/test'
import { Homepage } from '../pages/homepage'
import { ProductsPage } from '../pages/productsPage'
import { CartPage } from '../pages/cartPage'
import { TRUE } from '../constants/helperConstants'
import { CART_IS_EMPTY_NOTIFICATION } from '../constants/orderNotificationConstants'
import { VIEW_CART_URL } from '../constants/urlsConstants'

test('Remove Products From Cart', async({page})=>{
    const homepage = new Homepage(page)
    const productsPage = new ProductsPage(page)
    const cartPage = new CartPage(page)

    await page.goto('/')
    expect(await homepage.logo.isVisible()).toBe(TRUE)
    expect(await homepage.navBar.isVisible()).toBe(TRUE)
    await homepage.productsButton.click()

    await productsPage.product.first().hover()
    await productsPage.addToCartHoverButton.first().click()
    await productsPage.continueShoppingButton.click()
    const firstProductName = (await productsPage.productName.first().textContent()) || ''
    await productsPage.product.nth(1).hover()
    await productsPage.addToCartHoverButton.nth(1).click()

    await homepage.cartButton.click()
    expect(page.url()).toBe(VIEW_CART_URL)
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
    expect(await homepage.logo.isVisible()).toBe(TRUE)
    expect(await homepage.navBar.isVisible()).toBe(TRUE)
    await homepage.productsButton.click()

    await productsPage.product.first().hover()
    await productsPage.addToCartHoverButton.first().click()
    await productsPage.continueShoppingButton.click()
    await productsPage.product.nth(1).hover()
    await productsPage.addToCartHoverButton.nth(1).click()

    await homepage.cartButton.click()
    expect(page.url()).toBe(VIEW_CART_URL)

    await cartPage.removeAllProducts()
    expect(await cartPage.emptyCartNotification.textContent()).toBe(CART_IS_EMPTY_NOTIFICATION)
})