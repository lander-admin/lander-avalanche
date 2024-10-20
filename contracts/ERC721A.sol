// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import 'erc721a/contracts/ERC721A.sol';
import { PriceFeedConsumer } from './interface/PriceFeed.sol';
import { IERC20 } from '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract Tomi204 is ERC721A {
  uint256 token_count;
  address public owner;
  uint256 price;

  // tokens prices contract
  PriceFeedConsumer public PricesContract;

  address public feeAddress;
  uint256 public constant FEE_PERCENTAGE = 7;

  IERC20 private ERC20Usdt;
  IERC20 private ERC20WBTC;
  IERC20 private ERC20WETH;
  IERC20 private ERC20USDC;

  event NftMinted(address requester, string token);

  constructor(uint256 _price) ERC721A('Tomi204', 'TOMI204') {
    owner = msg.sender;
    price = _price;
    feeAddress = 0xF414A98E991cd9654304E4Daa9f0978FFDB73bb2;

    feeAddress = 0xF414A98E991cd9654304E4Daa9f0978FFDB73bb2;
    ERC20Usdt = IERC20(0x5425890298aed601595a70AB815c96711a31Bc65); ///// in USDC TESTNET
    ERC20WBTC = IERC20(0xA089a21902914C3f3325dBE2334E9B466071E5f1);
    ERC20WETH = IERC20(0x5085f96Fab5A4F4cD6AceDf8054b431AaCf298f9);
    ERC20USDC = IERC20(0x5425890298aed601595a70AB815c96711a31Bc65);
    PricesContract = PriceFeedConsumer(
      0x6e1180674368878f6b67E1DCB6E4DFd0C102703A
    );
  }

  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  function tokenURI(
    uint256 tokenId
  ) public view virtual override returns (string memory) {
    require(
      _exists(tokenId),
      'ERC721Metadata: URI query for nonexistent token'
    );
    return
      'https://ipfs.io/ipfs/QmUoQKfU6UBdQUQ1u3dRjF6C5Z2Ekso6MfUjhn3d2LfgN3';
  }

  function mintUSDT(uint256 _quantity, address _to) external {
    uint256 amountInUSDT = priceInUSDT(_quantity);

    ///transfer ERC20
    bool transferSuccessful = ERC20Usdt.transferFrom(
      msg.sender,
      address(this),
      amountInUSDT
    );
    require(transferSuccessful, 'ERC20 transfer failed'); // check if the transfer was successful or not and revert if it failed
    token_count += _quantity;

    uint256 amount = ERC20Usdt.balanceOf(address(this));
    uint256 fee = calculateFee(amount);
    ERC20Usdt.transfer(feeAddress, fee);
    ERC20Usdt.transfer(owner, ERC20Usdt.balanceOf(address(this)));
    token_count += _quantity;

    _mint(_to, _quantity);
    emit NftMinted(msg.sender, 'USDT');
  }

  function mintWBTC(uint256 _quantity, address _to) external {
    uint256 amountInBTC = priceInBTC(_quantity);

    ///transfer ERC20
    bool transferSuccessful = ERC20WBTC.transferFrom(
      msg.sender,
      address(this),
      amountInBTC
    );

    require(transferSuccessful, 'ERC20 transfer failed'); // check if the transfer was successful or not and revert if it failed

    uint256 amount = ERC20WBTC.balanceOf(address(this));
    uint256 fee = calculateFee(amount);
    ERC20WBTC.transfer(feeAddress, fee);
    ERC20WBTC.transfer(owner, ERC20WBTC.balanceOf(address(this)));
    token_count += _quantity;

    _mint(_to, _quantity);
    emit NftMinted(msg.sender, 'WBTC');
  }

  function mintWETH(uint256 _quantity, address _to) external {
    uint256 amountInETH = priceInETH(_quantity);

    ///transfer ERC20
    bool transferSuccessful = ERC20WETH.transferFrom(
      msg.sender,
      address(this),
      amountInETH
    );

    require(transferSuccessful, 'ERC20 transfer failed'); // check if the transfer was successful or not and revert if it failed

    uint256 amount = ERC20WETH.balanceOf(address(this));
    uint256 fee = calculateFee(amount);
    ERC20WETH.transfer(feeAddress, fee);
    ERC20WETH.transfer(owner, ERC20WETH.balanceOf(address(this)));
    token_count += _quantity;

    _mint(_to, _quantity);
    emit NftMinted(msg.sender, 'WETH');
  }

  function mint(uint256 _quantity, address _to) external payable {
    uint256 amountInAVAX = priceInAvax(_quantity);
    require(msg.value >= amountInAVAX, 'Not enough money');

    uint256 fee = calculateFee(msg.value);
    payable(feeAddress).transfer(fee);
    payable(owner).transfer(address(this).balance);
    token_count += _quantity;

    _mint(_to, _quantity);
    emit NftMinted(msg.sender, 'AVAX');
  }

  function claimTo(address _to, uint256 _quantity) external payable {
    uint256 amountInUSDT = priceInUSDT(_quantity);

    bool transferSuccessful = ERC20USDC.transferFrom(
      msg.sender,
      address(this),
      amountInUSDT
    );
    require(transferSuccessful, 'ERC20 transfer failed'); // check if the transfer was successful or not and revert if it failed
    token_count += _quantity;

    _mint(_to, _quantity);
    emit NftMinted(msg.sender, 'FIAT PAYMENT - USDC');
  }

  function calculateFee(uint256 amount) internal pure returns (uint256) {
    return (amount * FEE_PERCENTAGE) / 100;
  }

  function priceInBTC(uint256 _quantity) public view returns (uint256) {
    uint256 BTCPriceInUSD = PricesContract.getLatestPriceBTC(); /// bitcoin price in usd
    uint256 nftCostInBitcoin = ((price * 1e8) / BTCPriceInUSD) * 100;
    return nftCostInBitcoin * _quantity;
  }

  function priceInETH(uint256 _quantity) public view returns (uint256) {
    uint256 ETHPriceInUSD = PricesContract.getLatestPriceETH(); /// bitcoin price in usd
    uint256 nftCostInETH = ((price * 1e18) / ETHPriceInUSD) * 100000 * 2;
    return nftCostInETH * _quantity;
  }

  function priceInUSDT(uint256 _quantity) public view returns (uint256) {
    return price * _quantity;
  }

  function priceInAvax(uint256 _quantity) public view returns (uint256) {
    uint256 AVAXPriceInUSD = PricesContract.getLatestPriceAVAX(); /// price in usd
    uint256 nftCostInAvax = ((price * 1e18) / AVAXPriceInUSD) * 100000 * 2;
    return nftCostInAvax * _quantity;
  }
}
