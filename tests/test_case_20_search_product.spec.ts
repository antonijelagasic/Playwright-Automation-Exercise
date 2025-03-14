import {test, expect} from '@playwright/test'
import { Homepage } from '../pages/homepage'
import { Products } from '../pages/productsPage'

test('Remove Products From Cart', async({page})=>{
    const homepage = new Homepage(page)
    const productsPage = new Products(page)

    await page.goto('/')
    await homepage.productsButton.click()
    expect(await productsPage.allProductsTitle.isVisible()).toBeTruthy()
    expect(await productsPage.productsList.count()).toBeGreaterThan(0)

    await productsPage.searchField.fill('blue')
    await productsPage.submitSearch.click()

    expect(await productsPage.searchedProductsTitle.isVisible()).toBeTruthy()
    expect(await productsPage.searchedProductsTitle.textContent()).toBe('Searched Products')
    const titles = await productsPage.productTitle.allTextContents()
    titles.forEach(title => {
        expect(title.toLowerCase()).toContain('blue')
    })
})