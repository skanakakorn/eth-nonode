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
/*if (! from_address_index) {
  from_address_index = 0
  console.log("Using address index " + from_address_index) 
}*/


accounts = web3.eth.accounts;
// unlock from_account 600 secs
// web3.personal.unlockAccount(accounts[from_address_index],"",6000)
from_account = accounts[0];
console.log("Using account: " + from_account)

// Replace the contract address with the one you created.
// This is not the account address
tweet_contract_address = "0x04128f4582Dc0eCad499a887CaE8CE691f0c0974"

// replace this abi with the correct abi from the “Interface” output of online
// compiler.
tweet_abi = [{"constant":true,"inputs":[],"name":"getOwnerAddress","outputs":[{"name":"adminAddress","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getLatestTweet","outputs":[{"name":"tweetString","type":"string"},{"name":"numberOfTweets","type":"uint256"},{"name":"from","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"isAdmin","outputs":[{"name":"isAdmin","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"tweetId","type":"uint256"}],"name":"getTweet","outputs":[{"name":"tweetString","type":"string"},{"name":"from","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getNumberOfTweets","outputs":[{"name":"numberOfTweets","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"tweetString","type":"string"}],"name":"tweet","outputs":[{"name":"result","type":"int256"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":false,"name":"tweetString","type":"string"},{"indexed":false,"name":"_tweetCount","type":"uint256"}],"name":"Tweet","type":"event"}]

tweet_contract = web3.eth.contract(tweet_abi).at(tweet_contract_address)

// Name Registry
registry_contract_address = "0x045ae0EAf802336c3E39dcE183E8513d81D97327"
registry_abi = [{"constant":false,"inputs":[{"name":"name","type":"string"}],"name":"adminUnregister","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"name","type":"string"},{"name":"accountAddress","type":"address"}],"name":"register","outputs":[{"name":"result","type":"int256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getNumberOfAccounts","outputs":[{"name":"numberOfAccounts","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"name","type":"string"}],"name":"getAddressOfName","outputs":[{"name":"addr","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"accountAdmin","type":"address"}],"name":"adminSetAccountAdministrator","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"addr","type":"address"}],"name":"getNameOfAddress","outputs":[{"name":"name","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"unregister","outputs":[{"name":"unregisteredAccountName","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"id","type":"uint256"}],"name":"getAddressOfId","outputs":[{"name":"addr","type":"address"}],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"}]

registry_contract = web3.eth.contract(registry_abi).at(registry_contract_address)

console.log("Number of tweets:" + tweet_contract.getNumberOfTweets())

if (argv['latest']) {
  tweet = tweet_contract.getLatestTweet();
  console.log("Latest tweet:" + tweet);
  tweet_string = tweet[0];
  from_address = tweet[2];
  from_name = "";
  from_name = registry_contract.getNameOfAddress(from_address);
  console.log("Name:" + from_name + ", address:" + from_address + ", msg:" + tweet_string);
}

if (typeof argv['id'] != 'undefined') {
  tweet = tweet_contract.getTweet(argv['id']);
  console.log("Tweet id:" + argv['id'] + ', msg:' + tweet)
  tweet_string = tweet[0];
  from_address = tweet[1];
  from_name = "";
  from_name = registry_contract.getNameOfAddress(from_address);
  console.log("Name:" + from_name + ", address:" + from_address + ", msg:" + tweet_string);
}
