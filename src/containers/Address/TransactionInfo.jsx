import React from "react";
import Tooltip from "../../components/UI/Tooltip";

const TransactionInfo = ({ ethBalance, usdBalance }) => {
  return (
    <div>
      <h1 className="mt-5 font-varela font-bold text-lg mx-auto">More info</h1>

      <div>
        <Tooltip text="The total value and allocation of assets held by this address across different networks, including native tokens, fungible tokens, and DeFi-related products. Updated every hour.">
          <span className="cursor-pointer text-gray-500">
            Multi-chain asset allocation
          </span>
        </Tooltip>

        <div className="col-span-5 sm:col-span-4">
          <div className="flex items-center space-x-2">
            <div className="truncate">N/A</div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <span className="cursor-pointer text-gray-500">ETH holdings</span>
        <div className="col-span-5 sm:col-span-4">
          <div className="flex items-center space-x-2">
            <div className="truncate">{ethBalance} ETH</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionInfo;
