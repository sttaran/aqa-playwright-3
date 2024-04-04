import {test} from "@playwright/test";


test.only("new tab", async ({page})=>{
        await page.goto('https://translate.google.com/?hl=en&tab=TT&sl=en&tl=uk&op=websites')
        await page.locator('[type="url"]').fill('https://www.google.com')

        const newTabPromise = page.context().waitForEvent('page')
        await page.locator('[aria-label="Translate website"]').click()
        const newPage = await newTabPromise

        await page.pause()

        await page.bringToFront()

        await page.pause()
        await page.close()

        await newPage.bringToFront()
})