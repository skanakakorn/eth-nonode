/* 
 * Sample code to run by nodejs for interacting with a contract.
 *
 * By Suttipong Kanakakorn
 *
 * API From
 * https://github.com/ethereum/go-ethereum/wiki/JavaScript-Console
 * https://github.com/ethereum/wiki/wiki/JavaScript-API
*/

if (typeof web3 == 'undefined') {
  // This is likely the case when running from nodejs
  var Web3 = require('web3');
  // set the provider you want from Web3.providers
  var web3 = new Web3(new
    Web3.providers.HttpProvider("http://192.168.56.102:8545"));
} 

accounts = web3.eth.accounts;
// unlock from_account 600 secs
web3.personal.unlockAccount(accounts[0],"password1",6000)
from_account = accounts[0];

// Replace the contract address with the one you created.
// This is not the account address
contract_address = "0xb4c125c560eae9820e3fab94768475ad2dfd06e6"

// replace this abi with the correct abi from the “Interface” output of online
// compiler.
abi = [{"constant":true,"inputs":[],"name":"getTweet","outputs":[{"name":"","type":"address"},{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getList","outputs":[{"name":"","type":"int256"},{"name":"","type":"string"}],"payable":false,"type":"function"}]

contract = web3.eth.contract(abi).at(contract_address)
result = contract.getList()
console.log('r ' + result)
console.log('r[0]' + result[0])
console.log('r[1]' + result[1])

result = contract.getTweet()
console.log('r ' + result)
console.log('r[0]' + result[0])
console.log('r[1]' + result[1])

// After certain period, the tx would be processed and we should get tx_receipt
// with the block number
console.log('Getting tx_receipt if block contained tx is mined. Ctrl-c is okay')
// This could be improve by callback when tx is mined rather than sleeping

setTimeout(function(){
tx_receipt = web3.eth.getTransactionReceipt(tx_hash)
console.log('Got tx_receipt :' + tx_receipt + 
            'block#: ' + tx_receipt.blockNumber)
console.log('Goto http://testnet.etherscan.io/block/' + 
              tx_receipt.blockNumber)
}, 3000);
