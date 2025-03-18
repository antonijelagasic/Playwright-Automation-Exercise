import {test, expect} from '@playwright/test'
import { Homepage } from '../pages/homepage'
import { Products } from '../pages/productsPage'
import { ProductDetails } from '../pages/productDetailsPage'
import * as testData from '../test_data/user_ana.json'

test('Add review on product', async({page}) =>{
    const homepage = new Homepage(page)
    const productsPage = new Products(page)
    const productDetailsPage = new ProductDetails(page)
    const user_ana = testData.user

    await page.goto('/')
    await homepage.productsButton.click()
    expect(await productsPage.allProductsTitle.isVisible()).toBeTruthy()
    expect(await productsPage.productsList.count()).toBeGreaterThan(0)
    await productsPage.viewProductButton.first().click()

    expect(await productDetailsPage.writeYourReviewTitle.isVisible()).toBeTruthy()
    await productDetailsPage.nameField.fill(user_ana.name)
    await productDetailsPage.emailField.fill(user_ana.email)
    await productDetailsPage.reviewField.fill('Review text')
    await productDetailsPage.submitReview.click()
    expect(await productDetailsPage.reviewNotification.isVisible()).toBeTruthy()
})