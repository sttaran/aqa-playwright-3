import {test, expect, request as apiRequest} from "../../../src/fixtures/userFixtures.js";
import {MODELS} from "../../../src/data/models.js";
import {BRANDS} from "../../../src/data/brands.js";
import moment from "moment";
import axios from 'axios';
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';
import config from "../../../config/config.js";
import {USERS} from "../../../src/data/users.js";


test.describe("Cars API", ()=>{
    test.describe("Create with PW", ()=>{
        let request

        test.beforeEach(async ()=>{
            request = await apiRequest.newContext()
            await request.post(`/api/auth/signin`,{
                data: {
                    "email": USERS.JOE_DOU.email,
                    "password": USERS.JOE_DOU.password,
                    "remember": false
                }
            })
        })

        test.afterAll(async ()=>{
            const carsResponse = await request.get('/api/cars')
            const cars = await carsResponse.json()

            await Promise.all(
                cars.data.map((car) => request.delete(`/api/cars/${car.id}`))
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
                    const response = await request.post('/api/cars', {
                        data: requestBody
                    })

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

test.describe("Cars API", ()=>{
    test.describe("Create wih jar", ()=>{
        let request

        test.beforeAll(async ()=>{
            const jar = new CookieJar();
            request = wrapper(axios.create({
                jar,
                baseURL: config.baseUrl,
                validateStatus: (status) => {
                    return status <= 500
                }
            }))

            await request.post(`${config.baseUrl}api/auth/signin`,{
                    "email": USERS.JOE_DOU.email,
                    "password": USERS.JOE_DOU.password,
                    "remember": false
                })
        })

        test.afterAll(async ()=>{
            const carsResponse = await request.get('/api/cars')
            const cars = await carsResponse.data

            await Promise.all(
                cars.data.map((car) => request.delete(`/api/cars/${car.id}`))
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
                    const response = await request.post('/api/cars', requestBody)

                    const body = response.data
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

                    expect(response.status).toBe(201)
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

test.describe("Cars API", ()=>{
    test.describe("Create", ()=>{
        let request

        test.beforeAll(async ()=>{
            const loginResponse = await axios.post(`${config.baseUrl}api/auth/signin`,{
                "email": USERS.JOE_DOU.email,
                "password": USERS.JOE_DOU.password,
                "remember": false
        })

            console.log(loginResponse)

            const cookie = loginResponse.headers.get('set-cookie')[0].split(';')[0]
            request = axios.create({
                baseURL: config.baseUrl,
                headers: {
                    "Cookie": cookie
                },
                validateStatus: (status) => {
                    return status <= 500
                }
            })
        })

        test.afterAll(async ()=>{
            const carsResponse = await request.get('/api/cars')
            const cars = await carsResponse.data

            await Promise.all(
                cars.data.map((car) => request.delete(`/api/cars/${car.id}`))
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
                    const response = await request.post('/api/cars', requestBody)

                    const body = response.data
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

                    expect(response.status).toBe(201)
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