const { network, getNamedAccounts, deployments } = require("hardhat")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deployer } = await getNamedAccounts()
    const { deploy, log } = deployments

    log("deploying...")

    const vault = await deploy("Vault", {
        from: deployer,
        log: true,
    })

    log(`Vault deployed at ${vault.address}`)
    log("------------------------------------------")
}

module.exports.tags = ["MyContract"]
