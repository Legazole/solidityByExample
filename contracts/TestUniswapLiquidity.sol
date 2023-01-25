// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Factory.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
import "./GeneCoin.sol";

contract TestUniswapLiquidity {
    address private constant FACTORY =
        0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f;
    address private constant ROUTER =
        0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D;
    address private constant BORNCOIN =
        0x9a46Bb993b88C81533AeeB79A456800EB372fc42;
    address payable private constant GENECOIN =
        payable(0x9104BEcFf0a858bbf407Ff466E58EA1857fF33dF);
    //payable(0x5FbDB2315678afecb367f032d93F642f64180aa3);

    event Log(string message, uint256 val);

    GeneCoin geneCoin = GeneCoin(GENECOIN);
    IERC20 Erc20;

    function setInteractableERC20Contract(address _token) external {
        Erc20 = IERC20(_token);
    }

    function approveOnErc20(address _spender, uint256 _amount) external {
        Erc20.approve(_spender, _amount);
    }

    function approveERC20Amount(
        address _token,
        address _spender,
        uint256 _amount
    ) external {
        IERC20(_token).approve(_spender, _amount);
    }

    function transferTokensToContract(address _tokenA, uint _amountA) public {
        IERC20(_tokenA).transferFrom(msg.sender, address(this), _amountA);
    }

    function addLiquidity(
        address _tokenA,
        address _tokenB,
        uint _amountA,
        uint _amountB
    ) public {
        IERC20(_tokenA).transferFrom(msg.sender, address(this), _amountA);
        IERC20(_tokenB).transferFrom(msg.sender, address(this), _amountB);

        IERC20(_tokenA).approve(ROUTER, _amountA);
        IERC20(_tokenB).approve(ROUTER, _amountB);

        // uint _amountAMin = ((_amountA / 100) * 99);
        // uint _amountBmin = ((_amountA / 100) * 99);

        (uint amountA, uint amountB, uint liquidity) = IUniswapV2Router02(
            ROUTER
        ).addLiquidity(
                _tokenA,
                _tokenB,
                _amountA,
                _amountB,
                1,
                1,
                address(this),
                block.timestamp
            );

        emit Log("amountA", amountA);
        emit Log("amountB", amountB);
        emit Log("Liquidity", liquidity);
    }

    function removeLiquidity(address _tokenA, address _tokenB) external {
        address pair = IUniswapV2Factory(FACTORY).getPair(_tokenA, _tokenB);

        uint liquidity = IERC20(pair).balanceOf(address(this));
        IERC20(pair).approve(ROUTER, liquidity);

        (uint amountA, uint amountB) = IUniswapV2Router01(ROUTER)
            .removeLiquidity(
                _tokenA,
                _tokenB,
                liquidity,
                1,
                1,
                address(this),
                block.timestamp
            );
    }

    function getFactoryAddress() public pure returns (address) {
        return FACTORY;
    }

    function getRouterAddress() public pure returns (address) {
        return ROUTER;
    }

    function getBorncoinAddress() public pure returns (address) {
        return BORNCOIN;
    }

    function getGenecoinAddress() public pure returns (address) {
        return GENECOIN;
    }

    function getInteractableERC20() public view returns (address) {
        return address(Erc20);
    }
}
