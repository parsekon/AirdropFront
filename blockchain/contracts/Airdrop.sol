// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Airdrop is Ownable, Pausable {
	IERC20 private _TOKEN;
	mapping (address => bool) public successAirdrops;
	uint public amountAirdrop;
	address private _walletWithTokens;

	event AirdropReceived(address indexed droper, uint value);
	event SetNewToken(address token, address _newToken, address _newWallet, uint _amountDrop);
    event Withdraw(address to, uint amount);

	constructor() {
		pause();
	}

    // To distribute tokens, it is necessary to transfer the required number of tokens to the contract address
    // Any address gets an airdrop
	function getAirdrop() external whenNotPaused {
		require(address(_TOKEN) != address(0), "Airdrop is not started!");
		require (!successAirdrops[msg.sender], "Your address already received airdrop!");
		require(getBalance() >= amountAirdrop, "Insufficient balance");
        successAirdrops[msg.sender] = true;
		_TOKEN.transfer(msg.sender, amountAirdrop);
		emit AirdropReceived(msg.sender, amountAirdrop);
	}

	// Before start airdrop necessary approve amount of tokens
	function getAirdropWithApprove() external whenNotPaused {
		require(address(_TOKEN) != address(0), "Airdrop is not started!");
		require (!successAirdrops[msg.sender], "Your address already received airdrop!");
		require(_TOKEN.allowance(_walletWithTokens, address(this)) >= amountAirdrop, "Unfortunely, token is not approved!");
        successAirdrops[msg.sender] = true;
		_TOKEN.transferFrom(_walletWithTokens, msg.sender, amountAirdrop);
		emit AirdropReceived(msg.sender, amountAirdrop);
	}

    // Changing the token
  	function setTokenWalletAddrAmount(address _newToken, address _wallet, uint _value) external onlyOwner {
        setToken(_newToken);
		setWallet(_wallet);
		setAmountAirdrop(_value);
		emit SetNewToken(address(_TOKEN), _newToken, _wallet, _value);
    }

	// Changing the amount of airdrop
	function setAmountAirdrop(uint _amount) internal onlyOwner {
        require(_amount != 0, "Change value");
		amountAirdrop = _amount;
	}

	function setWallet(address _newWallet) internal onlyOwner {
		require(_newWallet != address(0), "Address not be zero!");
		_walletWithTokens = _newWallet;
	}

	function setToken(address _newToken) internal onlyOwner {
		require(_newToken != address(0), "Address not be zero!");
		_TOKEN = IERC20(_newToken);
	}

	// Checking the balance of tokens on the contract
	function getBalance() public view returns(uint balance) {
		balance =  _TOKEN.balanceOf(address(this));
	}

	function getApproved() public view returns(uint sum) {
		sum = _TOKEN.allowance(_walletWithTokens, address(this));
	}

    // Withdrawal of tokens to the wallet of the contract creator
	function withdrawToken(address _to) external onlyOwner {
		uint _amount = _TOKEN.balanceOf(address(this));
		require(_amount > 0, "Not enough tokens!");
		_TOKEN.transfer(_to, _amount);
        emit Withdraw(_to, _amount);
	}

	function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function renounceOwnership() public pure override  {
        revert();
    }
}