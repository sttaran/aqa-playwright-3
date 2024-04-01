import {expect, test} from "@playwright/test";
import {USERS} from "../../src/data/users.js";
import {WelcomePage} from "../../src/pageObjects/WelcomePage/WelcomePage.js";


test.describe("Auth", ()=>{
    test.describe("Login", ()=>{
        test.describe("Positive scenarios", ()=>{
            test.beforeEach(async ({page})=>{
                await page.goto('')
            })

            test("user should be able to login", async ({page})=>{
                const signInBtn = page.locator('button', {hasText: 'Sign In'})
                await signInBtn.click()

                const popup = page.locator('app-signin-modal')
                const emailInput = popup.locator('#signinEmail')
                const passwordInput = popup.locator("#signinPassword")
                const loginButton = popup.locator('.btn-primary')

                await emailInput.fill(USERS.JOE_DOU.email)
                await passwordInput.fill(USERS.JOE_DOU.password)
                await loginButton.click()

                await expect(page, "User should be redirected to garage page").toHaveURL(/garage/)
            })
        })

        test.describe("Negative scenarios", ()=>{
            test.beforeEach(async ({page})=>{
                await page.goto('')
            })

            test("validation for empty email", async ({page})=>{
                const signInBtn = page.locator('button', {hasText: 'Sign In'})
                await signInBtn.click()

                const popup = page.locator('app-signin-modal')
                const emailInput = popup.locator('#signinEmail')
                const emailInputErrorMessage = popup.locator('#signinEmail + .invalid-feedback')
                const passwordInput = popup.locator("#signinPassword")
                const loginButton = popup.locator('.btn-primary')

                await emailInput.focus()
                await emailInput.blur()
                await passwordInput.fill(USERS.JOE_DOU.password)

                await expect(emailInputErrorMessage).toHaveText("Email required")
                await expect(emailInput).toHaveCSS("border-color", "rgb(220, 53, 69)")
                await expect(loginButton, "Login button should be disabled").toBeDisabled()
            })


            test("validation for empty password", async ({page})=>{
                const signInBtn = page.locator('button', {hasText: 'Sign In'})
                await signInBtn.click()

                const popup = page.locator('app-signin-modal')
                const emailInput = popup.locator('#signinEmail')
                const passwordInput = popup.locator("#signinPassword")
                const passwordInputErrorMessage = popup.locator('#signinPassword + .invalid-feedback')
                const loginButton = popup.locator('.btn-primary')

                await emailInput.fill(USERS.JOE_DOU.email)
                await passwordInput.focus()
                await passwordInput.blur()

                await expect(passwordInputErrorMessage).toHaveText("Email required")
                await expect(passwordInput).toHaveCSS("border-color", "rgb(220, 53, 69)")
                await expect(loginButton, "Login button should be disabled").toBeDisabled()
            })
        })
    })
})

test.describe.only("Auth (POM)", ()=>{
    test.describe.only("Login", ()=>{
        let popup

        test.describe("Positive scenarios", ()=>{
            test.beforeEach(async ({page})=>{
                const  welcomePage = new WelcomePage(page)
                await welcomePage.navigate()
                popup = await welcomePage.openSignInPopup()
            })

            test("user should be able to login", async ({page})=>{
                await popup.emailInput.fill(USERS.JOE_DOU.email)
                await popup.passwordInput.fill(USERS.JOE_DOU.password)
                await popup.signInButton.click()

                await expect(page, "User should be redirected to garage page").toHaveURL(/garage/)
            })
        })

        test.describe("Negative scenarios", ()=>{
            test.beforeEach(async ({page})=>{
                const welcomePage = new WelcomePage(page)
                await welcomePage.navigate()
                popup = await welcomePage.openSignInPopup()
                await popup.waitLoaded()
            })

            test("validation for empty email", async ()=>{
                await popup.emailInput.focus()
                await popup.emailInput.blur()
                await popup.passwordInput.fill(USERS.JOE_DOU.password)

                await expect(popup.emailInputErrorMessage).toHaveText("Email required")
                await expect(popup.emailInput).toHaveCSS("border-color", "rgb(220, 53, 69)")
                await expect(popup.signInButton, "Login button should be disabled").toBeDisabled()
            })


            test("validation for empty password", async ()=>{
                await popup.emailInput.fill(USERS.JOE_DOU.email)
                await popup.passwordInput.focus()
                await popup.passwordInput.blur()

                await expect(popup.passwordInputErrorMessage).toHaveText("Password required")
                await expect(popup.passwordInput).toHaveCSS("border-color", "rgb(220, 53, 69)")
                await expect(popup.signInButton, "Login button should be disabled").toBeDisabled()
            })
        })
    })
})