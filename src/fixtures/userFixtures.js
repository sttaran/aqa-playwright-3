import {expect as baseExpect, request as baseRequest, test as base} from "@playwright/test";
import {WelcomePage} from "../pageObjects/WelcomePage/WelcomePage.js";
import GaragePage from "../pageObjects/GaragePage/GaragePage.js";
import {ADMIN_STORAGE_STATE_PATH, USER_JOE_STORAGE_STATE_PATH} from "../constants.js";

export const test = base.extend({
    welcomePage: async ({page}, use)=>{
        const welcomePage = new WelcomePage(page)
        await use(welcomePage)
    },
    request: async ({}, use)=>{
        const req = await request.newContext({
            storageState: USER_JOE_STORAGE_STATE_PATH
        })
        await use(req)

        await req.dispose()
    },
    page: async ({browser}, use)=>{
        const ctx = await browser.newContext({
            storageState: USER_JOE_STORAGE_STATE_PATH
        })
        const page = await ctx.newPage()

        await use(page)

        await ctx.close()
    },
    garagePage: async ({page}, use)=>{
        const garagePage = new GaragePage(page)
        await garagePage.navigate()

        await use(garagePage)
    },
})

export const expect = baseExpect

export const request = baseRequest