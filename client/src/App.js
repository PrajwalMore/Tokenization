import React, { Component } from "react";
//import SimpleStorageContract from "./contracts/SimpleStorage.json";
import MyToken from "./contracts/MyToken.json"
import TokenSale from "./contracts/TokenSale.json"
import KycContract from "./contracts/KycContract.json"
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  //state = { storageValue: 0, web3: null, accounts: null, contract: null };
  state ={loaded:false,kycAddress:"0x123...",tokenSaleAddress:null,userTokens:0}
  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      this.web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      this.accounts = await this.web3.eth.getAccounts();

      // Get the contract instance.
      this.networkId = await this.web3.eth.net.getId();

      this.myToken=new this.web3.eth.Contract(
        MyToken.abi,
        MyToken.networks[this.networkId] && MyToken.networks[this.networkId].address,
      );
      this.tokenSale=new this.web3.eth.Contract(
        TokenSale.abi,
        TokenSale.networks[this.networkId] && TokenSale.networks[this.networkId].address,
      )
      this.kycContract=new this.web3.eth.Contract(
        KycContract.abi,
        KycContract.networks[this.networkId] && KycContract.networks[this.networkId].address,
      )

      // const deployedNetwork = SimpleStorageContract.networks[networkId];
      // const instance = new web3.eth.Contract(
      //   SimpleStorageContract.abi,
      //   deployedNetwork && deployedNetwork.address,
      // );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.listenToTokenTransfer();
      this.setState({loaded:true,tokenSaleAddress:TokenSale.networks[this.networkId].address},this.updateUserTokens);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
    this.setState({ storageValue: response });
  };

  handleBuyToken=async()=>{
    console.log("handleBuyToken called.");
    await this.tokenSale.methods.buyTokens(this.accounts[0]).send({from:this.accounts[0],value:this.web3.utils.toWei("1","wei")})
  }

  updateUserTokens=async()=>{
    let userTokens=await this.myToken.methods.balanceOf(this.accounts[0]).call();
    this.setState({userTokens:userTokens});
  }

  listenToTokenTransfer=()=>{
    this.myToken.events.Transfer({to:this.accounts[0]}).on("data",this.updateUserTokens);
    console.log("listenToTokenTransfer called.");
  }

  handleInputChange=(event)=>{
    const target=event.target;
    const value=target.type ==="checkbox" ? target.checked:target.value;
    const name=target.name;
    this.setState({
      [name]:value
    });
  }
 
  handKycWhitlisting=async ()=>{
    console.log(this.state.kycAddress);
    await this.kycContract.methods.setKycCompleted(this.state.kycAddress).send({from:this.accounts[0]});
    console.log("KYC for "+this.state.kycAddress+" is completed!");
    alert("KYC for "+this.state.kycAddress+" is completed!");
  }

  render() {
    // if (!this.state.web3) {
      if (!this.state.loaded) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Cappucino Token Sale.</h1>
        <p>Get your tokens today</p>
        <h2>KYC whitlisting!</h2>
        Address to allow: <input typr="text" name="kycAddress" value={this.state.kycAddress} onChange={this.handleInputChange}/>
        <button type="button" onClick={this.handKycWhitlisting }>Add to Whitlist</button>
        <h2>Buy Cappucino Tokens </h2>
        <p>Send Wei to this address to buy Token(s): {this.state.tokenSaleAddress}</p>
        <p>You currently have: <b>{this.state.userTokens} CAPPCT tokens</b></p>
        <button type="button" onClick={this.handleBuyToken}>Buy more Tokens</button>
      </div>
    );
  }
}

export default App;
