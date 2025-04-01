import {test, expect} from '@playwright/test'
import { Homepage } from '../pages/homepage'
import { ProductsPage } from '../pages/productsPage'
import { ProductDetailsPage } from '../pages/productDetailsPage'
import { TRUE } from '../constants/helperConstants'
import { PRODUCT_DETAILS_URL } from '../constants/urlsConstants'

test('Verify All Products and product detail page', async ({page})=>{
    const homepage = new Homepage(page)
    const productsPage = new ProductsPage(page)
    const productDetailsPage = new ProductDetailsPage(page)

    await page.goto('/')
    expect(await homepage.logo.isVisible()).toBe(TRUE)
    expect(await homepage.navBar.isVisible()).toBe(TRUE)
    await homepage.productsButton.click()

    expect(await productsPage.allProductsTitle.isVisible()).toBe(TRUE)
    expect(await productsPage.productsList.count()).toBeGreaterThan(0)

    await productsPage.viewProductButton.first().click()
    expect(page.url()).toContain(PRODUCT_DETAILS_URL)

    expect (await productDetailsPage.productName.isVisible()).toBe(TRUE)
    expect (await productDetailsPage.category.isVisible()).toBe(TRUE)
    expect (await productDetailsPage.price.isVisible()).toBe(TRUE)
    expect (await productDetailsPage.productName.isVisible()).toBe(TRUE)
    expect (await productDetailsPage.availability.isVisible()).toBe(TRUE)
    expect (await productDetailsPage.condition.isVisible()).toBe(TRUE)
    expect (await productDetailsPage.brand.isVisible()).toBe(TRUE)
})

test.only('Search Product', async({page})=>{
    const homepage = new Homepage(page)
    const productsPage = new ProductsPage(page)

    await page.goto('/')
    expect(await homepage.logo.isVisible()).toBe(TRUE)
    expect(await homepage.navBar.isVisible()).toBe(TRUE)
    await homepage.productsButton.click()

    expect(await productsPage.allProductsTitle.isVisible()).toBe(TRUE)
    expect(await productsPage.productsList.count()).toBeGreaterThan(0)

    await productsPage.searchProductsByText('Winter')
    const titles = await productsPage.productTitle.allTextContents()
    titles.forEach(title => {
        expect(title).toContain('Winter')
    })

})
