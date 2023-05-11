// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

contract SmartMoney { 

    mapping(address => uint256) _wallets;
    uint256 public contractBalance;

    constructor(){}

    function myBalance() external view returns(uint256) {
        return _wallets[msg.sender];
    }

    function withdraw(uint256 _amount) external {
        if(_amount <= _wallets[msg.sender]) {
            _wallets[msg.sender] -= _amount;
            address payable beneficiary = payable(msg.sender);
            beneficiary.transfer(_amount);
            contractBalance -= _amount;
        }
    }

    function withdrawAll() external { 
        address payable beneficiary = payable(msg.sender);
        beneficiary.transfer(_wallets[beneficiary]);
        contractBalance -= _wallets[beneficiary];
    }

    function withdrawToAddress(address payable _beneficiary, uint256 _amount) external {
        if(_amount <= _wallets[msg.sender]) { 
            _wallets[msg.sender] -= _amount;
            _wallets[_beneficiary] += _amount;
            _beneficiary.transfer(_amount);
            contractBalance -= _amount;
        }
    }

    function deposit() public payable { 
        _wallets[msg.sender] = msg.value;
        contractBalance += msg.value;
    }

    receive() payable external { 
        deposit();
    }

}