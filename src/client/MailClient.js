import {request} from "@playwright/test";
import MailTrapMessagesController from "../controllers/mailtrap/MailTrapMessagesController.js";
import MailTrapInboxesController from "../controllers/mailtrap/MailTrapInboxesController.js";
import MailTrapAccountsController from "../controllers/mailtrap/MailTrapAccountsController.js";


export default class MailClient {
    constructor(req) {
        this.request = req;
        this.accounts = new MailTrapAccountsController(req);
        this.inboxes = new MailTrapInboxesController(req);
        this.messages = new MailTrapMessagesController(req);
    }

    static async init() {
        const req = await request.newContext({
            baseURL: 'https://mailtrap.io',
            extraHTTPHeaders: {
                'Api-Token': "381d242a41eca07960c1643494234725"
            }
        });

        return new MailClient(req);
    }
}