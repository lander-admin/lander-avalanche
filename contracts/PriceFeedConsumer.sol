// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import '@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol';

/**
 * @title The PriceConsumerV3 contract
 * @notice Acontract that returns latest price from Chainlink Price Feeds
 */
contract PriceFeedConsumer {
  AggregatorV3Interface internal priceFeedBTC;
  AggregatorV3Interface internal priceFeedAVAX;
  AggregatorV3Interface internal priceFeedETH;
  AggregatorV3Interface internal priceFeedUSDTUsd;

  constructor() {
    priceFeedBTC = AggregatorV3Interface(
      0x31CF013A08c6Ac228C94551d535d5BAfE19c602a
    );

    priceFeedAVAX = AggregatorV3Interface(
      0x5498BB86BC934c8D34FDA08E81D444153d0D06aD
    );

    priceFeedETH = AggregatorV3Interface(
      0x86d67c3D38D2bCeE722E601025C25a575021c6EA
    );

    priceFeedUSDTUsd = AggregatorV3Interface(
      0x7898AcCC83587C3C55116c5230C17a6Cd9C71bad
    );
  }

  /**
   * @notice Returns the latest price
   *
   * @return latest price
   */

  function getLatestPriceAVAX() external view returns (uint256) {
    (, int256 price, , , ) = priceFeedAVAX.latestRoundData();

    return uint(price);
  }

  function getLatestPriceETH() external view returns (uint256) {
    (, int256 price, , , ) = priceFeedETH.latestRoundData();

    return uint(price);
  }

  function getLatestPriceBTC() external view returns (uint256) {
    (, int256 price, , , ) = priceFeedBTC.latestRoundData();

    return uint(price);
  }

  function getLastestPriceUSDTUsd() external view returns (uint256) {
    (, int256 price, , , ) = priceFeedUSDTUsd.latestRoundData();

    return uint(price);
  }
}
