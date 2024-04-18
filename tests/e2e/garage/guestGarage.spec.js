import { test, expect} from '../../../src/fixtures/guestFixtures.js'



test.describe('Garage (fixtures)', () => {
    test('created car should be saved to session storage', async ({garagePage, page}) => {
        await expect(garagePage.addCarButton).toBeVisible();

        await garagePage.addCarButton.click()

        const brand = 'Audi'
        const model = 'R8'

        await page.locator("#addCarBrand").selectOption(brand)
        await page.locator("#addCarModel").selectOption(model)
        await page.locator("#addCarMileage").fill('123')
        await page.locator('.modal-content  .btn-primary').click()

        console.log("hello from playwright")

        await page.waitForTimeout(2000)
        const guestData = await page.evaluate(()=> window.sessionStorage.getItem('guestData'))
        const parsedGuestData = JSON.parse(guestData)

        expect(parsedGuestData.cars.length).toBe(1)
        const car = parsedGuestData.cars[0]
        expect(car.brand).toBe(brand)
        expect(car.model).toBe(model)

        const newCar = structuredClone(car)
        newCar.id = car.id + 1

        const newSessionStorageValue = JSON.stringify({
            ...parsedGuestData,
            cars: [car, newCar]
        })

        await page.evaluate((value)=> window.sessionStorage.setItem('guestData', value), newSessionStorageValue)

        await page.pause()
    });
})
