// SPDX-License-Identifier: MIT

pragma solidity 0.8.18;

contract Messager { 

    address _owner;
    uint public counter;
    string public message;

    constructor() { 
        _owner = msg.sender;
    }

    function updateMessage(string memory _message) public { 
        if(msg.sender == _owner){
            message = _message;
            counter++;
        }
    }
}