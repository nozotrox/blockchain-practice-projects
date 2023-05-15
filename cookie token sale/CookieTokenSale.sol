//SPDX-License-Identifier: MIT

pragma solidity 0.8.16;


import "./CookieToken.sol";

contract CookieTokenSale { 

    uint tokenPriceInWei = 1 ether;

    // ::: ckt is the symbol of cookie token
    CookieToken ckt_token;

    constructor(address _cktContractAddress) {
        ckt_token = CookieToken(_cktContractAddress);
    }

    function purchaseCKT() public payable {
        require(msg.value >= tokenPriceInWei, "Not enough money for the purchase of the token");
        uint totalTokens = msg.value / tokenPriceInWei;
        uint change = msg.value - tokenPriceInWei * totalTokens;
        ckt_token.mint(msg.sender, totalTokens);
        payable(msg.sender).transfer(change); // ::: Send the change back to the buyer;
    }
    
}