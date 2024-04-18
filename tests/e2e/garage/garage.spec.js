import {loggedInAsAdmin as test, expect} from '../../../src/fixtures/adminFixtures.js'
import {WelcomePage} from "../../../src/pageObjects/WelcomePage/WelcomePage.js";
import GaragePage from "../../../src/pageObjects/GaragePage/GaragePage.js";


test.describe('Garage (fixtures)', () => {

    test('add car button should be visible', async ({garagePage, page}) => {
        await expect(garagePage.addCarButton).toBeVisible();
       await  page.pause()
    });

    test('should be able to open the garage', async ({garagePage}) => {
        await expect(garagePage.addCarButton).toBeVisible();
    });
})

test.describe('Garage', () => {
    let welcomePage
    let garagePage

        test.beforeEach(async ({page}) => {
            welcomePage = new WelcomePage(page)
            await welcomePage.navigate()
            const signInPopup = await welcomePage.openSignInPopup()
            await signInPopup.emailInput.fill('aqa-staran-1@test.com');
            await signInPopup.passwordInput.fill('Qwerty12345');
            await signInPopup.signInButton.click()

            await expect(page).toHaveURL(/garage/)
            garagePage = new GaragePage(page)
        })

      test('should be able to open the garage', async ({page}) => {
              await expect(garagePage.addCarButton).toBeVisible();
      });
})