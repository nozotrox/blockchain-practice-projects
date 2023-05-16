// SPDX-License-Identifier: MIT

pragma solidity 0.8.16;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract CookieToken is ERC20, AccessControl { 
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    event CookiePurchased(address indexed receiver, address indexed buyer);

    constructor() ERC20("Cookie Token", "CKT") {
        _grantRole(DEFAULT_ADMIN_ROLE, _msgSender());
        _grantRole(MINTER_ROLE, _msgSender());
    }

    function mint(address _to, uint256 _amount) public onlyRole(MINTER_ROLE) {
        _mint(_to, _amount);
    }

    function buyOneCoffee() public {
        _burn(_msgSender(), 1);
        emit CookiePurchased(_msgSender(), _msgSender());
    }

    function buyOneCoffeeFrom(address _account) public { 
        _spendAllowance(_account, _msgSender(), 1);
        _burn(_account, 1);
        emit CookiePurchased(_msgSender(), _account);
    }

}