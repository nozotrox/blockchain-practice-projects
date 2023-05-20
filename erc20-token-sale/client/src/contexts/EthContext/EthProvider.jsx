import React, { useReducer, useCallback, useEffect } from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import { reducer, actions, initialState } from "./state";

function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const init = useCallback(
    async artifacts => {
      if (artifacts) {
        // console.debug(Web3.givenProvider);
        const web3 = new Web3("http://localhost:7545");
        const accounts = await web3.eth.getAccounts();
        const networkID = await web3.eth.net.getId();
        // abis
        const { my_token, my_token_sale, kyc } = artifacts;
        let address, contract, contracts = {};
        try {
          // ::: Retrieve MyToken contract
          address = my_token.networks[networkID].address;
          contract = new web3.eth.Contract(my_token.abi, address);
          contracts.myToken = contract;

          // ::: Retrieve MyTokenSale Contract
          address = my_token_sale.networks[networkID].address;
          contract = new web3.eth.Contract(my_token_sale.abi, address);
          contracts.myTokenSale = contract;

          // ::: Retrieve KycContract Contract
          address = kyc.networks[networkID].address;
          contract = new web3.eth.Contract(kyc.abi, address);
          contracts.kyc = contract;

        } catch (err) {
          console.error(err);
        }
        dispatch({
          type: actions.init,
          data: { artifacts, web3, accounts, networkID, contracts }
        });
      }
    }, []);

  useEffect(() => {
    const tryInit = async () => {
      try {
        const my_token_artifact = require("../../contracts/MyToken.json");
        const my_token_sale_artifact = require("../../contracts/MyTokenSale.json");
        const kyc_contract_artifact = require("../../contracts/KycContract.json");
        const artifacts = {my_token: my_token_artifact, my_token_sale: my_token_sale_artifact, kyc: kyc_contract_artifact};
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
