const { ethers, getNamedAccounts } = require("hardhat")
const { expect, assert } = require("chai")
const { deployments } = require("hardhat")
describe("GeneCoin", function () {
    let geneCoin, deployer

    beforeEach(async function () {
        //get the signer
        deployer = (await getNamedAccounts()).deployer

        //get the contract
        await deployments.fixture(["genecoin"])
        geneCoin = await ethers.getContract("GeneCoin", deployer)
    })
    describe("Variables", async function () {
        it("should start with a max allowed supply of 10000", async function () {
            const expectedValue = 10000
            const actualValue = await geneCoin.maxSupply()
            assert.equal(expectedValue, actualValue.toString())
        })
    })
})
