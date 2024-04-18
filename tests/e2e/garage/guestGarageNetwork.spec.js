import { test, expect} from '../../../src/fixtures/guestFixtures.js'
import {BRANDS_MOCK_RESPONSE} from "./fixtures/brands.js";
import {MODELS_MOCK_BY_ID} from "./fixtures/models.js";



test.describe('Garage (network)', () => {
    test('should display correct values', async ({garagePage, page}) => {
        await page.route('/api/cars/brands', (route)=>{
            return route.fulfill({
                status: 200,
                body: JSON.stringify(BRANDS_MOCK_RESPONSE)
            })
        })

        await page.route('/api/cars/models?carBrandId=*', async (route, request)=>{
            const url = new URL(request.url())
            const {searchParams} = url

            const body = JSON.stringify(MODELS_MOCK_BY_ID[searchParams.get('carBrandId')])

            return route.fulfill({
                status: 200,
                body
            })
        })

        await garagePage.addCarButton.click()

        await page.pause()
    });

    test('should display error when no Authorization token has been provided', async ({garagePage, page}) => {
        await page.route('/api/cars/brands',async (route)=>{
            const headers = route.request().headers();
            delete headers['X-Secret'];
            await route.continue({ headers });
        })


        await garagePage.addCarButton.click()

        await page.pause()
    });
})
