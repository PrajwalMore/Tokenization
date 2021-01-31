//  var MyToken=artifacts.require("./MyToken.sol");
//  module.exports=async function(deployer){
//      await  deployer.deploy(MyToken,(1000000));
//  }

var MyToken = artifacts.require("MyToken.sol");
var TokenSale=artifacts.require("TokenSale.sol");
var KycContract=artifacts.require("./KycContract.sol");
require("dotenv").config({path: "../.env"});
//console.log(process.env);
module.exports = async function(deployer)
 {
     let addr = await web3.eth.getAccounts();
      await deployer.deploy(MyToken, process.env.INITIAL_TOKENS);
      await deployer.deploy(KycContract);
      await deployer.deploy(TokenSale,1,addr[0],MyToken.address,KycContract.address);
      console.log("KycContract.address",KycContract.address);
      let instance =await MyToken.deployed();
      await instance.transfer(TokenSale.address,process.env.INITIAL_TOKENS);
 }