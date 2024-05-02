import {expect} from '@playwright/test';

export default class MailTrapInboxesController {
	INBOXES_LIST_PATH = `api/accounts/1351662/inboxes`;

	constructor(request) {
		this._request = request;
	}

	async getAllInboxes(){
		const res = await this._request.get(this.INBOXES_LIST_PATH);
		expect(res.ok()).toBe(true);
		return res.json();
	}
}
