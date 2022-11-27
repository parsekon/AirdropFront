// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {

  const TokenDrop = await ethers.getContractFactory("TokenDrop");
  const tokenDrop = await TokenDrop.deploy();

  await tokenDrop.deployed();

  const Airdrop = await ethers.getContractFactory("Airdrop");
  const airdrop = await Airdrop.deploy(tokenDrop.address, 100);

  await airdrop.deployed();

  console.log("Token Drop:", tokenDrop.address);
  console.log("Airdrop:", airdrop.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// Token Drop: 0xaC560B3BC37EC0B1D460292cf0aaD0dE54B39F84
// Airdrop: 0x6A806b89C1064D30Be241C48d8Ea27690dB89A66