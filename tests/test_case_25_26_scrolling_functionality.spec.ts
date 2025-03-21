import {test, expect} from '@playwright/test'
import { Homepage } from '../pages/homepage'

test('Verify Scroll Up using Arrow button and Scroll Down functionality', async({page})=>{
    const homepage = new Homepage(page)

    await page.goto('/')
    expect(await homepage.logo.isVisible()).toBeTruthy()
    expect(await homepage.navBar.isVisible()).toBeTruthy()

    await page.evaluate(()=> window.scrollTo(0, document.body.scrollHeight))
    expect(await homepage.subscriptionTitle.isVisible()).toBeTruthy()

    await homepage.scrollUpArrow.click()
    const carouselTitles = await homepage.carouselTitle
    await expect(carouselTitles.first()).toBeVisible()
})

test('Verify Scroll Up without Arrow button and Scroll Down functionality', async({page})=>{
    const homepage = new Homepage(page)

    await page.goto('/')
    expect(await homepage.logo.isVisible()).toBeTruthy()
    expect(await homepage.navBar.isVisible()).toBeTruthy()
    
    await page.evaluate(()=> window.scrollTo(0, document.body.scrollHeight))
    expect(await homepage.subscriptionTitle.isVisible()).toBeTruthy()

    await page.evaluate(()=> window.scrollTo(0, 0))
    const carouselTitles = await homepage.carouselTitle
    await expect(carouselTitles.first()).toBeVisible()
})