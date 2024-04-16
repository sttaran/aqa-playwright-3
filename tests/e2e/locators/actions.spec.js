import {test} from "@playwright/test";

// class Locator {
//     constructor(selector) {
//         this.selextor = selector
//     }
// }
//
// new Locator("selcr")


test.describe("Locators", ()=>{
    test.beforeEach(async ({page})=>{
        await page.goto("")
    })

    test("page.locator actions", async ({page})=>{
        const signInBtn = page.locator('button', {hasText: 'Sign In'})
        await signInBtn.click()

        const popup = page.locator('app-signin-modal')
        const emailInput = popup.locator('#signinEmail')

        await page.pause()

        // await emailInput.focus()
        // await emailInput.blur()
        await emailInput.fill("test@test.com")

        await emailInput.clear()
        await emailInput.pressSequentially("test@test.com", {delay: 100})

        await page.pause()

        // page.locator('[data-testid="directions"]')
        // page.getByTestId('directions')
    })
})

