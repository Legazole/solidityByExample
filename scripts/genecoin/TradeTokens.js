const { getNamedAccounts, ethers } = require("hardhat")

async function main() {
    const { deployer, user, hero } = await getNamedAccounts()

    const tradeTokens = await ethers.getContract("TradeTokens", deployer)

    const c = await tradeTokens.swapEthForTokens({ value: 1 })
    await c.wait(1)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
