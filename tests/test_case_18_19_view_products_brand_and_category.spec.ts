import {test, expect} from '@playwright/test'
import { Homepage } from '../pages/homepage'
import { ProductsPage } from '../pages/productsPage'
import { TRUE } from '../constants/helperConstants'
import { CATEGORY_TITLE, WOMAN_DRESS_PRODUCTS, MEN_T_SHIRTS_PRODUCTS } from '../constants/productConstants'

test('View Category Products', async({page})=>{
    const homepage = new Homepage(page)

    await page.goto('/')
    expect(await homepage.categories.isVisible()).toBe(TRUE)
    expect(await homepage.categories.textContent()).toBe(CATEGORY_TITLE)
    await homepage.womanCategory.click()
    await homepage.womanCategoryOptions.locator('text=Dress').click()
    expect(await homepage.categoryTitle.textContent()).toBe(WOMAN_DRESS_PRODUCTS)
    await homepage.manCategory.click()
    await homepage.manCategoryOptions.locator('text=Tshirts ').click()
    expect(await homepage.categoryTitle.textContent()).toBe(MEN_T_SHIRTS_PRODUCTS)
})

test('View & Cart Brand Products', async({page})=>{
    const homepage = new Homepage(page)
    const productsPage = new ProductsPage(page)

    await page.goto('/')
    await homepage.productsButton.click()

    expect(await productsPage.brandsSideBar.isVisible()).toBe(TRUE)
    const brandName = await productsPage.brandsList.nth(1).evaluate(element =>{
        return element.childNodes[0]?.textContent?.trim() || ''
    })
    await productsPage.brandsList.nth(1).click()
    const brandTitle = await productsPage.brandTitle.textContent()
    expect(brandTitle).toContain(brandName)
})