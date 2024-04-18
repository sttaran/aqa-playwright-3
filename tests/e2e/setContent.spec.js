import {test} from "@playwright/test";


test("set content", async ({page})=>{
        await page.goto('about:blank')
        // should contain list and buttons
       const htmlContent = `
        <div>
            <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
            </ul>
            <button>Click me</button>
            <button>Click me</button>
        </div>
       `

        await page.setContent(htmlContent)
        await page.pause()
})