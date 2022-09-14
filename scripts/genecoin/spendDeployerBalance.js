const { getNamedAccounts, ethers } = require("hardhat")

async function userStats() {
    const { deployer, user, hero, villain } = await getNamedAccounts()
    const geneCoin = await ethers.getContract("geneCoin", deployer)

    const deployerBalance = await geneCoin.balanceOf(deployer)
    const deployerAllowedUser = await geneCoin.allowance(deployer, user)
    const deployerAllowedHero = await geneCoin.allowance(deployer, hero)

    const userBalance = await geneCoin.balanceOf(user)
    const userAllowedDeployer = await geneCoin.allowance(user, deployer)
    const userAllowedHero = await geneCoin.allowance(user, hero)

    const heroBalance = await geneCoin.balanceOf(hero)
    const heroAllowedDeployer = await geneCoin.allowance(hero, deployer)
    const heroAllowedUser = await geneCoin.allowance(hero, user)

    console.log("Balances:")
    console.log("deployer ------------------")
    console.log(`deployer owns: ${deployerBalance} geneCoin `)
    console.log(`deployer allowed user balance: ${deployerAllowedUser}`)
    console.log(`deployer allowed hero balance: ${deployerAllowedHero}`)
    console.log("user ----------------------")
    console.log(`user owns: ${userBalance} geneCoin `)
    console.log(`user allowed deployer balance: ${userAllowedDeployer}`)
    console.log(`user allowed hero balance: ${userAllowedHero}`)
    console.log("hero ----------------------")
    console.log(`hero owns: ${heroBalance} geneCoin`)
    console.log(`hero allowed deployer balance: ${heroAllowedDeployer}`)
    console.log(`hero allowed hero balance: ${heroAllowedUser}`)
    console.log("--------------------------")
}

async function main() {
    const { deployer, user, hero, villain } = await getNamedAccounts()
    const geneCoinHero = await ethers.getContract("geneCoin", hero)
    await userStats()
    const c = await geneCoinHero.transferFrom(deployer, hero, 10)
    await c.wait(1)
    await userStats()
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
