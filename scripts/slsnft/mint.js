const { getNamedAccounts, ethers } = require("hardhat")

async function main() {
    const { deployer, user, hero, villain } = await getNamedAccounts()
    const slsNFT = await ethers.getContract("SlsNFT", deployer)

    console.log("minting NFTS")
    const c = await slsNFT.mint(user, 0, 10)
    await c.wait(1)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
