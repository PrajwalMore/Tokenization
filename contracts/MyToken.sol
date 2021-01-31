// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
// pragma solidity ^0.6.0;

 import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// contract MyToken is ERC20 {
//     constructor(uint256 initialSupply) public ERC20("Gold", "GLD") {//"Gold", "GLD"
//         _mint(msg.sender, initialSupply);
//     }
// }
// contracts/GLDToken.sol

pragma solidity ^0.6.0;

//import "D:/Blockchain-Development/1.Projects/node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
//import "github.com/OpenZeppelin/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
contract MyToken is ERC20 {
    constructor(uint256 initialSupply) public ERC20("StarDucks Cap-Token", "SCT") {

        _mint(msg.sender, initialSupply);
    }
}