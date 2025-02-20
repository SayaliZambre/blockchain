// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract X1TestCoin is ERC20, Ownable {
    uint256 public constant INITIAL_SUPPLY = 1_000_000 * 10**18;
    uint256 public constant BURN_PERCENT = 5;
    uint256 public constant STAKING_REWARD_PERCENT = 1;

    mapping(address => uint256) public stakedBalances;
    mapping(address => uint256) public stakingTimestamps;

    constructor() ERC20("X1TestCoin", "X1T") {
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    function transfer(address recipient, uint256 amount) public override returns (bool) {
        uint256 burnAmount = (amount * BURN_PERCENT) / 100;
        uint256 transferAmount = amount - burnAmount;

        _burn(msg.sender, burnAmount);
        return super.transfer(recipient, transferAmount);
    }

    function stake(uint256 amount) public {
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");

        _transfer(msg.sender, address(this), amount);
        stakedBalances[msg.sender] += amount;
        stakingTimestamps[msg.sender] = block.timestamp;
    }

    function claimRewards() public {
        require(stakedBalances[msg.sender] > 0, "No staked balance");

        uint256 stakingDuration = (block.timestamp - stakingTimestamps[msg.sender]) / 1 days;
        uint256 reward = (stakedBalances[msg.sender] * STAKING_REWARD_PERCENT * stakingDuration) / 100;

        _mint(msg.sender, reward);
        stakingTimestamps[msg.sender] = block.timestamp;
    }

    function unstake() public {
        require(stakedBalances[msg.sender] > 0, "No staked balance");

        uint256 amount = stakedBalances[msg.sender];
        stakedBalances[msg.sender] = 0;

        _transfer(address(this), msg.sender, amount);
    }
}
