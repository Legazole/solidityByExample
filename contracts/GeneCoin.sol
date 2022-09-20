// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GeneCoin is ERC20, Ownable {
    uint256 maxSupply = 10000;

    modifier capped() {
        require(totalSupply() <= maxSupply);
        _;
    }

    constructor() ERC20("geneCoin", "GCOIN") {
        _mint(
            msg.sender,
            1000 /** 10**decimals()*/
        );
        _mint(address(this), 1000);
    }

    function mint(address to, uint256 amount) public capped {
        _mint(to, amount);
    }

    function getContractgeneCoinBalance() external view returns (uint256) {
        return balanceOf(address(this));
    }

    receive() external payable {
        _mint(msg.sender, uint256(msg.value));
    }
}
