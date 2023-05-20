import useEth from "../../contexts/EthContext/useEth";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";
import { useState } from "react";

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
    const accounts = await state.web3.eth.requestAccounts();
    await kycContract.methods.setKycCompleted(kycAddress).send({from: accounts[0]});
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
      <center>
        <h1 className="title">StarDucks</h1>
        <span className="subtitle">The best Cappucino Token in Town</span><br></br>
        <span className="sub_subtitle">Whitelist your address so you can buy our tasty Cappucino at your near Starducks.</span>
      </center>
      { failedConfig? failedConfigOutput : (
        <>
        <center><span id="totalSupply">Total Supply: {state.total_supply}</span> <p>Your current balance: {state.userTokens}</p></center>
        
        <div className="inpub_box">
          <h2>Enable your account</h2>
          <div>
            <input type="text" name="kycAddress" value={formState.kycAddress} onChange={e => handleInputChange(e)} placeholder="Enter address to allow" />
            <button type="button" className="button" onClick={e => handleKycSubmit(e)}>Add Address to Whitelist</button>
          </div>
        </div>
        <span className="separate"></span>
        <h1>Buy Cappucino-Tokens</h1>
        <button type="button" className="button buytoken_button" onClick={e => handleBuyTokens()}>Buy Tokens</button> 
        <p className="small_text">Or send Ether to this address: <span className="pill">{state.tokenSaleAddress}</span></p>
        </>
      )
      }
    </div>
  );
}

export default Demo;
