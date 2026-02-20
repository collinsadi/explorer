import React from "react";
import Tooltip from "../../components/UI/Tooltip";

const AddressOverview = ({ ethBalance, usdBalance }) => {
  return (
    <div className="">
      <h1 className="mt-5 font-varela font-bold text-lg mx-auto">Overview</h1>

      <div>
        <Tooltip text="Ethereum total asset value">
          <span className="cursor-pointer text-gray-500">
            Ethereum total asset value
          </span>
        </Tooltip>

        <div className="col-span-5 sm:col-span-4">
          <div className="flex items-center space-x-2">
            <div className="truncate">${usdBalance}</div>
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

export default AddressOverview;
