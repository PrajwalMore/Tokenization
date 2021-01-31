pragma solidity ^0.6.0;

import "@OpenZeppelin/contracts/access/Ownable.sol";

contract KycContract is Ownable{
    mapping(address => bool) allowed;

    function setKycCompleted(address _addr) public onlyOwner {
        allowed[_addr] = true;
    }

    function setKycRevoked(address _addr
    ) public onlyOwner {
        allowed[_addr] = false;
    }

    function kycCompleted(address _addr) public view returns (bool) {
        return allowed[_addr];
    }

    
    function getallowed(address _addr) public view returns (bool){
    //bool allowedStr=allowed[0x967a01E11Eaa612c22D5083e0Ab834882d0A34E3];
    //     for (uint i = 0; i < addressRegistryCount; i++) {
    //     ret[i] = addresses[i];
    // }
    return allowed[_addr];
    }
}
