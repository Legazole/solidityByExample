const { ethers, getNamedAccounts } = require("hardhat")
const { expect, assert } = require("chai")
const { deployments } = require("hardhat")

//Option 1:
//describe("TestUniswapLiquidity",() => {} )
//Option 2 (best practice):
// const { deployer } = getNamedAccounts()
describe("TestUniswapLiquidity", function () {
    let testUniswap,
        deployer,
        genecoinAddress,
        bornCoinAddress,
        factoryAddress,
        routerAddress,
        geneCoin
    beforeEach(async function () {
        // get signer
        // we can also get a signer using ethers.
        // const accounts = await ethers.getSigners()
        // const accountZero = accounts[0]
        deployer = (await getNamedAccounts()).deployer

        // deploy the contract
        // using hardhat deploy
        // we can specify which tags we want to deploy

        await deployments.fixture(["uniswaptest"])
        testUniswap = await ethers.getContract("TestUniswapLiquidity", deployer)
        await deployments.fixture(["genecoin"])
        geneCoin = await ethers.getContract("GeneCoin", deployer)
    })
    describe("variables", async function () {
        it("Should start with the factory address initialized on the goerli network", async function () {
            factoryAddress = await testUniswap.getFactoryAddress()
            const expectedValue = "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f"
            assert.equal(factoryAddress.toString(), expectedValue)
        })
        it("Should start with the router address initialized on the goerli network", async function () {
            routerAddress = await testUniswap.getRouterAddress()
            const expectedValue = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D"
            assert.equal(routerAddress.toString(), expectedValue)
        })
        it("Should start with the borncoin address initialized", async function () {
            bornCoinAddress = await testUniswap.getBorncoinAddress()
            const expectedValue = "0x9a46Bb993b88C81533AeeB79A456800EB372fc42"
            assert.equal(bornCoinAddress.toString(), expectedValue)
        })
        it("Should start with the genecoin address initialized", async function () {
            genecoinAddress = await testUniswap.getGenecoinAddress()
            const expectedValue = "0x9104BEcFf0a858bbf407Ff466E58EA1857fF33dF"
            assert.equal(genecoinAddress.toString(), expectedValue)
        })
    })
    describe("addLiquidity", async function () {
        const startAmount = 0
        const geneCoinAmount = 1000
        const amount = 100
        it("should check if the IERC20 balance is 0", async function () {
            const currentContractBalance = await geneCoin.balanceOf(
                testUniswap.address
            )
            assert.equal(currentContractBalance.toString(), startAmount)
        })
        it("should check the ERC20 allowance", async function () {
            const allowance = await geneCoin.allowance(
                deployer,
                testUniswap.address
            )
            assert.equal(startAmount, allowance.toString())
        })
        it("should check if the msg.sender genecoin balance = 1000", async function () {
            const senderGenecoinBalance = await geneCoin.balanceOf(deployer)
            assert.equal(senderGenecoinBalance.toString(), geneCoinAmount)
        })
        it("should check if the IERC20 transfer function works", async function () {
            const tx = await geneCoin.approve(testUniswap.address, amount)
            await tx.wait(1)
            const startContractBalance = await geneCoin.balanceOf(
                testUniswap.address
            )
            await testUniswap.transferToContract(geneCoin.address, amount)
            const afterContractBalance = await geneCoin.balanceOf(
                testUniswap.address
            )
            assert.equal(
                parseInt(startContractBalance + amount),
                parseInt(afterContractBalance)
            )
        })
        it("should check if the TransferTokensToContract function works", async function () {
            const startBalance = await geneCoin.balanceOf(testUniswap.address)
            genecoinAddress = await testUniswap.getGenecoinAddress()
            await testUniswap.transferTokensToContract(geneCoin.address, 1)
            const afterBalance = await geneCoin.balanceOf(testUniswap.address)
            assert.equal(startBalance, afterBalance)
        })
    })
})
