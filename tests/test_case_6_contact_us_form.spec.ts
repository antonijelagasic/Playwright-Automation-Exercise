import {test, expect} from '@playwright/test'
import { Homepage } from '../pages/homepage'
import { ContactUs } from '../pages/contactUsPage'
import * as testData from '../test_data/user_ana.json'
import path from 'path'

test('verify sending contact us form', async({page}) => {
    const homepage = new Homepage(page)
    const contactUsPage = new ContactUs(page)
    const user_ana = testData.user
    const filePath = path.resolve(__dirname, '../test_data/test-image.jpg')

    await page.goto('/')
    expect(await homepage.logo.isVisible()).toBeTruthy()
    expect(await homepage.navBar.isVisible()).toBeTruthy()
    await homepage.contactUsOption.click()

    expect (await contactUsPage.getInTouchTitle.isVisible()).toBeTruthy()
    await contactUsPage.nameField.fill(user_ana.name)
    await contactUsPage.emailField.fill(user_ana.email)
    await contactUsPage.subjectField.fill('subject title')
    await contactUsPage.messageField.fill('some message in the field')
    await contactUsPage.uploadButton.setInputFiles(filePath)
    await contactUsPage.submitButton.click()

})