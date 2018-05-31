import { Injectable } from '@angular/core';
import { ContractTemplate } from '../interfaces/contract-template';

@Injectable()
export class DaoService {

  private account: {
    address: string,
    name: string,
    isProvider: boolean
  };

  constructor() {
    this.init();
    this.getAccount();
  }

  private init = function() {
    this.account = {
      address: "",
      name: "",
      isProvider: false
    };
  };

  public getAccount = function() {
    var account = JSON.parse(localStorage.getItem("WINDFORCE_ACCOUNT"));
    if(account) {
      this.account = account;
      return this.account;
    } else {
      return null;
    }
  };

  public setAccount = function(address: string, name: string, isProvider: boolean) {
    this.account.address = address;
    this.account.name = name;
    this.account.isProvider = isProvider;

    localStorage.setItem("WINDFORCE_ACCOUNT", JSON.stringify(this.account));
  };

  private checkLogin = function() {
    console.log('this.address', this.address);
    if(this.account.address) {
      return true;
    } else {
      return false;
    }
  };

  private clear = function() {
    this.init();
    localStorage.clear();
  };

}
