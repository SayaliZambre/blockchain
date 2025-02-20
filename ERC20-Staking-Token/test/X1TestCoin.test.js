const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("X1TestCoin", function () {
  let token, owner, addr1, addr2;

  beforeEach(async () => {
    [owner, addr1, addr2] = await ethers.getSigners();
    const Token = await ethers.getContractFactory("X1TestCoin");
    token = await Token.deploy();
  });

  it("Should deploy with correct initial supply", async () => {
    expect(await token.totalSupply()).to.equal(ethers.parseEther("1000000"));
  });

  it("Should burn 5% on transfer", async () => {
    await token.transfer(addr1.address, ethers.parseEther("100"));
    expect(await token.balanceOf(addr1.address)).to.equal(ethers.parseEther("95"));
  });

  it("Should allow staking and claim rewards", async () => {
    await token.transfer(addr1.address, ethers.parseEther("200"));
    await token.connect(addr1).stake(ethers.parseEther("100"));
    expect(await token.stakedBalances(addr1.address)).to.equal(ethers.parseEther("100"));

    // Simulate time passing (1 day)
    await ethers.provider.send("evm_increaseTime", [86400]);
    await ethers.provider.send("evm_mine");

    await token.connect(addr1).claimRewards();
    expect(await token.balanceOf(addr1.address)).to.be.above(ethers.parseEther("100"));
  });
});
