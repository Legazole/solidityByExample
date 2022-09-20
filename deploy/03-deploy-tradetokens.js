const { network, getNamedAccounts, deployments } = require("hardhat")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deployer } = await getNamedAccounts()
    const { deploy, log } = deployments

    log("deploying contract on localhost")

    const contract = await deploy("TradeTokens", {
        from: deployer,
        log: true,
    })

    log(`contract deployed at ${contract.address}`)
    log("------------------------------")
}

module.exports.tags = ["interact"]
