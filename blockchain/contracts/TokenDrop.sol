// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TokenDrop is ERC20 {
    constructor() ERC20("Token Test Drop", "TTD") {
        _mint(msg.sender, 100000 * 10 ** decimals());
    }
}