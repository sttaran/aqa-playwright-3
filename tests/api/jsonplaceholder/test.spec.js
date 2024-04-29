import {expect, test} from "@playwright/test";


test("test", async ({request})=>{
  const response = await request.get("https://jsonplaceholder.typicode.com/posts")
  const body = await response.json()
  expect(response.status()).toBe(200)
  expect(body.length).toBe(100)
})