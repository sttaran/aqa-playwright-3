import MailClient from "../../../src/client/MailClient.js";
import {test} from "@playwright/test";
import moment from "moment";

test.describe('Mail API', () => {

    test.only('should get all messages', async () => {
        const mailClient = await MailClient.init()
        const dateAfter = moment().set('year', 2023).set('month', 4).set("date", 20).set('hours', 17).set('minute', 30)
        console.log(dateAfter.toDate())
        // const messageSentTime = new Date()
        // await ..
        const message = await mailClient.messages.waitForMessage("bugbeateruser@test.com", /Welcome to BugBeater.io!/, dateAfter.toDate())
        const html = await mailClient.messages.getMessageSourceHtml(message.id)

        const regex = /<a[^>]*href=.*<\/a>/g;

        const matches = html.matchAll(regex);

        console.log(matches)
    })
})