import { Page } from "@playwright/test"

export class ProductsPage {
    page: Page

    constructor(page: Page){
        this.page = page
    }

    get brandsSideBar(){
        return this.page.locator('.brands_products')
    }
    get brandsList(){
        return this.page.locator('.brands-name li a')
    }
    get brandTitle(){
        return this.page.locator('.features_items h2.title')
    }
    get product(){
        return this.page.locator('.single-products')
    }
    get productPrice(){
        return this.page.locator('.single-products .productinfo h2')
    }
    get productName(){
        return this.page.locator('.single-products .productinfo p')
    }
    get addToCartButton(){
        return this.page.locator('.single-products .productinfo .add-to-cart')
    }
    get addToCartHoverButton(){
        return this.page.locator('.overlay-content .add-to-cart')
    }
    get continueShoppingButton(){
        return this.page.locator('.btn-success')
    }
    get viewCartButton(){
        return this.page.locator('.modal-body [href="/view_cart"]')
    }

    get allProductsTitle(){
        return this.page.locator('h2.title.text-center')
    }
    get productsSection(){
        return this.page.locator('.features_items')
    }
    get productsList(){
        return this.page.locator('.single-products')
    }
    get productTitle(){
        return this.page.locator('.productinfo.text-center p')
    }
    get viewProductButton(){
        return this.page.locator('.choose')
    }
    get searchField(){
        return this.page.locator('#search_product')
    }
    get submitSearch(){
        return this.page.locator('#submit_search')
    }
    get searchedProductsTitle(){
        return this.page.locator('.features_items h2.title')
    }

    //
    async searchProductsByText(text: string): Promise<void> {
        await this.searchField.fill(text)
        await this.submitSearch.click()
    }

}