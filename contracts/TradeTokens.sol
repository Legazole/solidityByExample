// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

import "./GeneCoin.sol";

contract TradeTokens {
    //playground for interacting with ERC20 token standard

    address genecoinAddress = 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512;

    GeneCoin geneCoin = GeneCoin(payable((genecoinAddress)));

    constructor() {}

    receive() external payable {}

    function swapEthForTokens() external payable {
        geneCoin.mint(msg.sender, msg.value);
        //geneCoin.transferFrom(msg.sender, genecoinAddress, msg.value);
    }
}
