import useEth from "../../contexts/EthContext/useEth";
import Title from "./Title";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";
import { useState } from "react";
import { actions } from "../../contexts/EthContext/state"

function Demo() {
  const { state } = useEth();
  const [formState, setFormState] = useState({kycAddress:''});
  const kycContract = Boolean(state.contracts)? state.contracts.kyc : {};

  const failedConfig = !state.artifacts || !state.contracts;
  const failedConfigOutput = !state.artifacts ? <NoticeNoArtifact /> : !state.contracts ? <NoticeWrongNetwork /> : <></>;

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setFormState({
      [name]: value
    });
  }

  const handleKycSubmit = async () => {
    const { kycAddress } = formState;
    await kycContract.methods.setKycCompleted(kycAddress).send({from: state.accounts[0]});
    alert("Account "+kycAddress+" is now whitelisted");
  }

  const handleBuyTokens = async () => {
    // state.contracts.myTokenSale.methods.buyTokens(state.accounts[0]).send({from: state.accounts[0], value: state.web3.utils.toWei("1", "wei")});
    try {
      const accounts = await state.web3.eth.requestAccounts();
      console.log(accounts);
      state.contracts.myMintableTokenSale.methods.buyTokens(accounts[0]).send({from: accounts[0], value: state.web3.utils.toWei("1", "wei")})
    } catch (error) {
      console.error();
    }
  }


  return (
    <div className="demo">
      <Title />
      { failedConfig? failedConfigOutput : (
        <>
        <h5>Total Supply: {state.total_supply}</h5>
          <h2>Enable your account</h2>
        Address to allow: <input type="text" name="kycAddress" value={formState.kycAddress} onChange={e => handleInputChange(e)} />
        <button type="button" onClick={e => handleKycSubmit(e)}>Add Address to Whitelist</button>
        <h2>Buy Cappucino-Tokens</h2>
        <p>Send Ether to this address: {state.tokenSaleAddress}</p>
        <p>You currently have: {state.userTokens}</p>
        <button type="button" onClick={e => handleBuyTokens()}>Buy Tokens</button>
        </>
      )
      }
    </div>
  );
}

export default Demo;
