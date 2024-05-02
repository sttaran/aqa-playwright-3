import {test} from "@playwright/test";
import DBClient from "../../../src/client/DBClient.js";

test.describe('DBClient', () => {
    let dbClient;
    test.beforeEach(async () => {
      dbClient = await DBClient.connect();
    })

    test('guery users', async () => {
        const [users] = await dbClient.users.getUsers();
        console.log(users);
    })

    test('by id', async () => {
        const [user] = await dbClient.users.getUserById(1);
        console.log(user);
    })
})
