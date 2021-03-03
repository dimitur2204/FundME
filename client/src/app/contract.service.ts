import { Injectable } from '@angular/core';
import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { Observable, of, Subject } from 'rxjs';
import { abi } from '../../../ethereum/build/CampaignFactory.json';
@Injectable({
  providedIn: 'root',
})
export class ContractService {
  web3js;
  provider;
  accounts: String[];
  factory;
  web3Modal: Web3Modal;
  private factoryAddress = '0x446915Cd44bBabB093A25672A3c8358820671005';

  private accountStatusSource = new Subject<any>();
  accountStatus$ = this.accountStatusSource.asObservable();

  constructor() {
    this.accounts = [];
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
        background: 'rgb(255, 255, 255)',
        main: 'rgb(63, 81, 181)',
        secondary: 'rgb(255, 64, 129)',
        border: 'rgba(255, 255, 255, 0.14)',
        hover: 'rgb(233, 233, 233)',
      },
    });
  }

  async connectAccount() {
    this.web3Modal.clearCachedProvider();
    this.provider = await this.web3Modal.connect(); // set provider
    this.web3js = new Web3(this.provider); // create web3 instance
    this.accounts = await this.web3js.eth.getAccounts();
    return this.accounts;
  }

  async createCampaign(minAmount: number) {
    this.factory = new this.web3js.eth.Contract(abi, this.factoryAddress);

    const create = await this.factory.methods
      .createCampaign(minAmount)
      .send({ from: this.accounts[0] });
    return create;
  }

  async getDeployedCampaigns(): Promise<String[]> {
    this.factory = new this.web3js.eth.Contract(abi, this.factoryAddress);

    const adresses: String[] = await this.factory.methods
      .getDeployedCampaigns()
      .call();

    return adresses;
  }
}
