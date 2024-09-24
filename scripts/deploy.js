// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

/**
 * Main function that deploys the ERC20 token, the PoolManager, and the TokenStakingPool contracts.
 * 
 * @return {Promise<void>} Promise that resolves when the deployment is completed.
 */
async function main() {
  // Deploys the NyxCipher ERC20 contract.
  const nyx_cipher = await hre.ethers.deployContract("NyxCipher");
  await nyx_cipher.waitForDeployment();

  console.log("ERC20 Contract deployed to address:", nyx_cipher.target);

  // Address of the deployed ERC20 contract.
  const token_contract = nyx_cipher.target;

  // Deploys the PoolManager contract with the address of the ERC20 contract as an argument.
  const pool_manager = await hre.ethers.deployContract("PoolManager", [
    token_contract,
  ]);
  await pool_manager.waitForDeployment();

  // Address of the deployed PoolManager contract.
  console.log("PoolManager Contract deployed to address:", pool_manager.target);

  const arr_fixed_apr = [3, 10, 15];
  const pools = await pool_manager.getAllPools();
  // Deploys the TokenStakingPool contract for each staking pool contract address, with the fixed APR as an argument.
  for (let i = 0; i < pools.length; i++) {
    const contract = pools[i].pool;

    // Attach StakingPool contract instance
    const StakingPool = await hre.ethers.getContractFactory("StakingPool");
    const staking_pool = await StakingPool.attach(contract);

    console.log("StakingPool Contract deployed to address:", staking_pool.target);

    const fixed_apr = arr_fixed_apr[i];
    const token_staking_pool = await hre.ethers.deployContract(
      "TokenStakingPool",
      [staking_pool.target, token_contract, fixed_apr]
    );
    await token_staking_pool.waitForDeployment();

    console.log(
      "TokenStakingPool Contract deployed to address:",
      token_staking_pool.target
    );
  }

  console.log("Completed Deployment!!!");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
