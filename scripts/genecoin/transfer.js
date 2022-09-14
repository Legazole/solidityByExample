const { getNamedAccounts, ethers } = require("hardhat")

async function main() {
    const { deployer, user, hero, villain } = await getNamedAccounts()
    const geneCoin = await ethers.getContract("geneCoin", deployer)

    console.log("transfering 290 geneCoin from deployer to user")
    const c = await geneCoin.transfer(user, 290)
    await c.wait(1)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
