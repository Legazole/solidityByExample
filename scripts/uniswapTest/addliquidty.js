const { getNamedAccounts, ethers } = require("hardhat")

async function main() {
    const { deployer } = await getNamedAccounts()
    const uniswapTest = await ethers.getContract(
        "TestUniswapLiquidity",
        deployer
    )

    const bornCoin = "0x9a46bb993b88c81533aeeb79a456800eb372fc42"
    const geneCoin = "0x9104becff0a858bbf407ff466e58ea1857ff33df"

    const amountA = 10
    const amountB = 10

    await uniswapTest.addLiquidity(bornCoin, geneCoin, amountA, amountB)

    console.log("Liquidity added")
}
