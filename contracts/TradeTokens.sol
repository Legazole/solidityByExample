// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

import "./GeneCoin.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TradeTokens is Ownable {
    //playground for interacting with ERC20 token standard

    address genecoinAddress = 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512;
    address borncoinAddress = 0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9;

    address owner1 = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266;
    address owner2 = 0x70997970C51812dc3A010C7d01b50e0d17dc79C8;

    uint256 amount;

    IERC20 token1;
    IERC20 token2;

    function setTokens(address _token1, address _token2) external {
        token1 = IERC20(_token1);
        token2 = IERC20(_token2);
    }

    function setOwner(address _owner1, address _owner2) external {
        owner1 = _owner1;
        owner2 = _owner2;
    }

    function setAmount(uint256 _amount) external {
        amount = _amount;
    }

    function swap() public {
        require(token1.allowance(owner1, address(this)) >= amount);
        require(token2.allowance(owner2, address(this)) >= amount);

        _safeTransferFrom(token1, owner1, owner2, amount);
        _safeTransferFrom(token2, owner2, owner1, amount);
    }

    function superSwap(
        IERC20 _token1,
        IERC20 _token2,
        address _owner1,
        address _owner2,
        uint256 _amount
    ) public {
        require(_token1.allowance(_owner1, address(this)) >= _amount);
        require(_token1.allowance(_owner1, address(this)) >= _amount);

        _safeTransferFrom(_token1, _owner1, _owner2, _amount);
        _safeTransferFrom(_token2, _owner2, _owner1, _amount);
    }

    function _safeTransferFrom(
        IERC20 _token,
        address _from,
        address _to,
        uint256 _amount
    ) private {
        bool sent = _token.transferFrom(_from, _to, _amount);
        require(sent, "Token transfer failed");
    }
}
