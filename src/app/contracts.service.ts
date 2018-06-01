import * as web3 from './web3/dist/web3';
import { Injectable } from '@angular/core';

//const Web3 = require('web3');
declare let require: any;
declare let window: any;

//let tokenAbi = require('./tokenContract.json');

@Injectable()
export class ContractsService {
	private _account: string = null;
	private _web3: any;

	private _tokenContract: any;
	private _tokenContractAddress: string = "0xbc84f3bf7dd607a37f9e5848a6333e6c188d926c";

	private _HttpProviderURL: string = "http://localhost:8545";

	constructor() { 
		if (typeof window.web3 !== 'undefined') {
			this._web3 = window.web3;
		} else {
			this._web3 = web3;
		}

		this._web3.setProvider(new this._web3.providers.HttpProvider(this._HttpProviderURL));

		//this._tokenContract = this._web3.eth.contract(tokenAbi).at(this._tokenContractAddress);
	}
	public async getAccount(): Promise<string> {
		if (this._account == null) {
			this._account = await new Promise((resolve, reject) => {
				this._web3.eth.getAccounts((err, accs) => {
					if (err != null) {
						alert('There was an error fetching your accounts.');
						return;
					}

					if (accs.length === 0) {
						alert(
							'Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.'
							);
						return;
					}
					resolve(accs[0]);
				})
			}) as string;

			this._web3.eth.defaultAccount = this._account;
		}

		return Promise.resolve(this._account);
	}
	public getAccountBalance(address: string): number{
		return this._web3.eth.getBalance(address);
	}
	public getAccountTransactions(address: string): any{
		return this._web3.eth.getTransaction(address);
	}
	public async getUserBalance(): Promise<number> {
		let account = await this.getAccount();

		return new Promise((resolve, reject) => {
			let _web3 = this._web3;
			this._tokenContract.balanceOf.call(account, function (err, result) {
				if(err != null) {
					reject(err);
				}

				resolve(_web3.fromWei(result));
			});
		}) as Promise<number>;
	}

}
