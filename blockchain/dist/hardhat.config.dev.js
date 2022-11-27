"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

require("@nomicfoundation/hardhat-toolbox");

require("@nomiclabs/hardhat-etherscan");

require('dotenv').config();
/** @type import('hardhat/config').HardhatUserConfig */


module.exports = {
  solidity: "0.8.17",
  networks: _defineProperty({}, process.env.NETWORK, {
    url: process.env.INFURA_URL,
    accounts: [process.env.PRIVATE_KEY]
  }),
  etherscan: {
    apiKey: process.env.ETHERSCAN_API
  }
};