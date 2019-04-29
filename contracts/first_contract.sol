pragma solidity ^0.4.10;

contract MessageStorage {
    string storedData;

    event Set(
        address indexed _from,
        string s
    );

    function set(string s) {
        storedData = s;
        Set(msg.sender, s);
    }

    function get() constant returns (string retVal) {
        return storedData;
    }
}
