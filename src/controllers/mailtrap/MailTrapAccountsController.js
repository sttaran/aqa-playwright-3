import { expect} from '@playwright/test';

export default class MailTrapAccountsController {
	ACCOUNTS_LIST_PATH = '/api/accounts';

	constructor(request) {
		this._request = request;
	}

	async getAllAccounts(){
		const res = await this._request.get(this.ACCOUNTS_LIST_PATH);
		expect(res.ok()).toBe(true);
		return res.json();
	}
}
