// SPDX-License-Identifier: MIT

pragma solidity 0.8.19;

contract SmartWallet { 

    uint8 MINIMUN_AMOUNT_GUARDIANS=3;
    uint8 MAXIMUM_AMOUNT_GUARDIANS=5;

    address _owner;
    uint public balance;

    constructor(){ 
        _owner = msg.sender;
    }
    
    mapping(address => uint8) _guardianVoting;
    mapping(address => bool) _allowedGuardians ;
    uint8 _nGuardians;
    uint8 _guardianVotes;

    address _newOwner;

    mapping(address => uint) _spenders;

    // :::::::::: SECTION: GUARDIANS MANAGEMENT
    function addGuardian(address _newGuardian) external {
        require(msg.sender == _owner, "You are not the owner of this wallet");
        require(_nGuardians <= MAXIMUM_AMOUNT_GUARDIANS, "You can only have at maximum 5 guardians");
        _allowedGuardians[_newGuardian] = true;
        _nGuardians++;
    }

    function removeGuardian(address _guardian) external { 
        require(msg.sender == _owner, "You are not the owner of this wallet");
        require(_allowedGuardians[_guardian], "The address already wasn't a guardian of the wallet");
        _allowedGuardians[_guardian] = false;
        _nGuardians--;
    }

    function voteNewOwner(address _newOwnerAddress) external { 
        require(_allowedGuardians[msg.sender], "You are not a guardian of this account");
        require(_nGuardians >= MINIMUN_AMOUNT_GUARDIANS, "Not enougth guardians to vote");

        if(_newOwner != _newOwnerAddress) {
            _newOwner = _newOwnerAddress; 
            _guardianVotes = 1;
        } else { 
            _guardianVotes++;

            if(_guardianVotes == _nGuardians) { 
                _owner = _newOwner;
                _guardianVotes = 0;
            }
        }
    }



    // :::::::::: SECTION: SPENDERS/ALLOWANCE MANAGEMENT
    function addSpender(address _beneficiary, uint _allowedAmount) external { 
        require(msg.sender == _owner, "You are not the owner of this wallet");
        require(_allowedAmount <= balance, "You do not have enougth funds to give allowances");
        _spenders[_beneficiary] = _allowedAmount;
    }

    function getAllowanceOf(address _beneficiary) external view returns(uint) { 
        return _spenders[_beneficiary];
    }

    function withdrawAllowance(uint _amount) external { 
        require(_amount <= _spenders[msg.sender], "You do not have enougth allowance!");
        assert(balance >= _spenders[msg.sender]);
        balance -= _amount;
        _spenders[msg.sender] -= _amount;
        payable(msg.sender).transfer(_amount);
    }


    // :::::::::: SECTION: NORMAL WALLET OPERATIONS
    function sendMoneyTo(address payable _benficiary, uint _amount) external { 
        require(msg.sender == _owner, "You are not the owner of this wallet");
        require(_amount <= balance, "Not enougth funds");
        balance -= _amount;
        _benficiary.transfer(_amount);
    }



    function deposit() public payable { 
        balance += msg.value;
    }
    
    receive() external payable { 
        deposit();
    }
    
}