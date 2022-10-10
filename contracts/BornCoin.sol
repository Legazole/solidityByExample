// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/IERC20.sol";

contract BornCoin is IERC20 {
    uint256 public totalSupply;
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    string public name = "BornCoin";
    string public symbol = "BRNC";
    uint256 public decimals = 18;

    address owner1 = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266;
    address owner2 = 0x70997970C51812dc3A010C7d01b50e0d17dc79C8;

    constructor() {
        _mint(
            owner1,
            1000 /** 10**decimals()*/
        );
        _mint(owner2, 1000);
        _mint(address(this), 1000);
    }

    function _mint(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: mint to the zero address");

        totalSupply += amount;
        unchecked {
            // Overflow not possible: balance + amount is at most totalSupply + amount, which is checked above.
            balanceOf[account] += amount;
        }
        emit Transfer(address(0), account, amount);
    }

    function transfer(address recipient, uint256 amount)
        external
        returns (bool)
    {
        balanceOf[msg.sender] -= amount;
        balanceOf[recipient] += amount;
        emit Transfer(msg.sender, recipient, amount);
        return true;
    }

    function approve(address spender, uint256 amount) external returns (bool) {
        allowance[msg.sender][spender] += amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool) {
        require(allowance[msg.sender][sender] >= amount);
        balanceOf[sender] -= amount;
        allowance[sender][msg.sender] -= amount;
        balanceOf[recipient] += amount;
        emit Transfer(sender, recipient, amount);
        return true;
    }

    function mint(address recipient, uint256 amount) internal {
        balanceOf[recipient] += amount;
        totalSupply += amount;
        emit Transfer(address(0), recipient, amount);
    }

    receive() external payable {
        mint(msg.sender, msg.value);
    }
}
