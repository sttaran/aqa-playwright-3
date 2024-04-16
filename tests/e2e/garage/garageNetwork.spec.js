import { test, expect} from '../../src/fixtures/userFixtures.js'


test.describe('Garage (network)', () => {
    test('should display error when no Authorization token has been provided', async ({garagePage, page}) => {
        await expect(garagePage.addCarButton).toBeVisible()

        await page.route('/api/users/profile',async (route)=>{
            const headers = route.request().headers();
            delete headers['referer'];
            headers["X-My-HEADER"] = "Hello world"
            await route.continue({ headers });
        })

        await page.locator('a[routerlink="profile"]').click()
    });
})
