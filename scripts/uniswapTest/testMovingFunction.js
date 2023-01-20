const { getNamedAccounts, ethers } = require("hardhat")

async function main() {
    const { deployer } = await getNamedAccounts()
    const geneCoinContract = await ethers.getContract("GeneCoin", deployer)
    const uniswapTest = await ethers.getContract(
        "TestUniswapLiquidity",
        deployer
    )

    const genecoinAddress = "0x9104becff0a858bbf407ff466e58ea1857ff33df"
    const amount = 10

    const contractBalance = await geneCoinContract.balanceOf(
        uniswapTest.address
    )
    const deployerBalance = await geneCoinContract.balanceOf(deployer)

    console.log(
        `uniswap test contract has a genecoin balance of ${contractBalance.toString()}`
    )
    console.log(
        `deployer has a genecoin balance of: ${deployerBalance.toString()}`
    )
    console.log("approving contract to spend deployer geneCoin")

    const tx = await geneCoinContract.approve(uniswapTest.address, amount)
    await tx.wait(1)

    console.log("Transfering geneCoin from deployer to contract...")
    const c = await uniswapTest.transferToContract(genecoinAddress, amount)
    await c.wait(1)
    console.log("funds moved!")
    const endingContractBalance = await geneCoinContract.balanceOf(
        uniswapTest.address
    )
    console.log(`New contract balance:${endingContractBalance.toString()}`)
}
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
