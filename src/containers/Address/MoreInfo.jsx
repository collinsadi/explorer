import React from "react";
import Tooltip from "../../components/UI/Tooltip";
import { truncateAddress } from "../../utils";

const MoreInfo = ({ totalTxs, latestTx, firstTx }) => {
  return (
    <div>
      <h1 className="mt-5 font-varela font-bold text-lg mx-auto">Txn info</h1>

      <div>
        <Tooltip text="The total transactions initiated by this address and the sum of transaction fees. Only “Transactions”, token transfers, and NFT transfers are counted.">
          <span className="cursor-pointer text-gray-500">
            Total txns initiated
          </span>
        </Tooltip>

        <div className="col-span-5 sm:col-span-4">
          <div className="flex items-center space-x-2">
            <div className="truncate">{totalTxs} Txs</div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <span className="cursor-pointer text-gray-500">Latest txn sent</span>
        <div className="col-span-5 sm:col-span-4">
          <div className="flex items-center space-x-2">
            <div className="truncate">
              {!!latestTx
                ? truncateAddress(latestTx?.hash, 10)
                : "NO TRANSACTIONS RECORDED"}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <span className="cursor-pointer text-gray-500">First txn sent</span>
        <div className="col-span-5 sm:col-span-4">
          <div className="flex items-center space-x-2">
            <div className="truncate">
              {!!firstTx
                ? truncateAddress(firstTx?.hash, 10)
                : "NO TRANSACTIONS RECORDED"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreInfo;
