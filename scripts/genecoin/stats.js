const { getNamedAccounts, ethers } = require("hardhat")

async function main() {
    const { deployer } = await getNamedAccounts()
    const geneCoin = await ethers.getContract("GeneCoin", deployer)

    const totalSupply = await geneCoin.totalSupply()
    const tokenName = await geneCoin.name()
    const tokenSymbol = await geneCoin.symbol()
    const contractBalance = await geneCoin.getContractgeneCoinBalance()

    console.log("geneCoin stats")
    console.log(`Total supply: ${totalSupply}`)
    console.log(`Name: ${tokenName}`)
    console.log(`Symbol: ${tokenSymbol}`)
    console.log(`Contract Balance: ${contractBalance}`)

    console.log("------------------------------------")
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
