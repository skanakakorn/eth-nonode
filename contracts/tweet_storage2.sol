pragma solidity ^0.4.10;

// "class" TweetStorage
contract TweetStorage {

  struct tweetStruct {
    string tweetString;
    address from;
  }
  
  // "array" of all tweets of this account: maps the tweet id to the actual tweet
  mapping (uint => tweetStruct) _tweets;

  // total number of tweets in the above _tweets mapping
  uint _tweetCount;
  
  // "owner" of this account
  address _adminAddress;

  event Tweet(  
    address indexed _from,
    string tweetString,
    uint256 _tweetCount
  );

  // constructor
  constructor() public {
    _tweetCount = 0;
    _adminAddress = msg.sender;
  }
  
  // returns true if caller of function ("sender") is admin
  function isAdmin() constant public returns (bool yesAdmin) {
    return msg.sender == _adminAddress;
  }
  
  // create new tweet
  function tweet(string tweetString) public returns (int result) {
    if (bytes(tweetString).length > 256) {
      // limit to 256 bytes
      result = -3;
    } else {
      _tweets[_tweetCount].tweetString = tweetString;
      _tweets[_tweetCount].from = msg.sender;
      _tweetCount++;
      result = 0; // success
    }
    // Create Tweet event
    emit Tweet(msg.sender, tweetString, _tweetCount);
  }
  
  function getTweet(uint tweetId) constant public returns (
      string tweetString, address from) {
    return(_tweets[tweetId].tweetString, _tweets[tweetId].from);
  }
  
  function getLatestTweet() constant public returns (string tweetString, uint numberOfTweets, 
                                              address from) {
    tweetString = _tweets[_tweetCount - 1].tweetString;
    from = _tweets[_tweetCount - 1].from;
    numberOfTweets = _tweetCount;
    return(tweetString, numberOfTweets, from);
  }
  
  function getOwnerAddress() constant public returns (address adminAddress) {
    return _adminAddress;
  }
  
  function getNumberOfTweets() constant public returns (uint numberOfTweets) {
    return _tweetCount;
  }
}
