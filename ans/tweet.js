/* 
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

var argv = require('minimist')(process.argv.slice(2));

console.log(argv)
from_address_index = argv['from_index']
if (! from_address_index) {
  from_address_index = 0
  console.log("Using address index " + from_address_index) 
}
msg_array = argv['_']
msg = msg_array[0]
if (! msg) {
  console.log('Usage --from_idx address_index "message"') 
  process.exit(1)
}

accounts = web3.eth.accounts;
// unlock from_account 600 secs
web3.personal.unlockAccount(accounts[from_address_index],"",6000)
from_account = accounts[from_address_index];
console.log("Using account: " + from_account)

// Replace the contract address with the one you created.
// This is not the account address
tweet_contract_address = "0x7f4340494634395d2501e7a75487da032648f6b5"

// replace this abi with the correct abi from the “Interface” output of online
// compiler.
tweet_abi = [{"constant":true,"inputs":[],"name":"getOwnerAddress","outputs":[{"name":"adminAddress","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getLatestTweet","outputs":[{"name":"tweetString","type":"string"},{"name":"numberOfTweets","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"isAdmin","outputs":[{"name":"isAdmin","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"tweetId","type":"uint256"}],"name":"getTweet","outputs":[{"name":"tweetString","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getNumberOfTweets","outputs":[{"name":"numberOfTweets","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"tweetString","type":"string"}],"name":"tweet","outputs":[{"name":"result","type":"int256"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":false,"name":"s","type":"string"},{"indexed":false,"name":"_tweetCount","type":"uint256"}],"name":"Tweet","type":"event"}]

tweet_contract = web3.eth.contract(tweet_abi).at(tweet_contract_address)
tx_hash = tweet_contract.tweet.sendTransaction(msg, {from: from_account})

tx_data = web3.eth.getTransaction(tx_hash)
console.log("Number of tweets:" + tweet_contract.getNumberOfTweets())

// After certain period, the tx would be processed and we should get tx_receipt
// with the block number
console.log('Getting tx_receipt if block contained tx is mined. Ctrl-c is okay')
// This could be improve by callback when tx is mined rather than sleeping

setTimeout(function(){
tx_receipt = web3.eth.getTransactionReceipt(tx_hash)
console.log('Got tx_receipt :' + tx_receipt + 
            'block#: ' + tx_receipt.blockNumber)
}, 3000);

