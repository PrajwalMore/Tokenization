pragma solidity ^0.6.0;
import "./Crowdsale.sol";
import "./KycContract.sol";

//import "D:/Blockchain-Development/1.Projects/1.Tokenization/contracts/KycContract.sol";

contract TokenSale is Crowdsale{
    KycContract kyc;
    constructor(
        uint256 rate,
        address payable wallet,
        IERC20 token,
        KycContract _kyc
    )
    
    Crowdsale(rate,wallet,token) public {
        kyc=_kyc;
    }
    
    function _preValidatePurchase(address beneficiary, uint256 weiAmount)  public payable override//internal view
    //Base functions can be overridden by inheriting contracts to change their behavior if they are marked as virtual .
    {
        super._preValidatePurchase(beneficiary,weiAmount);
        
    }
    
    function returnKycStatus() public view /*returns(bool)*/{
        // bool kycStatus;
        // kycStatus=kyc.kycCompleted(msg.sender);
        require(kyc.kycCompleted(msg.sender),"KYC not completed yet,aborting...");
        // return kycStatus;
     }
    
}