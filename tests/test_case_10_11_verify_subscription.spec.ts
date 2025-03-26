import {test, expect} from '@playwright/test'
import { Homepage } from '../pages/homepage'
import { CartPage } from '../pages/cartPage'
import { TRUE } from '../constants/helperConstants'
import * as testData from '../test_data/user_ana.json'

test('Verify Subscription in home page', async({page})=>{
    const homepage = new Homepage(page)
    const user_ana = testData.user

    await page.goto('/')
    expect(await homepage.logo.isVisible()).toBe(TRUE)
    expect(await homepage.navBar.isVisible()).toBe(TRUE)

    await homepage.footer.scrollIntoViewIfNeeded()
    expect(await homepage.subscriptionTitle.isVisible()).toBe(TRUE)
    await homepage.subrscribeEmailField.fill(user_ana.email)
    await homepage.subrscribeButton.click()
    expect(await homepage.successSubcribeNotification.isVisible()).toBe(TRUE)
})

test('Verify Subscription in Cart page', async({page})=>{
    const homepage = new Homepage(page)
    const cartPage = new CartPage(page)
    const user_ana = testData.user

    await page.goto('/')
    expect(await homepage.logo.isVisible()).toBe(TRUE)
    expect(await homepage.navBar.isVisible()).toBe(TRUE)

    await homepage.cartButton.click()
    await cartPage.footer.scrollIntoViewIfNeeded()
    expect(await cartPage.subscriptionTitle.isVisible()).toBe(TRUE)
    await cartPage.subrscribeEmailField.fill(user_ana.email)
    await cartPage.subrscribeButton.click()
    expect(await cartPage.successSubcribeNotification.isVisible()).toBe(TRUE)
})