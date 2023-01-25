// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BornCoin is ERC20 {
    address owner1 = 0xd66E9945a68Ac737cf506d78372A240862C405Bd;

    constructor() ERC20("bornCoin", "BRNC") {
        _mint(owner1, 1000 /** 10**decimals()*/);
        _mint(address(this), 1000);
    }

    function mint(address recipient, uint256 amount) internal {
        _mint(recipient, amount);
    }

    receive() external payable {
        mint(msg.sender, msg.value);
    }
}
