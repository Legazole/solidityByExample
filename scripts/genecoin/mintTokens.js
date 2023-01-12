const { getNamedAccounts, ethers } = require("hardhat")

async function main() {
    const { deployer } = await getNamedAccounts()
    const geneCoin = await ethers.getContract("GeneCoin", deployer)

    const deployerBalance = await geneCoin.balanceOf(deployer)

    console.log(`Current deployer geneCoin balance: ${deployerBalance}`)
    console.log("Minting geneCoin tokens to deployer address.")
    console.log("---------------")

    const c = await geneCoin.mint(deployer, 1000)
    await c.wait(1)

    const updatedBalance = await geneCoin.balanceOf(deployer)

    console.log(`Updated deployer balance after minting: ${updatedBalance}`)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
