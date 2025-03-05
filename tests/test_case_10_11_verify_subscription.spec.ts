import {test, expect} from '@playwright/test'
import { Homepage } from '../pages/homepage'
import { Cart } from '../pages/cartPage'
import * as testData from '../test_data/user_ana.json'

test('Verify Subscription in home page', async({page})=>{
    const homepage = new Homepage(page)
    const user_ana = testData.user

    await page.goto('/')
    expect(await homepage.logo.isVisible()).toBeTruthy()
    expect(await homepage.navBar.isVisible()).toBeTruthy()

    await homepage.footer.scrollIntoViewIfNeeded()
    expect(await homepage.subscriptionTitle.isVisible()).toBeTruthy()
    await homepage.subrscribeEmailField.fill(user_ana.email)
    await homepage.subrscribeButton.click()
    expect(await homepage.successSubcribeNotification.isVisible()).toBeTruthy()
})

test.only('Verify Subscription in Cart page', async({page})=>{
    const homepage = new Homepage(page)
    const cartPage = new Cart(page)
    const user_ana = testData.user

    await page.goto('/')
    expect(await homepage.logo.isVisible()).toBeTruthy()
    expect(await homepage.navBar.isVisible()).toBeTruthy()

    await homepage.cartButton.click()
    await cartPage.footer.scrollIntoViewIfNeeded()
    expect(await cartPage.subscriptionTitle.isVisible()).toBeTruthy()
    await cartPage.subrscribeEmailField.fill(user_ana.email)
    await cartPage.subrscribeButton.click()
    expect(await cartPage.successSubcribeNotification.isVisible()).toBeTruthy()
})