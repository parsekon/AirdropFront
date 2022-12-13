// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");
const hre = require("hardhat");

// async function main() {

//   const Airdrop = await ethers.getContractFactory("Airdrop");
//   const airdrop = await Airdrop.deploy();

//   await airdrop.deployed();

//   console.log("Airdrop:", airdrop.address);
// }

// // We recommend this pattern to be able to use async/await everywhere
// // and properly handle errors.
// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });

require("dotenv").config();

const arrayOfContractsNames = [{ title: "Airdrop", args: [] }];

async function main() {
  const arrLength = arrayOfContractsNames.length;

  if (arrLength === 0) {
    console.log("Nothing to deploy");
    return;
  }

  console.log(
    `Start deploying of ${arrLength} contract${arrLength > 1 ? "s" : ""}`
  );

  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  for (let i = 0; i < arrayOfContractsNames.length; i++) {
    const title = arrayOfContractsNames[i].title;
    const args = arrayOfContractsNames[i].args;
    console.log(`Deploying contract #${i + 1} with title ${title}`);
    const Contract = await ethers.getContractFactory(title);
    const contract = await Contract.deploy(...args);
    await contract.deployed();
    console.log(`Deploy finished. ${title} address: ${contract.address}`);
    saveABIForClient(contract, title);
  }
}

function saveABIForClient(contract, name) {
  const fs = require("fs");
  const contractsDir = __dirname + "/../../client/abi/contracts";
  const providerDir = __dirname + "/../../client/abi/providers";
  const TokenArtifact = artifacts.readArtifactSync(name);

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir);
    console.log("Crontracts directory created.");
  }

  if (!fs.existsSync(providerDir)) {
    fs.mkdirSync(providerDir);
    console.log("Providers directory created.");
  }

  if (!fs.existsSync(`${providerDir}/defaultProvider.js`)) {
    fs.writeFileSync(
      `${providerDir}/defaultProvider.js`,
      `import { ethers } from "ethers";

      const defaultProvider = new ethers.providers.InfuraProvider("${process.env.NETWORK}");
      
      export default defaultProvider;
  `
    );
    console.log("defaultProvider created");
  }

  if (!fs.existsSync(`${providerDir}/walletProvider.js`)) {
    fs.writeFileSync(
      `${providerDir}/walletProvider.js`,
      `import { ethers } from "ethers";

      let walletProvider;
      
      if(typeof window !== 'undefined' && window?.ethereum) {
          walletProvider = new ethers.providers.Web3Provider(window.ethereum);
      }
      
      export default walletProvider;
  `
    );
    console.log("walletProvider created");
  }

  fs.writeFileSync(
    `${contractsDir}/${lowercaseFirstLetter(name)}.js`,
    `import { ethers } from "ethers";
    import defaultProvider from "../providers/defaultProvider"; 
   
const addressAirdropContract = "${contract.address}";

const abiAirdrop = ${JSON.stringify(TokenArtifact.abi, null, 2)};

const ${lowercaseFirstLetter(
      name
    )} = new ethers.Contract(addressAirdropContract,
      abiAirdrop,
      defaultProvider);

export default ${lowercaseFirstLetter(name)};
`
  );
  console.log(`Instance ${lowercaseFirstLetter(name)}.js created.`);
}

function lowercaseFirstLetter(string) {
  return string.charAt(0).toLowerCase() + string.slice(1);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
