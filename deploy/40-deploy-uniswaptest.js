const { network, getNamedAccounts, deployments } = require("hardhat")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deployer } = await getNamedAccounts()
    const { deploy, log } = deployments

    log("deploying UniswapTest on network")

    const coin = await deploy("TestUniswapLiquidity", {
        from: deployer,
        log: true,
    })

    log(`UniswapTest deployed at ${coin.address}`)
    log("------------------------------")
}

module.exports.tags = ["uniswaptest"]
