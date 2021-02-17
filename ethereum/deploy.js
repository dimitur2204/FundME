const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { abi, evm } = require('./build/CampaignFactory.json');
const bytecode = evm.bytecode.object;
const MNEUMONIC =
	'nice delay insane confirm now smoke glance suspect that require rare common';
const INFURA_RINKEBY_URL =
	'https://rinkeby.infura.io/v3/1b1ab249ee5c46388ba4c38a39e43d07';

const provider = new HDWalletProvider(MNEUMONIC, INFURA_RINKEBY_URL);
const web3 = new Web3(provider);

(async () => {
	const accounts = await web3.eth.getAccounts();

	console.log('Attempting to deploy from accounts', accounts[0]);

	const result = await new web3.eth.Contract(abi)
		.deploy({
			data: bytecode,
		})
		.send({
			gas: '2000000',
			from: accounts[0],
		});
	console.log('Contract deployed to', result.options.address);
})();
