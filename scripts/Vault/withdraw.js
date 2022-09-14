const { getNamedAccounts, ethers } = require("hardhat")

async function main() {
    const { deployer } = getNamedAccounts()
    const vault = await ethers.getContract("Vault", deployer)

    const balance = await vault.getBalance()
    console.log(balance.toString())

    c = await vault.withdrawAll()
    await c.wait(1)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
