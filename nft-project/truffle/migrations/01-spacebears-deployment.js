const Spacebears = artifacts.require("Spacebear");

module.exports = (deployer) => { 
    deployer.deploy(Spacebears);
}