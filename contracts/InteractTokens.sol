// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

import "./interfaces/IERC20.sol";

contract tradeTokens {
    //playground for interacting with ERC20 token standard

    constructor() {}

    function swapOwnTokens(
        address _token,
        address _to,
        uint256 _amount
    ) public {
        require(IERC20(_token).balanceOf(msg.sender) >= _amount);
        IERC20(_token).transfer(_to, _amount);
    }
}
