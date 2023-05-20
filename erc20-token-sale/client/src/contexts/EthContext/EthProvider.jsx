import React, { useReducer, useCallback, useEffect } from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import { reducer, actions, initialState } from "./state";

function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);


  const updateUserTokens = async (contracts, web3) => { 
    //::: For fixed amount tokens sale use:
    //: let userTokens = await contracts.myToken.methods.balanceOf(accounts[0]).call();
    const accounts = await web3.eth.requestAccounts();
    const userTokens = await contracts.myMintableToken.methods.balanceOf(accounts[0]).call();
    const totalSupply = await contracts.myMintableToken.methods.totalSupply().call();
    dispatch({
      type: actions.update_user_token,
      data: userTokens
    });
    dispatch({
      type: actions.update_total_suppy,
      data: totalSupply
    });
  }

  const listenToTokenTransferEvent = useCallback(async (contracts, web3) => { 
     //::: For fixed amount tokens sale use:
    //: contracts.myToken.events.Transfer({to: accounts[0]}).on("data", () => updateUserTokens(contracts, accounts));
    contracts.myMintableToken.events.Transfer().on("data", () => updateUserTokens(contracts, web3));
  },[])

  
  const init = useCallback(
    async artifacts => {
      if (artifacts) {
        const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
        const accounts = await web3.eth.requestAccounts();
        const networkID = await web3.eth.net.getId();
        // abis
        const { my_token, my_token_sale, my_mintable_token, my_mintable_token_sale, kyc } = artifacts;
        let address, contract, contracts = {};
        try {
          // :::::::::::::::::::: NON MINTABLE
          // ::: Retrieve MyToken contract
          address = my_token.networks[networkID].address;
          contract = new web3.eth.Contract(my_token.abi, address);
          contracts.myToken = contract;

          // ::: Retrieve MyTokenSale Contract
          address = my_token_sale.networks[networkID].address;
          contract = new web3.eth.Contract(my_token_sale.abi, address);
          contracts.myTokenSale = contract;

          // ::::::::::::::::::: MINTABBLE
          // ::: Retrieve MyMintable contract
          address = my_mintable_token.networks[networkID].address;
          contract = new web3.eth.Contract(my_mintable_token.abi, address);
          contracts.myMintableToken = contract;

          // ::: Retrieve MyMintableTokenSale Contract
          address = my_mintable_token_sale.networks[networkID].address;
          contract = new web3.eth.Contract(my_mintable_token_sale.abi, address);
          contracts.myMintableTokenSale = contract;


          // ::: Retrieve KycContract Contract
          address = kyc.networks[networkID].address;
          contract = new web3.eth.Contract(kyc.abi, address);
          contracts.kyc = contract;

        } catch (err) {
          console.error(err);
        }
        dispatch({
          type: actions.init,
          data: { artifacts, web3, accounts, networkID, contracts, tokenSaleAddress:my_mintable_token_sale.networks[networkID].address}
        });
        listenToTokenTransferEvent(contracts, web3);
        updateUserTokens(contracts, accounts);
      }
    }, [listenToTokenTransferEvent]);


  useEffect(() => {
    const tryInit = async () => {
      try {
        // ::: Unmintable tokens
        const my_token_artifact = require("../../contracts/MyToken.json");
        const my_token_sale_artifact = require("../../contracts/MyTokenSale.json");
        const kyc_contract_artifact = require("../../contracts/KycContract.json");
        // ::: Minstable tokens
        const my_token_mintable_artifact = require("../../contracts/MyMintableToken.json");
        const my_token_sale_mintable_artifact = require("../../contracts/MyMintableTokenSale.json");

        const artifacts = {
          my_token: my_token_artifact, 
          my_token_sale: my_token_sale_artifact, 
          my_mintable_token: my_token_mintable_artifact,
          my_mintable_token_sale: my_token_sale_mintable_artifact,
          kyc: kyc_contract_artifact};
        init(artifacts);
      } catch (err) {
        console.error(err);
      }
    };

    tryInit();
  }, [init]);

  
  useEffect(() => {
    const events = ["chainChanged", "accountsChanged"];
    const handleChange = () => {
      init(state.artifact);
    };

    events.forEach(e => window.ethereum.on(e, handleChange));
    return () => {
      events.forEach(e => window.ethereum.removeListener(e, handleChange));
    };
  }, [init, state.artifact]);

  return (
    <EthContext.Provider value={{
      state,
      dispatch
    }}>
      {children}
    </EthContext.Provider>
  );
}

export default EthProvider;
