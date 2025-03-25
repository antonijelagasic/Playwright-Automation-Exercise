import {test, expect} from '@playwright/test'
import { Homepage } from '../pages/homepage'
import { TestCasesPage } from '../pages/testCasesPage'
import * as testCaseSteps from '../test_data/test_case_1_steps.json'

test('verify steps of first test case', async ({page}) => {
    const homepage = new Homepage(page)
    const testCasesPage = new TestCasesPage(page)
    const test_case_steps = testCaseSteps

    await page.goto('/')
    expect(await homepage.logo.isVisible()).toBeTruthy()
    expect(await homepage.navBar.isVisible()).toBeTruthy()
    await homepage.testCaseButton.click()

    expect(await testCasesPage.title.isVisible()).toBeTruthy()
    
    const list = await testCasesPage.testCasesList.count()
    expect(list).toBe(26)

    await testCasesPage.firstTestCase.click()

    for (let i = 1; i <= Object.keys(test_case_steps).length; i++) {
        const stepText = test_case_steps[`step${i}`]
        await expect(page.locator(`#collapse1 .list-group-item:has-text("${stepText}")`))
    }
})