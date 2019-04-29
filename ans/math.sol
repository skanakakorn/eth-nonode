pragma solidity ^0.4.10;

contract Math {
    int base;

    function setBase(int b) {
        base = b;
    }

    function mulBase(int param) constant returns (int val) {
        return param * base;
    }
}
