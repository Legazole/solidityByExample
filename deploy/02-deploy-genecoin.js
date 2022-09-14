const { network, getNamedAccounts, deployments } = require("hardhat")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deployer } = await getNamedAccounts()
    const { deploy, log } = deployments

    log("deploying genecoin on localhost")

    const genecoin = await deploy("geneCoin", {
        from: deployer,
        log: true,
    })

    log(`genecoin deployed at ${genecoin.address}`)
    log("------------------------------")
}
