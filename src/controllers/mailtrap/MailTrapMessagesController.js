import {expect} from '@playwright/test';
import moment from 'moment';

export default class MailTrapMessagesController {
	MESSAGES_LIST_PATH = `/api/accounts/1351662/inboxes/{inboxId}/messages`;

	MESSAGE_HTML_PATH = `/api/accounts/1351662/inboxes/{inboxId}/messages/{messageId}/body.html`;

	MESSAGE_HTML_SOURCE_PATH = `/api/accounts/1351662/inboxes/{inboxId}/messages/{messageId}/body.htmlsource`;

	MESSAGE_TEXT_PATH = `/api/accounts/1351662/inboxes/{inboxId}/messages/{messageId}/body.txt`;

	MESSAGE_INFO_PATH = `/api/accounts/1351662/inboxes/{inboxId}/messages/{messageId}`;


	constructor(request) {
		this._request = request;
	}

	async getMessageInfo(messageId, inboxId = "1892431"){
		const res = await this._request.get(
			this.MESSAGE_INFO_PATH.replace('{inboxId}', inboxId).replace('{messageId}', String(messageId))
		);
		expect(res.ok()).toBe(true);
		return res.text();
	}

	async getAllMessages(inboxId = "1892431"){
		const res = await this._request.get(this.MESSAGES_LIST_PATH.replace('{inboxId}', inboxId));
		expect(res.status(), 'Response for request messages should have status code 200').toBe(200);
		return res.json();
	}

	async getMessageByRecipientEmail(emailAddress, inboxId ="1892431"){
		const data = await this.getAllMessages(inboxId);
		const message = data.find((item) => item.to_email === emailAddress);
		if (!message) {
			throw new Error(`Message with recipient address "${emailAddress}" not found in the inbox`);
		}

		return message;
	}

	async waitForMessage(
		emailAddress,
		subject,
		dateAfter,
		inboxId,
		maxRetry = 15,
		delay = 6000
	){
		let retry = 0;
		let message

		while (retry < maxRetry) {
			const data = await this.getAllMessages(inboxId);
			const messageList = data.filter((item) => item.to_email === emailAddress);
			// console.log(messageList)
			if (!messageList.length) {
				await new Promise((resolve) => setTimeout(resolve, delay));
				retry++;
				continue;
			}

			for (const m of messageList) {
				if (typeof subject === 'string') {
					if (subject.trim() !== m.subject.trim()) {
						continue;
					}

					if (moment(dateAfter).isAfter(moment(m.created_at))) {
						continue;
					}

					message = m;
					return message;
				}

				if (subject instanceof RegExp) {
					if (!subject.test(m.subject)) {
						continue;
					}

					if (moment(dateAfter).isAfter(moment(m.created_at))) {
						continue;
					}

					message = m;
					return message;
				}
			}

			await new Promise((resolve) => setTimeout(resolve, delay));
			retry++;
		}

		throw new Error(
			`Message with recipient address "${emailAddress}" and subject "${subject}" with seding time after ${moment(
				dateAfter
			).format()} not found in the inbox`
		);
	}

	async getMessageSourceHtml(messageId, inboxId ='1892431') {
		const res = await this._request.get(
			this.MESSAGE_HTML_SOURCE_PATH.replace('{inboxId}', inboxId).replace('{messageId}', String(messageId))
		);
		expect(res.ok()).toBe(true);
		return res.text();
	}

	async getMessageFormattedHtml(messageId, inboxId = '1892431') {
		const res = await this._request.get(
			this.MESSAGE_HTML_PATH.replace('{inboxId}', inboxId).replace('{messageId}', String(messageId))
		);
		expect(res.ok()).toBe(true);
		return res.text();
	}
}
