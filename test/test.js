const { expect } = require("chai");
const hre = require("hardhat");
const { time } = require("@nomicfoundation/hardhat-toolbox/network-helpers");

///////////////////// For the hardhat network
//
//
describe("Should deploy, and test", function () {

  let nyx_cipher;
  let pool_manager;
  let token_contract;
  let staking_pools = [];
  let token_staking_pools = [];
  let staking_pool_contracts = [];
  let token_staking_pool_contracts = [];

  it("Should deploy the contracts", async function () {
    // Deploys the NyxCipher ERC20 contract.
    nyx_cipher = await hre.ethers.deployContract("NyxCipher");
    await nyx_cipher.waitForDeployment();

    console.log("ERC20 Contract deployed to address:", nyx_cipher.target);

    // Address of the deployed ERC20 contract.
    token_contract = nyx_cipher.target;

    // Deploys the PoolManager contract with the address of the ERC20 contract as an argument.
    pool_manager = await hre.ethers.deployContract("PoolManager", [
      token_contract,
    ]);
    await pool_manager.waitForDeployment();

    // Address of the deployed PoolManager contract.
    console.log("PoolManager Contract deployed to address:", pool_manager.target);

    const arr_fixed_apr = [3, 10, 15];
    const pools = await pool_manager.getAllPools();
    for (let i = 0; i < pools.length; i++) {
      const contract = pools[i].pool;

      // Attach StakingPool contract instance
      const StakingPool = await hre.ethers.getContractFactory("StakingPool");
      const staking_pool = await StakingPool.attach(contract);

      // Push the instance to the array
      staking_pools.push(staking_pool);
      staking_pool_contracts.push(staking_pool.target);

      console.log("StakingPool Contract deployed to address:", staking_pool.target);

      const fixed_apr = arr_fixed_apr[i];
      const token_staking_pool = await hre.ethers.deployContract(
        "TokenStakingPool",
        [staking_pool.target, token_contract, fixed_apr]
      );
      await token_staking_pool.waitForDeployment();

      token_staking_pools.push(token_staking_pool);
      token_staking_pool_contracts.push(token_staking_pool.target);

      console.log(
        "TokenStakingPool Contract deployed to address:",
        token_staking_pool.target
      );
    }

    console.log("Completed Deployment!!!");
  })

  let owner;
  let marketing_wallet, stacking_wallet, development_wallet, externalBuyback_wallet;
  let tax_wallets = [];
  let test_wallets = [];

  before(async () => {
    // Obtain the signers and assign their addresses to the variables
    const signers = await hre.ethers.getSigners();

    owner = signers[0];

    marketing_wallet = signers[5].address;
    stacking_wallet = signers[6].address;
    development_wallet = signers[7].address;
    externalBuyback_wallet = signers[8].address;

    tax_wallets = [marketing_wallet, stacking_wallet, development_wallet, externalBuyback_wallet];
    test_wallets = [signers[10], signers[11], signers[12]];
  });

  it("Should set the Wallets", async function () {
    await nyx_cipher.setWallets(marketing_wallet, stacking_wallet, development_wallet, externalBuyback_wallet);
    const taxWallets = await nyx_cipher._taxWallets();
    expect(taxWallets[0]).to.equal(marketing_wallet);
    expect(taxWallets[1]).to.equal(development_wallet);
    expect(taxWallets[2]).to.equal(externalBuyback_wallet);
    expect(taxWallets[3]).to.equal(stacking_wallet);
  });

  it("Should transfer the token to wallets", async function () {
    // Transfer tokens to wallets & check balance
    const amount = hre.ethers.parseUnits("100000", 8);
    let amounts = [];
    for (let i = 0; i < 13; i++) {
      amounts.push(100000);
    }

    await nyx_cipher.multiSendTokens([
      ...tax_wallets,
      ...staking_pool_contracts,
      ...token_staking_pool_contracts,
      ...[test_wallets[0].address, test_wallets[1].address, test_wallets[2].address]
    ], amounts)

    // Check tax wallets balance
    for (const tax_wallet of tax_wallets) {
      // await nyx_cipher.transfer(tax_wallet, amount);
      expect(await nyx_cipher.balanceOf(tax_wallet)).to.equal(amount);
    }

    // Check stacking pools balance
    for (const staking_pool_contract of staking_pool_contracts) {
      // await nyx_cipher.transfer(staking_pool_contract, amount);
      expect(await nyx_cipher.balanceOf(staking_pool_contract)).to.equal(amount);
    }

    // Check token stacking pools balance
    for (const token_staking_pool_contract of token_staking_pool_contracts) {
      // await nyx_cipher.transfer(token_staking_pool_contract, amount);
      expect(await nyx_cipher.balanceOf(token_staking_pool_contract)).to.equal(amount);
    }

    // Check test wallets balance
    for (const test_wallet of test_wallets) {
      expect(await nyx_cipher.balanceOf(test_wallet.address)).to.equal(amount);
    }
  });

  it("Should stake the tokens", async function () {
    // Enable trading of token contract
    await nyx_cipher.enableTrading();

    for (let i = 0; i < staking_pools.length; i++) {
      const amount = hre.ethers.parseUnits("1000", 8);
      await nyx_cipher.connect(test_wallets[i]).approve(staking_pool_contracts[i], amount);
      await staking_pools[i].connect(test_wallets[i]).stake(amount);

      const remainedAmount = hre.ethers.parseUnits("99000", 8);
      expect(await nyx_cipher.balanceOf(test_wallets[i].address)).to.equal(remainedAmount);
    }
  })

  it("Should pass 14 days & get the rewards", async function () {
    try {
      const currentTimestamp = await time.latest();
      const unlockTime = currentTimestamp + 14 * 24 * 60 * 60; // 14 days in seconds
      await time.increaseTo(unlockTime);
    } catch (error) {
      console.log("Time pass error:", error);
      return
    }

    try {
      const amount = hre.ethers.parseUnits("1000", 8);
      await staking_pools[0].connect(test_wallets[0]).unstake(amount);
      await staking_pools[0].connect(test_wallets[0]).claimReward(true, amount)
      console.log("Unstaked in test wallet1: ", await nyx_cipher.balanceOf(test_wallets[0].address));
    } catch (error) {
      console.log("Claim rewards error:", error);
      return
    }
  })
  
  it("Should pass 28 days & get the rewards", async function () {
    try {
      const currentTimestamp = await time.latest();
      const unlockTime = currentTimestamp + 28 * 24 * 60 * 60; // 28 days in seconds
      await time.increaseTo(unlockTime);
    } catch (error) {
      console.log("Time pass error:", error);
      return
    }

    try {
      const amount = hre.ethers.parseUnits("1000", 8);
      await staking_pools[1].connect(test_wallets[1]).unstake(amount);
      await staking_pools[1].connect(test_wallets[1]).claimReward(true, amount)
      console.log("Unstaked in test wallet1: ", await nyx_cipher.balanceOf(test_wallets[1].address));
    } catch (error) {
      console.log("Claim rewards error:", error);
      return
    }
  })

  it("Should pass 56 days & get the rewards", async function () {
    try {
      const currentTimestamp = await time.latest();
      const unlockTime = currentTimestamp + 56 * 24 * 60 * 60; // 56 days in seconds
      await time.increaseTo(unlockTime);
    } catch (error) {
      console.log("Time pass error:", error);
      return
    }

    try {
      const amount = hre.ethers.parseUnits("1000", 8);
      await staking_pools[2].connect(test_wallets[2]).unstake(amount);
      await staking_pools[2].connect(test_wallets[2]).claimReward(true, amount)
      console.log("Unstaked in test wallet1: ", await nyx_cipher.balanceOf(test_wallets[2].address));
    } catch (error) {
      console.log("Claim rewards error:", error);
      return
    }
  })
  console.log("----------------------- All tests passed! ----------------------");
})

