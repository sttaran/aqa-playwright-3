import {test, expect, request as apiRequest} from "../../../src/fixtures/userFixtures.js";


test.describe("Cars API", ()=>{

    test("should return valid brands", async({request})=>{
        const response = await request.get('/api/cars/brands')
        const body = await response.json()

        console.log(body)
    })

    test("should return user's cars", async({request})=>{
        const response = await request.get('/api/cars')
        await expect(response).toBeOK()

        const body = await response.json()

        console.log(body)
    })

    test("get", async ({request})=>{
        const res = await request.get('api/cars/models', {
            params: {
                filter: JSON.stringify(["author", "date"])
            }
        })
    })

    test("should return 401", async()=>{
        const request = await apiRequest.newContext()
        const response = await request.get('/api/cars')
        await expect(response).not.toBeOK()
        expect(response.status()).toBe(401)
        expect(await response.json()).toEqual({ status: 'error', message: 'Not authenticated' })
    })
})