// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Vault is Ownable {
    mapping(address => uint) public addressToValue;

    receive() external payable {
        fund();
    }

    function withdrawAmount(uint _amount) public onlyOwner {
        payable(msg.sender).transfer(_amount);
    }

    function withdrawAll() external onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }

    function fund() public payable {
        addressToValue[msg.sender] += msg.value;
    }

    function getBalance() external view returns (uint) {
        return address(this).balance;
    }

    function getBalancePerAddress(address _address)
        external
        view
        returns (uint)
    {
        return addressToValue[_address];
    }
}
