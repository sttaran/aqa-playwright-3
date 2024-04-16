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

    test("page.locator", async ({page})=>{
        const guestLoginBtn = page.locator('.header-link.-guest')
        await guestLoginBtn.click()

        // page.locator('[data-testid="directions"]')
        // page.getByTestId('directions')
    })

    test("page.locator hasText", async ({page})=>{
        const guestLoginBtn = page.locator('button', {hasText: 'Guest log in'})
        const button = page.getByRole('button', {name: 'Guest log in'})
        const btn = page.getByText('Guest log in')

        await guestLoginBtn.click()

        // div > div > div > div > div > div "Guest log in"
        const divWithText = page.locator('div', {hasText: 'Guest log in'})
        const divWithTxt = page.getByText('Guest log in')
    })

    test("page.locator has", async ({page})=>{
        const guestLoginBtn = page.locator('button', {hasText: 'Guest log in'})
        const headerRight = page.locator('header div div div.align-items-center', {has: guestLoginBtn})
        // const headerRight = page.locator('header div div div.align-items-center', {has: page.locator('button', {hasText: 'Guest log in'})})
    })

    test("page.locator filter", async ({page})=>{
        const headerBlocks = page.locator('header div div div.align-items-center')

        const leftBlock = headerBlocks.filter({
            hasText: 'About'
            // hasText: /^1$/
        })

        const guestLoginBtn = page.locator('button', {hasText: 'Guest log in'})
        const rightBlock = headerBlocks.filter({has: guestLoginBtn})

    })

    test("page.locator hasText 2", async ({page})=>{
        const headerRight = page.locator('header div.header_right')

        const btn = headerRight.locator('button', {hasText: 'Guest log in'})
    })


    test('multiple elements in locator', async({page})=>{
        const buttons = page.locator('header button')
        const count = await buttons.count()
        console.log(count)

        for (let i = 0; i < count; i++) {
            const text = await buttons.nth(i).innerText()
            console.log(text)
        }

        // const text = await buttons.allInnerTexts()
        // console.log(text)
    })

    test('multiple elements in locator 2', async({page})=>{
        const buttons = page.locator('header button')

        for (const button of await buttons.all()) {
            const text = await button.innerText()
            console.log(text)
        }
    })
})

