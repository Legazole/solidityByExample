const { ethers, getNamedAccounts } = require("hardhat")
const { expect, assert } = require("chai")

//Option 1:
//describe("TestUniswapLiquidity",() => {} )
//Option 2 (best practice):
const { deployer } = getNamedAccounts()
describe("TestUniswapLiquidity", function () {
    let testUniswap
    beforeEach(async function () {
        testUniswapFactory = await ethers.getContractFactory(
            "TestUniswapLiquidity"
        )
        testUniswap = await testUniswapFactory.deploy()
    })
    it("Should start with the factory address initialized on the goerli network", async function () {
        const factoryAddress = await testUniswap.getFactoryAddress()
        const expectedValue = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f"
        assert.equal(factoryAddress.toString(), expectedValue)
    })
    it("Should start with the router address initialized on the goerli network", async function () {
        const routerAddress = await testUniswap.getRouterAddress()
        const expectedValue = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"
        assert.equal(routerAddress.toString(), expectedValue)
    })
    it("Should start with the borncoin address initialized", async function () {
        const bornCoinAddress = await testUniswap.getBorncoinAddress()
        const expectedValue = "0x9a46Bb993b88C81533AeeB79A456800EB372fc42"
        assert.equal(bornCoinAddress.toString(), expectedValue)
    })
    it("Should start with the genecoin address initialized", async function () {
        const genecoinAddress = await testUniswap.getGenecoinAddress()
        const expectedValue = "0x9104BEcFf0a858bbf407Ff466E58EA1857fF33dF"
        assert.equal(genecoinAddress.toString(), expectedValue)
    })
})
