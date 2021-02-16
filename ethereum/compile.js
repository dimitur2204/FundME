const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');

//Delete build folder if it exists
const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

//Read all the contracts from the contracts
const campaginPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaginPath, 'utf-8');

const input = {
	language: 'Solidity',
	sources: {
		'Campaign.sol': {
			content: source,
		},
	},
	settings: {
		outputSelection: {
			'*': {
				'*': ['*'],
			},
		},
	},
};

const output = JSON.parse(solc.compile(JSON.stringify(input))).contracts['Campaign.sol'];

fs.ensureDirSync(buildPath);
Object.keys(output).forEach((key) => {
	fs.outputJSONSync(path.resolve(buildPath, key + '.json'), output[key]);
});
