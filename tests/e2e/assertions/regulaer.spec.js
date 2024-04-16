import {test, expect} from "@playwright/test";

test.describe("Assertions", ()=>{
    test.beforeEach(async ({page})=>{
        await page.goto("")
    })

    test("regular", async ({page})=>{
        const inputEmailString ="test@test.com"

        const signInBtn = page.locator('button', {hasText: 'Sign In'})
        await signInBtn.click()

        const popup = page.locator('app-signin-modal')
        const emailInput = popup.locator('#signinEmail')

        await emailInput.fill(inputEmailString)

        const emailValue = await emailInput.inputValue()
        expect(emailValue).toBe(inputEmailString)
    })

    test("web first assertions", async ({page})=>{
        const inputEmailString ="test@test.com"

        const signInBtn = page.locator('button', {hasText: 'Sign In'})
        await signInBtn.click()

        const popup = page.locator('app-signin-modal')
        const emailInput = popup.locator('#signinEmail')

        await expect(emailInput, "email input should be visible after I opened signin popup").toBeVisible()
        await expect(emailInput).toBeEnabled()
        await expect(emailInput).toBeEditable()

        await emailInput.fill(inputEmailString)

        await expect(emailInput).toHaveValue(inputEmailString)
    })

    test("screenshots", async ({page})=>{
        const inputEmailString ="test@test.com"

        const signInBtn = page.locator('button', {hasText: 'Sign In'})
        await signInBtn.click()

        const popup = page.locator('app-signin-modal')
        const emailInput = popup.locator('#signinEmail')

        await expect(emailInput, "email input should be visible after I opened signin popup").toBeVisible()
        await expect(emailInput).toBeEnabled()
        await expect(emailInput).toBeEditable()

        await emailInput.fill(inputEmailString)

        await expect(emailInput).toHaveValue(inputEmailString)
        await expect(emailInput).toHaveScreenshot("email-input.png")
    })

    test("regular 2", async ({page})=>{
        expect("hello", "Two strings should be equal").toBe("hello")

        expect({a: 1}).toEqual({a: 1})
        expect([{a: 1}]).toEqual([{a: 1}])

        expect({a: 1, b: 2}).toMatchObject({b: 2})
        expect({a: 1, b: 2}).toMatchObject({a: 1})
    })
})

