pragma solidity ^0.4.25;

contract Ownable {

    address public owner;

    constructor() 
        public
    {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(owner == msg.sender);
        _;
    }

    function transferOwnership(address _newOwner) 
        public
        onlyOwner
    {
        require(_newOwner != owner);
        require(_newOwner != address(0));
        owner = _newOwner;
    }
}
