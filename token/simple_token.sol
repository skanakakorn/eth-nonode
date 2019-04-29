pragma solidity ^0.4.10;
contract owned {
    address public owner;

    constructor () public {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender != owner, "onlyOwner");
        _;
    }

    function transferOwnership(address newOwner) public onlyOwner {
        owner = newOwner;
    }
}

contract Token is owned {
    /* Public variables of the token */
    string public standard = "Token 0.2";
    string public name;
    string public symbol;
    uint8 public decimals;
    uint256 public totalSupply;

    /* This creates an array with all balances */
    mapping (address => uint256) public balanceOf;

    /* This generates a public event on the blockchain that will notify clients */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /* Initializes contract with initial supply tokens to the creator of the contract */
    constructor (
        uint256 initialSupply,
        string tokenName,
        uint8 decimalUnits,
        string tokenSymbol
        ) public {
        balanceOf[msg.sender] = initialSupply;              // Give the creator all initial tokens
        totalSupply = initialSupply;                        // Update total supply
        name = tokenName;                                   // Set the name for display purposes
        symbol = tokenSymbol;                               // Set the symbol for display purposes
        decimals = decimalUnits;                            // Amount of decimals for display purposes
    }

    /* Send coins */
    function transfer(address _to, uint256 _value) public {
        if (balanceOf[msg.sender] < _value) revert("not enough token");           // Check if the sender has enough
        if (balanceOf[_to] + _value < balanceOf[_to]) revert("overflow"); // Check for overflows
        balanceOf[msg.sender] -= _value;                     // Subtract from the sender
        balanceOf[_to] += _value;                            // Add the same to the recipient
        emit Transfer(msg.sender, _to, _value);                   // Notify anyone listening that this transfer took place
    }

    function mintToken(address target, uint256 mintedAmount) public onlyOwner {
        balanceOf[target] += mintedAmount;
        totalSupply += mintedAmount;
        emit Transfer(0, this, mintedAmount);
        emit Transfer(this, target, mintedAmount);
    }
    
    /* This unnamed function is called whenever someone tries to send ether to it */
    function () public {
        revert("fallback error");     // Prevents accidental sending of ether
    }
}

