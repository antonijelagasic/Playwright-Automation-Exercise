import {test, expect} from '@playwright/test'
import { Homepage } from '../pages/homepage'
import{ AuthPage} from '../pages/authPage'
import { ProductsPage } from '../pages/productsPage'
import{ CartPage} from '../pages/cartPage'
import * as testData from '../test_data/user_ana.json'

test('Search Products and Verify Cart After Login', async({page})=>{
    const homepage = new Homepage(page)
    const authPage = new AuthPage(page)
    const productsPage = new ProductsPage(page)
    const cartPage = new CartPage(page)
    const user_ana = testData.user

    await page.goto('/')
    await homepage.productsButton.click()
    expect(await productsPage.allProductsTitle.isVisible()).toBeTruthy()
    expect(await productsPage.productsList.count()).toBeGreaterThan(0)

    await productsPage.searchProductsByText('blue')

    expect(await productsPage.searchedProductsTitle.isVisible()).toBeTruthy()
    expect(await productsPage.searchedProductsTitle.textContent()).toBe('Searched Products')
    const titles = await productsPage.productTitle.allTextContents()
    titles.forEach(title => {
        expect(title.toLowerCase()).toContain('blue')
    })

    const products = await productsPage.product.all()
    const numberOfSearchedProducts = products.length
    for (let i =0; i < products.length; i++){
        console.log()
        await productsPage.product.nth(i).hover()
        await page.waitForTimeout(500)
        
        const addToCartButton = productsPage.addToCartHoverButton.nth(i)
        await addToCartButton.scrollIntoViewIfNeeded()
        await addToCartButton.waitFor({ state: 'visible', timeout: 5000 })
        await addToCartButton.click()

        await productsPage.continueShoppingButton.click()
    }
    await homepage.cartButton.click()

    const numberOfCartItems = await cartPage.cartItem.count()
    expect(numberOfSearchedProducts).toBe(numberOfCartItems)

    const cartItemsNames = (await cartPage.name.allTextContents()).map(name => name.toLowerCase())
    for(let i = 0; i < cartItemsNames.length; i++){
        expect(cartItemsNames.some(name => name.includes('blue'))).toBeTruthy()
    }

    await homepage.signUpLoginButton.click()
    expect(page.url()).toBe('https://www.automationexercise.com/login')
    expect(await authPage.loginForm.isVisible()).toBeTruthy()
    await authPage.emailLoginField.fill(user_ana.loginEmail)
    await authPage.passwordLoginField.fill(user_ana.password)
    await authPage.loginButton.click()

    await expect(authPage.loggedInAs).toBeVisible()
    const expectedText = `Logged in as ${user_ana.name}`
    expect(await authPage.loggedInAs.textContent()).toContain(expectedText)

    await homepage.cartButton.click()
    expect(numberOfSearchedProducts).toBe(numberOfCartItems)
    for(let i = 0; i < cartItemsNames.length; i++){
        expect(cartItemsNames.some(name => name.includes('blue'))).toBeTruthy()
    }
})