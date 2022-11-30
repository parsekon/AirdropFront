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
  var Airdrop, airdrop;
  return regeneratorRuntime.async(function main$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(ethers.getContractFactory("Airdrop"));

        case 2:
          Airdrop = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(Airdrop.deploy());

        case 5:
          airdrop = _context.sent;
          _context.next = 8;
          return regeneratorRuntime.awrap(airdrop.deployed());

        case 8:
          console.log("Airdrop:", airdrop.address);

        case 9:
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
});