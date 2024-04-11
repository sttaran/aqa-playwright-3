import {expect as baseExpect, test as base} from "@playwright/test";
import {WelcomePage} from "../pageObjects/WelcomePage/WelcomePage.js";
import GaragePage from "../pageObjects/GaragePage/GaragePage.js";
import {ADMIN_STORAGE_STATE_PATH, USER_JOE_STORAGE_STATE_PATH} from "../constants.js";

export const loggedInAsAdmin = base.extend({
    welcomePage: async ({page}, use)=>{
        const welcomePage = new WelcomePage(page)
        await use(welcomePage)
    },
    garagePage: async ({browser}, use)=>{
        const ctx = await browser.newContext({
            storageState: ADMIN_STORAGE_STATE_PATH
        })
        const page = await ctx.newPage()
        const garagePage = new GaragePage(page)
        await garagePage.navigate()

        await use(garagePage)
    }
})

export const expect = baseExpect