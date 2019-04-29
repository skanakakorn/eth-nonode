pragma solidity ^0.4.10;

contract NameRegistry {

    // mappings to look up account names, account ids and addresses
    mapping (address => string) _addressToAccountName;
    mapping (uint => address) _accountIdToAccountAddress;
    mapping (string => address) _accountNameToAddress;

    // might be interesting to see how many people use the system
    uint _numberOfAccounts;

    // owner
    address _registryAdmin;

    // allowed to administrate accounts only, not everything
    address _accountAdmin;

    constructor () public {
        _registryAdmin = msg.sender;
        _accountAdmin = msg.sender; // can be changed later
        _numberOfAccounts = 0;
    }

    function register(string name, address accountAddress) public returns (int result) {
        if (_accountNameToAddress[name] != address(0)) {
            // name already taken
            result = -1;
        } else if (bytes(_addressToAccountName[accountAddress]).length != 0) {
            // account address is already registered
            result = -2;
        } else if (bytes(name).length >= 80) {
            // name too long
            result = -3;
        } else {
            _addressToAccountName[accountAddress] = name;
            _accountNameToAddress[name] = accountAddress;
            _accountIdToAccountAddress[_numberOfAccounts] = accountAddress;
            _numberOfAccounts++;
            result = 0; // success
        }
    }

    function getNumberOfAccounts() public view returns (uint numberOfAccounts) {
        numberOfAccounts = _numberOfAccounts;
    }

    function getAddressOfName(string name) public view returns (address addr) {
        addr = _accountNameToAddress[name];
    }

    function getNameOfAddress(address addr) public view returns (string name) {
        name = _addressToAccountName[addr];
    }

    function getAddressOfId(uint id) public view returns (address addr) {
        addr = _accountIdToAccountAddress[id];
    }

    function unregister() public returns (string unregisteredAccountName) {
        unregisteredAccountName = _addressToAccountName[msg.sender];
        _addressToAccountName[msg.sender] = "";
        _accountNameToAddress[unregisteredAccountName] = address(0);
        // _accountIdToAccountAddress is never deleted on purpose
    }

    function adminUnregister(string name) public {
        if (msg.sender == _registryAdmin || msg.sender == _accountAdmin) {
            address addr = _accountNameToAddress[name];
            _addressToAccountName[addr] = "";
            _accountNameToAddress[name] = address(0);
            // _accountIdToAccountAddress is never deleted on purpose
        }
    }

    function adminSetAccountAdministrator(address accountAdmin) public {
        if (msg.sender == _registryAdmin) {
            _accountAdmin = accountAdmin;
        }
    }

    function adminRetrieveDonations() public {
        if (msg.sender == _registryAdmin) {
            _registryAdmin.transfer(address(this).balance);
        }
    }
}
