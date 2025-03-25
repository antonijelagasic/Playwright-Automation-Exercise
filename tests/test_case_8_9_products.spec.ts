import {test, expect} from '@playwright/test'
import { Homepage } from '../pages/homepage'
import { ProductsPage } from '../pages/productsPage'
import { ProductDetailsPage } from '../pages/productDetailsPage'

test('Verify All Products and product detail page', async ({page})=>{
    const homepage = new Homepage(page)
    const productsPage = new ProductsPage(page)
    const productDetailsPage = new ProductDetailsPage(page)

    await page.goto('/')
    expect(await homepage.logo.isVisible()).toBeTruthy()
    expect(await homepage.navBar.isVisible()).toBeTruthy()
    await homepage.productsButton.click()

    expect(await productsPage.allProductsTitle.isVisible()).toBeTruthy()
    expect(await productsPage.productsList.count()).toBeGreaterThan(0)

    await productsPage.viewProductButton.first().click()
    expect(page.url()).toContain('https://www.automationexercise.com/product_details')

    expect (await productDetailsPage.productName.isVisible()).toBeTruthy()
    expect (await productDetailsPage.category.isVisible()).toBeTruthy()
    expect (await productDetailsPage.price.isVisible()).toBeTruthy()
    expect (await productDetailsPage.productName.isVisible()).toBeTruthy()
    expect (await productDetailsPage.availability.isVisible()).toBeTruthy()
    expect (await productDetailsPage.condition.isVisible()).toBeTruthy()
    expect (await productDetailsPage.brand.isVisible()).toBeTruthy()
})

test.only('Search Product', async({page})=>{
    const homepage = new Homepage(page)
    const productsPage = new ProductsPage(page)

    await page.goto('/')
    expect(await homepage.logo.isVisible()).toBeTruthy()
    expect(await homepage.navBar.isVisible()).toBeTruthy()
    await homepage.productsButton.click()

    expect(await productsPage.allProductsTitle.isVisible()).toBeTruthy()
    expect(await productsPage.productsList.count()).toBeGreaterThan(0)

    await productsPage.searchProductsByText('Winter')
    const titles = await productsPage.productTitle.allTextContents()
    titles.forEach(title => {
        expect(title).toContain('Winter')
    })

})
