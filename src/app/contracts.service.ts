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
	private _tokenContractAddress: string = "0x4A21A23e52bD9e8E6D113351DD1C79D6e80D3559";

	private _maintainanceAddress = [ { "constant": false, "inputs": [ { "name": "id", "type": "uint256" }, { "name": "description", "type": "string" } ], "name": "updateContractDescription", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "id", "type": "uint256" }, { "name": "rate", "type": "uint256" } ], "name": "updateTemplateRate", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "allTemplates", "outputs": [ { "name": "description", "type": "string" }, { "name": "rate", "type": "uint256" }, { "name": "recurring", "type": "bool" }, { "name": "perUnitRate", "type": "bool" }, { "name": "recurringBy", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "id", "type": "uint256" }, { "name": "rate", "type": "uint256" } ], "name": "updateContractRate", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "id", "type": "uint256" }, { "name": "status", "type": "string" } ], "name": "updateContractStatus", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "id", "type": "uint256" } ], "name": "getTemplate", "outputs": [ { "name": "description", "type": "string" }, { "name": "rate", "type": "uint256" }, { "name": "recurring", "type": "bool" }, { "name": "perUnitRate", "type": "bool" }, { "name": "recurringBy", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "id", "type": "uint256" }, { "name": "recurring", "type": "bool" } ], "name": "updateTemplateRecurring", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "description", "type": "string" }, { "name": "rate", "type": "uint256" }, { "name": "recurring", "type": "bool" }, { "name": "perUnitRate", "type": "bool" }, { "name": "recurringBy", "type": "string" } ], "name": "createTemplate", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "id", "type": "uint256" }, { "name": "provider", "type": "string" } ], "name": "updateContractProvider", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "id", "type": "uint256" }, { "name": "perUnitRate", "type": "bool" } ], "name": "updateTemplatePerUnitRate", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "id", "type": "uint256" }, { "name": "date", "type": "string" } ], "name": "updateContractDate", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "id", "type": "uint256" } ], "name": "deleteContract", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "id", "type": "uint256" } ], "name": "getContract", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "id", "type": "uint256" }, { "name": "recurrenceNo", "type": "uint256" } ], "name": "updateContractRecurringNo", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [ { "name": "", "type": "address", "value": "0x4a21a23e52bd9e8e6d113351dd1c79d6e80d3559" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "id", "type": "uint256" }, { "name": "description", "type": "string" } ], "name": "updateTemplateDescription", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "id", "type": "uint256" } ], "name": "acceptContract", "outputs": [ { "name": "", "type": "bool" } ], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [ { "name": "id", "type": "uint256" }, { "name": "recurringBy", "type": "string" } ], "name": "updateTemplateRecurringBy", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "editor", "outputs": [ { "name": "", "type": "address", "value": "0x4a21a23e52bd9e8e6d113351dd1c79d6e80d3559" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "id", "type": "uint256" }, { "name": "name", "type": "string" } ], "name": "updateContractName", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "rate", "type": "uint256" }, { "name": "unit", "type": "uint256" }, { "name": "owner", "type": "address" } ], "name": "createContract", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "uint256" } ], "name": "allContracts", "outputs": [ { "name": "status", "type": "string" }, { "name": "id", "type": "uint256" }, { "name": "rate", "type": "uint256" }, { "name": "unit", "type": "uint256" }, { "name": "owner", "type": "address" }, { "name": "client", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "id", "type": "uint256" }, { "name": "unit", "type": "uint256" } ], "name": "updateContractUnit", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "newOwner", "type": "address" } ], "name": "transferOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "id", "type": "uint256" } ], "name": "deleteTemplate", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "description", "type": "string" }, { "indexed": false, "name": "rate", "type": "uint256" }, { "indexed": false, "name": "recurring", "type": "bool" }, { "indexed": false, "name": "perUnitRate", "type": "bool" }, { "indexed": false, "name": "recurringBy", "type": "string" } ], "name": "NewTemplate", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "status", "type": "string" }, { "indexed": false, "name": "id", "type": "uint256" }, { "indexed": false, "name": "rate", "type": "uint256" }, { "indexed": false, "name": "unit", "type": "uint256" }, { "indexed": false, "name": "owner", "type": "address" }, { "indexed": false, "name": "client", "type": "address" } ], "name": "newContract", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "description", "type": "string" }, { "indexed": false, "name": "rate", "type": "uint256" }, { "indexed": false, "name": "recurring", "type": "bool" }, { "indexed": false, "name": "perUnitRate", "type": "bool" }, { "indexed": false, "name": "recurringBy", "type": "string" } ], "name": "UpdateTemplate", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "status", "type": "string" }, { "indexed": false, "name": "id", "type": "uint256" }, { "indexed": false, "name": "rate", "type": "uint256" }, { "indexed": false, "name": "unit", "type": "uint256" }, { "indexed": false, "name": "owner", "type": "address" }, { "indexed": false, "name": "client", "type": "address" } ], "name": "UpdateContractCore", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "id", "type": "uint256" }, { "indexed": false, "name": "recurrenceNo", "type": "uint256" }, { "indexed": false, "name": "provider", "type": "string" }, { "indexed": false, "name": "description", "type": "string" }, { "indexed": false, "name": "name", "type": "string" }, { "indexed": false, "name": "date", "type": "string" } ], "name": "updateContractDetail", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "id", "type": "uint256" }, { "indexed": false, "name": "owner", "type": "address" }, { "indexed": false, "name": "client", "type": "address" } ], "name": "contractAccepted", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "previousOwner", "type": "address" }, { "indexed": true, "name": "newOwner", "type": "address" } ], "name": "OwnershipTransferred", "type": "event" } ];

	private _HttpProviderURL: string = "http://localhost:8545";


	public txNumber: number;

	constructor() { 
		if (typeof window.web3 !== 'undefined') {
			this._web3 = window.web3;
		} else {
			this._web3 = web3;
		}

		this._web3.setProvider(new this._web3.providers.HttpProvider(this._HttpProviderURL));

		//this._tokenContract = this._web 3.eth.contract(tokenAbi).at(this._tokenContractAddress);
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
	public getAccountBalance(address: string): any{
		return this._web3.eth.getBalance(address);
	}
	
	
	public createAccount(): any{
		return this._web3.eth.create();	
	}
	public getAccountTransactions(address: string): any{
		let currentTXnumber = this._web3.eth.blockNumber;
		this.txNumber = currentTXnumber;
		let recentTransactions: Array<any> = [];
		for(let i = 0; i < 100 && currentTXnumber - i >= 0; i++){
			let transactions = this._web3.eth.getTransactionFromBlock(currentTXnumber - i);
			if(transactions&&(transactions.to == address || transactions.from == address)){
				recentTransactions.push(transactions);
			}
		}
		return recentTransactions;

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


	public async register(username: string, name: string, company: string, address: string): Promise<any> {
	    let contract = new this._web3.eth.contract(this._maintainanceAddress);
	    console.log('contract', contract);
	    console.log('address', address);
	    let registerObj = contract.at(this.ACCOUNT_CONTRACT_ADDRESS);
	    console.log('register', registerObj);

	    registerObj.register(username, name, company).call({from: address}).then((result) => {
	      console.log(result);
	    });
	    // return Promise.resolve(registerObj.register(username, name, company).call({from: address}));
  	}

	  public async createContract(id: number): Promise<any> {
		    let contract = new this._web3.eth.contract(this._maintainanceAddress);
		    console.log('contract', contract);
		    console.log('address', address);
		    let registerObj = contract.at(this.ACCOUNT_CONTRACT_ADDRESS);
		    console.log('register', registerObj);

		   	contract.methods.createContract(number)
		        .send({ from: userAccount, value: web3.utils.toWei("0.001", "ser") })
		        .on("receipt", function(receipt) {
		          console.log(receipt);
		        })
		        .on("error", function(error) {
		          console.log(error);

		        });	
		    // return Promise.resolve(registerObj.register(username, name, company).call({from: address}));
	  }
}
