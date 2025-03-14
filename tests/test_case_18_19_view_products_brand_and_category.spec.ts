import {test, expect} from '@playwright/test'
import { Homepage } from '../pages/homepage'
import { Products } from '../pages/productsPage'

test('View Category Products', async({page})=>{
    const homepage = new Homepage(page)

    await page.goto('/')
    expect(await homepage.categories.isVisible()).toBeTruthy()
    expect(await homepage.categories.textContent()).toBe('Category')
    await homepage.womanCategory.click()
    await homepage.womanCategoryOptions.locator('text=Dress').click()
    expect(await homepage.categoryTitle.textContent()).toBe('Women - Dress Products')
    await homepage.manCategory.click()
    await homepage.manCategoryOptions.locator('text=Tshirts ').click()
    expect(await homepage.categoryTitle.textContent()).toBe('Men - Tshirts Products')
})

test('View & Cart Brand Products', async({page})=>{
    const homepage = new Homepage(page)
    const productsPage = new Products(page)

    await page.goto('/')
    await homepage.productsButton.click()

    expect(await productsPage.brandsSideBar.isVisible()).toBeTruthy()
    const brandName = await productsPage.brandsList.nth(1).evaluate(element =>{
        return element.childNodes[0]?.textContent?.trim() || ''
    })
    await productsPage.brandsList.nth(1).click()
    const brandTitle = await productsPage.brandTitle.textContent()
    expect(brandTitle).toContain(brandName)
})