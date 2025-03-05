import {test, expect} from '@playwright/test'
import { Homepage } from '../pages/homepage'
import { Products } from '../pages/productsPage'
import { ProductDetails } from '../pages/productDetailsPage'

test('Verify All Products and product detail page', async ({page})=>{
    const homepage = new Homepage(page)
    const products = new Products(page)
    const productDetailsPage = new ProductDetails(page)

    await page.goto('/')
    expect(await homepage.logo.isVisible()).toBeTruthy()
    expect(await homepage.navBar.isVisible()).toBeTruthy()
    await homepage.productsButton.click()

    expect(await products.allProductsTitle.isVisible()).toBeTruthy()
    expect(await products.productsList.count()).toBeGreaterThan(0)

    await products.viewProductButton.first().click()
    expect(page.url()).toContain('https://www.automationexercise.com/product_details')

    expect (await productDetailsPage.productName.isVisible()).toBeTruthy()
    expect (await productDetailsPage.category.isVisible()).toBeTruthy()
    expect (await productDetailsPage.price.isVisible()).toBeTruthy()
    expect (await productDetailsPage.productName.isVisible()).toBeTruthy()
    expect (await productDetailsPage.availability.isVisible()).toBeTruthy()
    expect (await productDetailsPage.condition.isVisible()).toBeTruthy()
    expect (await productDetailsPage.brand.isVisible()).toBeTruthy()
})

test('Search Product', async({page})=>{
    const homepage = new Homepage(page)
    const products = new Products(page)
    const productDetailsPage = new ProductDetails(page)

    await page.goto('/')
    expect(await homepage.logo.isVisible()).toBeTruthy()
    expect(await homepage.navBar.isVisible()).toBeTruthy()
    await homepage.productsButton.click()

    expect(await products.allProductsTitle.isVisible()).toBeTruthy()
    expect(await products.productsList.count()).toBeGreaterThan(0)

    await products.searchField.fill('Winter')
    await products.submitSearch.click()
    const titles = await products.productTitle.allTextContents()
    titles.forEach(title => {
        expect(title).toContain('Winter')
    })

})
