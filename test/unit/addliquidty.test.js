const { ethers, getNamedAccounts } = require("hardhat")
const { expect, assert, util } = require("chai")
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
        await deployments.fixture(["borncoin"])
        bornCoin = await ethers.getContract("BornCoin", deployer)
        await testUniswap.setInteractableERC20Contract(geneCoin.address)
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
        it("should check the contract callers balance", async function () {
            const callerBalance = await geneCoin.balanceOf(deployer)
            const contractBalance = await geneCoin.balanceOf(
                testUniswap.address
            )
            const correctBalance = parseInt(contractBalance + callerBalance)
            assert.equal(callerBalance.toString(), correctBalance.toString())
        })
        // it("should check if the interactable contract can be changed", async function () {
        //     const expectedValue = geneCoin.address
        //     const actualValue = await testUniswap.getInteractableERC20()
        //     assert.equal(expectedValue.toString(), actualValue.toString())
        // })
        it("should check if the approve function works", async function () {
            const contractAllowance = await geneCoin.allowance(
                deployer,
                testUniswap.address
            )
            const expectedValue = parseInt(contractAllowance + amount)
            await geneCoin.approve(testUniswap.address, amount)
            const actualValue = await geneCoin.allowance(
                deployer,
                testUniswap.address
            )
            assert.equal(expectedValue.toString(), actualValue.toString())
        })
        it("should check if the testUniswap transferToContract function works", async function () {
            await geneCoin.approve(testUniswap.address, amount)
            const startingContractBalance = await geneCoin.balanceOf(
                testUniswap.address
            )
            await testUniswap.transferTokensToContract(geneCoin.address, amount)
            const endingBalance = await geneCoin.balanceOf(testUniswap.address)
            assert.equal(
                parseInt(startingContractBalance + amount),
                parseInt(endingBalance)
            )
        })
        it("should check if the TransferTokensToContract function works", async function () {
            await geneCoin.approve(testUniswap.address, amount)
            const startBalance = await geneCoin.balanceOf(testUniswap.address)
            const expectedValue = parseInt(startBalance + amount)
            await testUniswap.transferTokensToContract(geneCoin.address, amount)
            const actualValue = await geneCoin.balanceOf(testUniswap.address)
            assert.equal(expectedValue.toString(), actualValue.toString())
        })
        it("should check if the addliquidity function works", async function () {
            let amountA = 10,
                amountB = 10
            //     tokenA = geneCoin.address,
            //     tokenB = bornCoin.address

            await geneCoin.approve(testUniswap.address, amountA)
            await bornCoin.approve(testUniswap.address, amountB)

            // await testUniswap.addLiquidity(tokenA, tokenB, amountA, amountB)

            // // const expectedValue;
            // // const actualValue;
            let tx = await testUniswap.addLiquidity(
                geneCoin.address,
                bornCoin.address,
                amountA,
                amountB,
                { from: deployer }
            )
            console.log("======= add liquidity ==========")
            for (const log of tx.logs) {
                console.log(`${logs.args.message} ${log.args.actualValue}`)
            }
        })
    })
})
