//SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

import "./ERC20Mintable.sol";

contract MyMintableToken is ERC20Mintable {
    constructor() ERC20("StarDucks Capu-Token", "SCT") public {
        _setupDecimals(0);
    }
}
