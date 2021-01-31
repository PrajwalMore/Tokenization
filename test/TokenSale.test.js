const TokenSale=artifacts.require("TokenSale");
const Token=artifacts.require("MyToken");
const KycContract=artifacts.require("KycContract");

const chai=require("./setupchai.js");
const BN=web3.utils.BN;
const expect=chai.expect;

require("dotenv").config({path:"../.env"});
contract("TokenSale Test",async(accounts)=>{
    const [deployerAccount,recipient,anotherAccount]=accounts;

    it("Should not have any token in deployerAccount",async()=>{
        let instance=await Token.deployed();
        return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(new BN(0));
    });
    it("all coins should be in the tokensale smart contract",async()=>{
        let instance=await Token.deployed();
        let balance= await instance.balanceOf(TokenSale.address);
        let totalSupply=await instance.totalSupply.call();
        //It can be written as instance.totalSupply()<--^.
        return expect(balance).to.be.a.bignumber.equal(totalSupply);
    });
    it("Should be possible to buy one token by simply sending ether to the smart conrtact",async()=>{
        let tokenInstance=await Token.deployed();
        let tokenSaleInstance=await TokenSale.deployed();
        let balanceBeforeAccount=await tokenInstance.balanceOf.call(recipient);
        //console.log(balanceBeforeAccount);
        //expect(tokenSaleInstance.sendTransaction({from:recipient,value:web3.utils.toWei("1","wei")})).to.be.rejected;
        expect(balanceBeforeAccount).to.be.bignumber.equal(await tokenInstance.balanceOf.call(recipient));
        //Whitlisting address.
        let KycInstance=await KycContract.deployed();
        await KycInstance.setKycCompleted(deployerAccount,{from:deployerAccount});
        
        // let allw=await KycInstance.kycCompleted(deployerAccount);
        // console.log(deployerAccount,allw);
        // msgCaller=await KycInstance.getallowed(deployerAccount);
        // console.log("allwed[] ",msgCaller);
        // kycStatus=await tokenSaleInstance.returnKycStatus();
        // console.log("allwed[] ",kycStatus);

        //Sending 1 wei.
        /*Where sendTransaction() is located find it and add _preValidatePurchase;*/
        expect(tokenSaleInstance.sendTransaction({from:recipient,value:web3.utils.toWei("1","wei")})).to.be.fulfilled;
        //.sendTransaction() is a method from web3.eth.[sendTransaction]
        // recBal=await tokenInstance.balanceOf(recipient)
        // console.log(recBal);
        
        return expect(balanceBeforeAccount+1).to.be.bignumber.equal(await tokenInstance.balanceOf.call(recipient));
    });
});