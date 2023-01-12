const { getNamedAccounts, ethers } = require("hardhat")
require("dotenv").config()

async function main() {
    const { deployer } = await getNamedAccounts()
    const bornCoin = await ethers.getContract("BornCoin", deployer)

    const deployerBalance = await bornCoin.balanceOf(deployer)

    console.log("Balances:")
    console.log("deployer ------------------")
    console.log(`deployer owns: ${deployerBalance} bornCoin `)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
