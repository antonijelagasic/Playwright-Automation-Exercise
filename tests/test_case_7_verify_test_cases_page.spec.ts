import {test, expect} from '@playwright/test'
import { Homepage } from '../pages/homepage'
import { TestCasesPage } from '../pages/testCasesPage'
import { TRUE } from '../constants/helperConstants'
import * as testCaseSteps from '../test_data/test_case_1_steps.json'

test('verify steps of first test case', async ({page}) => {
    const homepage = new Homepage(page)
    const testCasesPage = new TestCasesPage(page)
    const test_case_steps = testCaseSteps

    await page.goto('/')
    expect(await homepage.logo.isVisible()).toBe(TRUE)
    expect(await homepage.navBar.isVisible()).toBe(TRUE)
    await homepage.testCaseButton.click()

    expect(await testCasesPage.title.isVisible()).toBe(TRUE)
    
    const list = await testCasesPage.testCasesList.count()
    expect(list).toBe(26)

    await testCasesPage.firstTestCase.click()
    console.log(test_case_steps)
    for (let i = 1; i <= Object.keys(test_case_steps).length; i++) {
        const stepText = test_case_steps[`step${i}`]
        if (stepText) {
            await expect(page.locator(`#collapse1 .list-group-item:has-text("${stepText}")`)).toContainText(stepText)
        } else {
            console.log(`Error: step${i} is undefined`)
        }
    }
})