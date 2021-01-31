const Token=artifacts.require("MyToken");
const chai=require("./setupchai.js");
const BN=web3.utils.BN;
const expect=chai.expect;

contract("Token test",async accounts =>{
    const [deployerAccount,recipient,anotherAccount]=accounts;//assigning accounts respectively from accounts array.

    beforeEach(async() =>{
       this.myToken=await Token.new(process.env.INITIAL_TOKENS); 
    });
    it("All tokens should be in my account",async()=>{
        let instance=this.myToken;    
        let totalSupply=await instance.totalSupply();
        //console.log(`total Supply: `,totalSupply)
        return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
             
    });
    it("I can send tokens from Account 1 to Account 2",async() =>{
        const sendTokens=1;
        let instance  =this.myToken;
        let totalSupply=await instance.totalSupply();
        
        expect(instance.transfer(recipient,sendTokens)).to.eventually.be.fulfilled;
        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendTokens)));
        return expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(sendTokens));
    });
    it("It's not possible to send more tokens than account1 has",async()=>{
        let instance =this.myToken;
        let balanceOfAccount = await instance.balanceOf(deployerAccount);
        console.log(balanceOfAccount);
        //expect(instance.transfer(recipient, new BN(balanceOfAccount+1))).to.eventually.be.fulfilled;
        expect(instance.transfer(recipient,new BN(balanceOfAccount+1))).to.eventually.be.rejected;
        //check if balance is still same.
        return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceOfAccount);
    });
});