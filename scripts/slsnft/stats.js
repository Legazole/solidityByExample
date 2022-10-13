const { getNamedAccounts, ethers } = require("hardhat")

async function main() {
    const { deployer, user, hero, villain } = await getNamedAccounts()
    const slsNFT = await ethers.getContract("SlsNFT", deployer)

    const deployerNft1Balance = await slsNFT.balanceOf(deployer, 0)
    const userNft1Balance = await slsNFT.balanceOf(user, 0)
    const heroNft1Balance = await slsNFT.balanceOf(hero, 0)

    const deployerNft2Balance = await slsNFT.balanceOf(deployer, 1)
    const userNft2Balance = await slsNFT.balanceOf(user, 1)
    const heroNft2Balance = await slsNFT.balanceOf(hero, 1)

    console.log("showing NFT stats:")
    console.log("NFT 1")
    console.log("-----------------------------------------")
    console.log(`deployer balance: ${deployerNft1Balance}`)
    console.log(`user balance: ${userNft1Balance}`)
    console.log(`hero balance: ${heroNft1Balance}`)
    console.log("")
    console.log("NFT 2")
    console.log("-----------------------------------------")
    console.log(`deployer balance: ${deployerNft2Balance}`)
    console.log(`user balance: ${userNft2Balance}`)
    console.log(`hero balance: ${heroNft2Balance}`)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
