import web from './web3';
import { abi } from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
	JSON.parse(abi),
	'0x446915Cd44bBabB093A25672A3c8358820671005'
);

export default instance;
