//SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

import "./MintableCrowdsale.sol";
import "../KycContract.sol";

contract MyMintableTokenSale is MintableCrowdsale {
    KycContract kyc;

    constructor(
        uint256 rate, // rate in TKNbits
        address payable wallet,
        IERC20 token,
        KycContract _kyc
    ) public Crowdsale(rate, wallet, token) {
        kyc = _kyc;
    }

    function _preValidatePurchase(
        address beneficiary,
        uint256 weiAmount
    ) internal view override {
        super._preValidatePurchase(beneficiary, weiAmount);
        require(
            kyc.kycCompleted(beneficiary),
            "KYC not completed yet, aborting"
        );
    }
}
