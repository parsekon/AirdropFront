"use strict";

// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
var _require = require("hardhat"),
    ethers = _require.ethers;

var hre = require("hardhat");

function main() {
  var TokenDrop, tokenDrop, Airdrop, airdrop;
  return regeneratorRuntime.async(function main$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(ethers.getContractFactory("TokenDrop"));

        case 2:
          TokenDrop = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(TokenDrop.deploy());

        case 5:
          tokenDrop = _context.sent;
          _context.next = 8;
          return regeneratorRuntime.awrap(tokenDrop.deployed());

        case 8:
          _context.next = 10;
          return regeneratorRuntime.awrap(ethers.getContractFactory("Airdrop"));

        case 10:
          Airdrop = _context.sent;
          _context.next = 13;
          return regeneratorRuntime.awrap(Airdrop.deploy(tokenDrop.address, 100));

        case 13:
          airdrop = _context.sent;
          _context.next = 16;
          return regeneratorRuntime.awrap(airdrop.deployed());

        case 16:
          console.log("Token Drop:", tokenDrop.address);
          console.log("Airdrop:", airdrop.address);

        case 18:
        case "end":
          return _context.stop();
      }
    }
  });
} // We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.


main()["catch"](function (error) {
  console.error(error);
  process.exitCode = 1;
}); // Token Drop: 0xaC560B3BC37EC0B1D460292cf0aaD0dE54B39F84
// Airdrop: 0x6A806b89C1064D30Be241C48d8Ea27690dB89A66