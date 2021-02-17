const assert = require('assert');
const ganache = require('ganache-core');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiledFactory = require('../build/CampaignFactory.json');
const compiledCampaign = require('../build/Campaign.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
	accounts = await web3.eth.getAccounts();

	factory = await new web3.eth.Contract(compiledFactory.abi)
		.deploy({ data: compiledFactory.evm.bytecode.object })
		.send({ from: accounts[0], gas: 2000000 });

	await factory.methods.createCampaign('100').send({
		from: accounts[0],
		gas: 1000000,
	});

	[campaignAddress] = await factory.methods.getDeployedCampaigns().call();

	campaign = await new web3.eth.Contract(compiledCampaign.abi, campaignAddress);
});

describe('Campaign', () => {
	it('deploys a factory and a campaign', () => {
		assert.ok(factory.options.address);
		assert.ok(campaign.options.address);
	});
	it('marks caller as the campaign manager', async () => {
		const manager = await campaign.methods.manager().call();
		assert.strictEqual(manager, accounts[0]);
	});
	it('allows people to contribute ether', async () => {
		const balanceBeforeContribute = await web3.eth.getBalance(campaignAddress);
		await campaign.methods.contribute().send({
			from: accounts[1],
			value: '200',
		});
		const balanceAfterContribute = await web3.eth.getBalance(campaignAddress);
		assert.ok(balanceAfterContribute - balanceBeforeContribute > 198);
	});
	it('adds contributors and marks them as approvers', async () => {
		await campaign.methods.contribute().send({
			from: accounts[1],
			value: '200',
		});
		assert.ok(await campaign.methods.approvers(accounts[1]).call());
	});
	it('should require minimum contribution of 100 wei and does not add to approvers', async () => {
		try {
			await campaign.methods.contribute().send({
				from: accounts[1],
				value: '55',
			});
			assert(false);
		} catch (error) {
			assert.ok(!(await campaign.methods.approvers(accounts[1]).call()));
		}
	});
	it('allows manager to make a payment request', async () => {
		await campaign.methods
			.createRequest('Test description', 200, accounts[2])
			.send({ from: accounts[0], gas: 2000000 });
		const request = await campaign.methods.requests(0).call();
		assert.strictEqual(request.description, 'Test description');
		assert.strictEqual(request.value, '200');
	});
	it('proccesses request fully', async () => {
		await campaign.methods.contribute().send({
			from: accounts[1],
			value: web3.utils.toWei('2', 'ether'),
		});

		await campaign.methods
			.createRequest(
				'Test Description',
				web3.utils.toWei('1', 'ether'),
				accounts[2]
			)
			.send({ from: accounts[0], gas: 2000000 });

		await campaign.methods.approveRequest(0).send({
			from: accounts[1],
			gas: '2000000',
		});

		await campaign.methods.finalizeRequest(0).send({
			from: accounts[0],
			gas: '2000000',
		});

		const balance = parseFloat(
			web3.utils.fromWei(await web3.eth.getBalance(accounts[2]), 'ether')
		);
		assert(balance >= 101);
	});
});
