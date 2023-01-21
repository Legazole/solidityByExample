// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GeneCoin is ERC20, Ownable {
    uint256 public maxSupply = 10000;
    address owner1 = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266;
    address owner2 = 0x70997970C51812dc3A010C7d01b50e0d17dc79C8;

    modifier capped() {
        require(totalSupply() <= maxSupply);
        _;
    }

    constructor() ERC20("geneCoin", "GCOIN") {
        _mint(owner1, 1000 /** 10**decimals()*/);
        _mint(owner2, 1000);
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
