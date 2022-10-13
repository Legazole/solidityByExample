const { network, getNamedAccounts, deployments } = require("hardhat")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deployer } = await getNamedAccounts()
    const { deploy, log } = deployments

    log("deploying SlsNFT on localhost")

    const coin = await deploy("SlsNFT", {
        from: deployer,
        log: true,
    })

    log(`SlsNFT deployed at ${coin.address}`)
    log("------------------------------")
}

module.exports.tags = ["slsnft"]
