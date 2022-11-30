// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

// 0xaC560B3BC37EC0B1D460292cf0aaD0dE54B39F84

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TokenDrop is ERC20 {
    constructor() ERC20("Token Test Drop", "TTD") {
        _mint(msg.sender, 100000 * 10 ** decimals());
    }
}