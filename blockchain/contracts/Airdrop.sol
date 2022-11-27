// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Airdrop is Ownable {
	IERC20 private _TOKEN;
	mapping (address => bool) public successAirdrops;
	uint public amountAirdrop;

    constructor(address _token, uint _value) {
        require(_token != address(0) && _value != 0);
        _TOKEN = IERC20(_token);
        amountAirdrop = _value;
    }

	modifier airdropNotMake() { 
		require (!successAirdrops[msg.sender], "Your address already received airdrop!"); 
		_; 
	}

	event AirdropReceived(address droper, uint value);
    event Withdraw(uint amount);
	
    // To distribute tokens, it is necessary to transfer the required number of tokens to the contract address
    // Any address gets an airdrop
	function getAirdrop() external airdropNotMake {
        successAirdrops[msg.sender] = true;
		_TOKEN.transfer(msg.sender, amountAirdrop);
		emit AirdropReceived(msg.sender, amountAirdrop);
	}

    // Changing the token
    function changeToken(address newToken) external onlyOwner {
        require(newToken != address(0), "Address not be zero!");
        _TOKEN = IERC20(newToken);
    }

	// Changing the amount of airdrop
	function changeAmountAirdrop(uint _amount) external onlyOwner {
        require(_amount != amountAirdrop && amountAirdrop != 0, "Change value");
		amountAirdrop = _amount;
	}

	// Removes the address from the list of addresses that received airdrop
	function cancelSuccessAirdrop(address _droper) external onlyOwner {
		require(successAirdrops[_droper], "This address not received airdrop!");
		successAirdrops[_droper] = false;
	}

	// Checking the balance of tokens on the contract
	function getBalance() external view returns(uint balance) {
		balance =  _TOKEN.balanceOf(address(this));
	}

    // Withdrawal of tokens to the wallet of the contract creator
	function withdrawToken() external onlyOwner {
		uint _amount = _TOKEN.balanceOf(address(this));
		require(_amount > 0, "Not enough tokens!");
		_TOKEN.transfer(msg.sender, _amount);
        emit Withdraw(_amount);
	}

    function renounceOwnership() public pure override  {
        revert();
    }

    receive() external payable {
        revert();
    }
}