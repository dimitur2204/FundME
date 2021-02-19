import { Inject, Injectable } from '@angular/core';
import Web3 from 'web3';
import { WEB3 } from './web3';
import { abi } from '../../../ethereum/build/CampaignFactory.json';
@Injectable({
  providedIn: 'root',
})
export class FactoryService {
  private address = '0x446915Cd44bBabB093A25672A3c8358820671005';
  instance;

  constructor(@Inject(WEB3) private web3: Web3) {
    this.instance = new this.web3.eth.Contract(abi as any, this.address);
  }
}
