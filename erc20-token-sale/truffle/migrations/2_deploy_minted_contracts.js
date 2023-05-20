var MyMintableToken = artifacts.require("./mintable/MyMintableToken.sol");
var MyMintableTokenSales = artifacts.require("./mintable/MyMintableTokenSale.sol");
var KycContract = artifacts.require("./KycContract.sol");
require('dotenv').config({ path: '../.env' });

module.exports = async function (deployer) {
  const addr = await web3.eth.getAccounts();
  await deployer.deploy(MyMintableToken);
  await deployer.deploy(KycContract);
  await deployer.deploy(MyMintableTokenSales, 1, addr[0], MyMintableToken.address, KycContract.address);
  const tokenInstance = await MyMintableToken.deployed();
  await tokenInstance.addMinter(MyMintableTokenSales.address);
};
