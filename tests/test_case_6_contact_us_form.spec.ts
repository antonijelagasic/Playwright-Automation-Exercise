import {test, expect} from '@playwright/test'
import { Homepage } from '../pages/homepage'
import { ContactUsPage } from '../pages/contactUsPage'
import { TRUE } from '../constants/helperConstants'
import { SUBJECT_TITLE, MESSAGE_FIELD } from '../constants/contactUsPageConstants'
import * as testData from '../test_data/user_ana.json'
import path from 'path'

test('verify sending contact us form', async({page}) => {
    const homepage = new Homepage(page)
    const contactUsPage = new ContactUsPage(page)
    const user_ana = testData.user
    const filePath = path.resolve(__dirname, '../test_data/test-image.jpg')

    await page.goto('/')
    expect(await homepage.logo.isVisible()).toBe(TRUE)
    expect(await homepage.navBar.isVisible()).toBe(TRUE)
    await homepage.contactUsOption.click()

    expect (await contactUsPage.getInTouchTitle.isVisible()).toBe(TRUE)
    await contactUsPage.nameField.fill(user_ana.name)
    await contactUsPage.emailField.fill(user_ana.email)
    await contactUsPage.subjectField.fill(SUBJECT_TITLE)
    await contactUsPage.messageField.fill(MESSAGE_FIELD)
    await contactUsPage.uploadButton.setInputFiles(filePath)
    await contactUsPage.submitButton.click()

})