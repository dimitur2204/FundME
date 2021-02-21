import { Injectable } from '@angular/core';
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { Subject } from 'rxjs';
import { abi } from '../../../ethereum/build/CampaignFactory.json';
@Injectable({
  providedIn: 'root',
})
export class ContractService {
  web3js;
  provider;
  accounts;
  factory;
  web3Modal: Web3Modal;
  private address = '0x446915Cd44bBabB093A25672A3c8358820671005';

  private accountStatusSource = new Subject<any>();
  accountStatus$ = this.accountStatusSource.asObservable();

  constructor() {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          infuraId: '70e2c9850aca427c83c50c7b92ca314f', // required
        },
      },
    };

    this.web3Modal = new Web3Modal({
      network: 'rinkeby', // optional
      cacheProvider: true, // optional
      providerOptions, // required
      theme: {
        background: 'rgb(39, 49, 56)',
        main: 'rgb(199, 199, 199)',
        secondary: 'rgb(136, 136, 136)',
        border: 'rgba(195, 195, 195, 0.14)',
        hover: 'rgb(16, 26, 32)',
      },
    });
  }

  async connectAccount() {
    this.web3Modal.clearCachedProvider();
    this.provider = await this.web3Modal.connect(); // set provider
    this.web3js = new Web3(this.provider); // create web3 instance
    this.accounts = await this.web3js.eth.getAccounts();
    this.accountStatusSource.next(this.accounts);
  }

  async createCampaign(minAmount: number) {
    this.provider = await this.web3Modal.connect(); // set provider
    this.web3js = new Web3(this.provider); // create web3 instance
    this.accounts = await this.web3js.eth.getAccounts();

    this.factory = new this.web3js.eth.Contract(abi, this.address);

    const create = await this.factory.methods
      .createCampaign(100)
      .send({ from: this.accounts[0] });
    return create;
  }
}
