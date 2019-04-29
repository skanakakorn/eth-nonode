# Installing Truffle

Make sure you have NodeJS and npm [installed](./installation.md)
```
npm install -g truffle
```

# Getting Started with Smart Contracts on Truffle

We are going to use truffle to deploy and interact with [simple_token.sol](../token/simple_token.sol).

## Initialize truffle project

Make sure you have truffle installed. run:

```
mkdir truffle_project
cd truffle_project
truffle init
```

`truffle init` needs to be run against empty directory.

## Writing the Smart Contract

We can write any smart contracts in the `contracts` directory.
But right now let just copy [`token/simple_token.sol`](../token/simple_token.sol) into the `contracts` directory
and rename it to `Token.sol`

## Writing the migration script

We need to write the migration script in the `migrations` directory.
Migrations are run when we run `truffle migrate`.

Create new file `migrations/2_deploy_contracts.js` and paste this into the file.

```js
// require the contract
var Token = artifacts.require('./Token.sol')

module.exports = function(deployer) {
  // deploy the contract with the given constructor arguments
  deployer.deploy(Token, 4332, 'test token', 4, 'TST')
}
```

your project directory should now look like this
```
.
├── contracts
│   ├── Migrations.sol
│   └── Token.sol
├── migrations
│   ├── 1_initial_migration.js
│   └── 2_deploy_contracts.js
├── test
├── truffle-config.js
└── truffle.js
```

## Deploy the contract on the Truffle develop network

Start the network by running:
```
truffle develop
```
This will start the truffle develop server on `localhost:9545`, and start the truffle console.

You will see a list of accounts truffle have created for the development environment. The first account is the account truffle uses to deploy the `Token` contract.

Deploy the contracts by running `migrate` in truffle develop console:
```
truffle(develop)> migrate
```

You should see the address of the deployed contract similar to this
```
...

Running migration: 2_deploy_contracts.js
  Deploying Token...
  ... 0x83583df8770e999a55f87932789b731773b16c4492c08fa20c6153f3cd2fcfc6
  Token: 0x345ca3e014aaf5dca488057592ee47305d9b3e10
Saving successful migration to network...
  ... 0xf36163615f41ef7ed8f4a8f192149a0bf633fe1a2398ce001bf44c43dc7bdda0
Saving artifacts...

...
```
Keep the address of the deployed contract!

## Interact with the contract using the truffle console

Try calling a read-only function (no new transactions) using `.call()`

```
truffle(develop)> var tkc = Token.at('<your contract address>')
truffle(develop)> tkc.totalSupply.call().then(supply => supply.toNumber())
4332
```

Try calling a function that place new transactions. Use the account addresses you see when starting the truffle develop network.
```
truffle(develop)> tkc.transfer('<to account>', <value>, {from: '<first account address>'})
```

Check the value again to see if the transfer was successful.
```
truffle(develop)> tkc.balanceOf('<first account>').call().then(supply => supply.toNumber())
```

# Deploying the contract on other networks

Instead of the truffle develop network, we are going to deploy the Token contract to the geth dev node instead.

## Start the geth dev node

### Option 1: Start the node locally

Open another terminal and run:
```
./ge_linux_dev.sh console
```

### Option 2: Start in a docker container

```
cd dev-docker
docker-compose up -d
```

## Deploy the contract

Edit `truffle.js`, add a `networks` object so the file looks like this.
```js
module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    deveth: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*',
      gas: 1200000
    }
  }
};
```
We added a new network named `deveth` that is linked to `127.0.0.1:8545`

Edit the `migrations/2_deploy_contracts.js` to set the source contracts that will pay the fee.
```js
// require the contract
var Token = artifacts.require('./Token.sol')

module.exports = function(deployer, network) {
  // deploy the contract with the given constructor arguments
  if(network === 'develop') {
    deployer.deploy(Token, 4332, 'test token', 4, 'TST')
  } else if (network === 'deveth') {
    const source = '<source account>'
    web3.personal.unlockAccount(source, '<source account password>', 600)
    // for the dev eth network, add this line to sync the chain
    web3.eth.isSyncing(console.log)
    deployer.deploy(Token, 10000000000, 'test token', 6, 'TST', {from: source})
  }
}
```

You should see the address of the deployed Token contract, similar to when deploying to the truffle develop network.

## Interact with the deployed contract

We can run the truffle console to access contract abstractions to easier interact with the contract, run:
```
truffle console --network deveth
```

The command should bring up truffle console with `truffle(deveth)>` prompt text. Try calling the functions on the contract.

```
truffle(deveth)> var tkn = Token.at('<token address>')
truffle(deveth)> tkn.totalSupply.call().then(s => s.toNumber())
10000000000
```

Note that the Token contract we deployed implements the ERC20 token standard, you can use Metamask to interact with it 
(see [Using Metamask](./using-metamask.md)).

**Note: The truffle project directory is available at branch `truffle-project`.**