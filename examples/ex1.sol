pragma solidity ^0.4.10;

contract Exam1 {
    struct tweetStruct {
      address sender;
      string msg;
    }
    
    function getList() constant returns (int, string) {
        return(3, "a string");
    }
    
    function getTweet() constant returns (address, string) {
        tweetStruct memory myStruct; // for temporary data
        myStruct.sender = 0x0fba427732e3aa64317fcfb2c900cf36c76cc46e; // will only write to memory
        myStruct.msg = "haha";
        // You can't return struct here.
        return(myStruct.sender, myStruct.msg);
    }
}
