import {test, expect, request as apiRequest} from "../../../src/fixtures/userFixtures.js";
import {MODELS} from "../../../src/data/models.js";
import {BRANDS} from "../../../src/data/brands.js";
import moment from "moment";
import {USER_JOE_STORAGE_STATE_PATH} from "../../../src/constants.js";
import CarController from "../../../src/controllers/CarsContoller.js";


test.describe("Cars API", ()=>{
    test.describe("Create with Controller", ()=>{
        let carsController

        test.beforeEach(async ({request})=>{
            carsController = new CarController(request)
        })

        test.afterAll(async ()=>{
            const request = await apiRequest.newContext({
                storageState: USER_JOE_STORAGE_STATE_PATH
            })

            carsController = new CarController(request)

            const carsResponse = await carsController.getUserCars()
            const cars = await carsResponse.json()

            await Promise.all(
                cars.data.map((car) => carsController.deleteCar(car.id))
            )
        })

        test("create car", async ()=>{
            const brand = BRANDS.Audi

            for (const model of Object.values(MODELS[brand.id])) {

                await test.step(`Create car with brand "${brand.title}" and model ${model.title}`, async ()=>{
                    const requestBody = {
                        "carBrandId": brand.id,
                        "carModelId": model.id,
                        "mileage": Math.floor(Math.random() * 100)
                    }

                    const startTime = new Date()
                    const response = await carsController.createCar(requestBody)
                    const body = await response.json()

                    const expected = {
                        "id": expect.any(Number),
                        "carBrandId": requestBody.carBrandId,
                        "carModelId": requestBody.carModelId,
                        "initialMileage": requestBody.mileage,
                        "updatedMileageAt": expect.any(String),
                        "carCreatedAt": expect.any(String),
                        "mileage": requestBody.mileage,
                        "brand": brand.title,
                        "model": model.title,
                        "logo": brand.logoFilename
                    }

                    expect(response.status()).toBe(201)
                    expect(body.status).toBe('ok')
                    expect(body.data).toEqual(expected)

                    // const now = new Date()
                    // expect(moment(body.data.updatedMileageAt).isAfter(startTime), "updatedMileageAt should be valid").toBe(true)
                    // expect(moment(body.data.updatedMileageAt).isBefore(now), "updatedMileageAt should be valid").toBe(true)

                    expect(moment(body.data.updatedMileageAt).diff(startTime, 'seconds')).toBeLessThanOrEqual(2)
                    expect(moment(body.data.carCreatedAt).diff(startTime, 'seconds')).toBeLessThanOrEqual(3)
                })
            }
        })
    })
})