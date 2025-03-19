import {test, expect} from '@playwright/test'
import { Homepage } from '../pages/homepage'
import { Cart } from '../pages/cartPage'

test('Add to cart from Recommended items', async({page})=>{
    const homepage = new Homepage(page)
    const cartPage = new Cart(page)

    await page.goto('/')
    await homepage.recommendedItemsSection.scrollIntoViewIfNeeded()
    expect(await homepage.recommendedItemsTitle.isVisible()).toBeTruthy()
    await homepage.addToCartRecommendedItem.first().waitFor({state: 'visible'})
    const recommendedItemName = await homepage.recommendedItemName.first().textContent()
    await homepage.addToCartRecommendedItem.first().click()
    await homepage.viewCartButton.click()

    const cartItemName = await cartPage.name.textContent()
    expect(recommendedItemName).toBe(cartItemName)
})