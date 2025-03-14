import {test, expect} from '@playwright/test'
import { Homepage } from '../pages/homepage'
import { Products } from '../pages/productsPage'
import { Cart } from '../pages/cartPage'
import * as testData from '../test_data/user_ana.json'

test('View Category Products', async({page})=>{
    const homepage = new Homepage(page)
    const productsPage = new Products(page)
    const cartPage = new Cart(page)

    await page.goto('/')
    

})