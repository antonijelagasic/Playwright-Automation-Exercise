import { Page } from "@playwright/test"

export class Homepage {
    page: Page

    constructor (page: Page){
        this.page = page
    }

    get logo(){
        return this.page.locator('.logo.pull-left')
    }
    get navBar(){
        return this.page.locator('.navbar-nav')
    }
    get categories(){
        return this.page.locator('.left-sidebar h2').first()
    }
    get womanCategory(){
        return this.page.locator('.category-products [href="#Women"]')
    }
    get womanCategoryOptions(){
        return this.page.locator('#Women li a')
    }
    get categoryTitle(){
        return this.page.locator('.features_items h2.title.text-center')
    }
    get manCategory(){
        return this.page.locator('.category-products [href="#Men"]')
    }
    get manCategoryOptions(){
        return this.page.locator('#Men li a')
    }
    get productsButton(){
        return this.page.locator('[href="/products"]')
    }
    get cartButton(){
        return this.page.locator('[href="/view_cart"] .fa-shopping-cart')
    }
    get signUpLoginButton(){
        return this.page.locator('.nav [href="/login"]')
    }
    get testCaseButton(){
        return this.page.locator('[href="/test_cases"] .fa-list')
    }
    get apiTestingButton(){
        return this.page.locator('[href="/api_list"] .fa-list')
    }
    get contactUsOption(){
        return this.page.locator('[href="/contact_us"]')
    }
    get logoutButton(){
        return this.page.locator('[href="/logout"]')
    }
    get deleteButton(){
        return this.page.locator('[href="/delete_account"]')
    }
    get accountDeletedNotification(){
        return this.page.locator('[data-qa="account-deleted"]')
    }
    get subscriptionTitle(){
        return this.page.locator('.single-widget h2')
    }
    get subrscribeEmailField(){
        return this.page.locator('#susbscribe_email')
    }
    get subrscribeButton(){
        return this.page.locator('.fa.fa-arrow-circle-o-right')
    }
    get successSubcribeNotification(){
        return this.page.locator('#success-subscribe')
    }
    get footer(){
        return this.page.locator('#footer')
    }
    get recommendedItemsSection(){
        return this.page.locator('.recommended_items')
    }
    get recommendedItemsTitle(){
        return this.page.locator('.recommended_items h2.title')
    }
    get addToCartRecommendedItem(){
        return this.page.locator('.recommended_items .add-to-cart')
    }
    get viewCartButton(){
        return this.page.locator('.modal-content [href="/view_cart"]')
    }
    get recommendedItemName(){
        return this.page.locator('#recommended-item-carousel .productinfo p')
    }
    get scrollUpArrow(){
        return this.page.locator('#scrollUp')
    }
    get carouselTitle(){
        return this.page.locator('.carousel-inner h2')
    }

}