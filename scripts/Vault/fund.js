const { getNamedAccounts, ethers } = require("hardhat")

async function main() {
    const { deployer } = await getNamedAccounts()
    const vault = await ethers.getContract("Vault", deployer)

    const contractBalance = await vault.getBalance()

    console.log(`the contract has a balance of ${contractBalance}`)

    console.log("funding...")

    const txRespone = await vault.fund({
        value: ethers.utils.parseEther("0.1"),
    })
    await txRespone.wait(1)

    const newContractBalance = await vault.getBalance()

    console.log(newContractBalance.toString())
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
