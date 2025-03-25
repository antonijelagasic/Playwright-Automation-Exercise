import {test, expect} from '@playwright/test'
import { Homepage } from '../pages/homepage'
import { ProductsPage } from '../pages/productsPage'
import { ProductDetailsPage } from '../pages/productDetailsPage'
import * as testData from '../test_data/user_ana.json'

test('Add review on product', async({page}) =>{
    const homepage = new Homepage(page)
    const productsPage = new ProductsPage(page)
    const productDetailsPage = new ProductDetailsPage(page)
    const user_ana = testData.user

    await page.goto('/')
    await homepage.productsButton.click()
    expect(await productsPage.allProductsTitle.isVisible()).toBeTruthy()
    expect(await productsPage.productsList.count()).toBeGreaterThan(0)
    await productsPage.viewProductButton.first().click()

    expect(await productDetailsPage.writeYourReviewTitle.isVisible()).toBeTruthy()
    await productDetailsPage.addReview(user_ana.name, user_ana.email, user_ana.reviewText)
    expect(await productDetailsPage.reviewNotification.isVisible()).toBeTruthy()
})