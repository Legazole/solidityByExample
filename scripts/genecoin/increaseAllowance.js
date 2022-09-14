const { getNamedAccounts, ethers } = require("hardhat")

async function main() {
    const { deployer, user, hero, villain } = await getNamedAccounts()

    const amount = 50

    const geneCoinDeployer = await ethers.getContract("geneCoin", deployer)
    const geneCoinUser = await ethers.getContract("geneCoin", user)
    const geneCoinHero = await ethers.getContract("geneCoin", hero)

    const deployerAllowedHero = await geneCoinUser.allowance(deployer, hero)
    console.log(
        `deployer has hero to spend a balance of: ${deployerAllowedHero}`
    )

    console.log(`deployer will now approve hero to spend ${amount}`)
    const c = await geneCoinDeployer.approve(hero, amount)
    await c.wait(1)

    const deployerAllowedHeroUpdated = await geneCoinUser.allowance(
        deployer,
        hero
    )
    console.log(
        `hero can now spend ${deployerAllowedHeroUpdated} of deployers balance`
    )
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
