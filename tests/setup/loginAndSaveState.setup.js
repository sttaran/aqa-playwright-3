import {test as setup} from "@playwright/test";
import {WelcomePage} from "../../src/pageObjects/WelcomePage/WelcomePage.js";
import {expect} from "../../src/fixtures/adminFixtures.js";
import {ADMIN_STORAGE_STATE_PATH, USER_JOE_STORAGE_STATE_PATH} from "../../src/constants.js";

setup.describe('Setup', ()=>{
    setup("Login and Save as JOE", async({page})=>{
        const welcomePage = new WelcomePage(page)
        await welcomePage.navigate()
        const signInPopup = await welcomePage.openSignInPopup()
        await signInPopup.emailInput.fill('aqa-staran-1@test.com');
        await signInPopup.passwordInput.fill('Qwerty12345');
        await signInPopup.signInButton.click()

        await expect(page).toHaveURL(/garage/)

        await page.context().storageState({
            path: USER_JOE_STORAGE_STATE_PATH
        })
    })

    // setup("Login and Save as ADMIN", async({page})=>{
    //     const welcomePage = new WelcomePage(page)
    //     await welcomePage.navigate()
    //     const signInPopup = await welcomePage.openSignInPopup()
    //     await signInPopup.emailInput.fill('aqa-staran-1@test.com');
    //     await signInPopup.passwordInput.fill('Qwerty12345');
    //     await signInPopup.signInButton.click()
    //
    //     await expect(page).toHaveURL(/garage/)
    //
    //     await page.context().storageState({
    //         path: ADMIN_STORAGE_STATE_PATH
    //     })
    // })
})