const { network, getNamedAccounts, deployments } = require("hardhat")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deployer } = await getNamedAccounts()
    const { deploy, log } = deployments

    log("deploying borncoin on localhost")

    const coin = await deploy("BornCoin", {
        from: deployer,
        log: true,
    })

    log(`borncoin deployed at ${coin.address}`)
    log("------------------------------")
}

module.exports.tags = ["borncoin"]
