// contracts/GLDToken.sol
// SPDX-License-Identifier: MIT
// pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
pragma solidity ^0.6.0;

contract MyToken is ERC20 {
    constructor(uint256 initialSupply) public ERC20("StarDucks Cap-Token", "SCT") {

        _mint(msg.sender, initialSupply);
    }
}
