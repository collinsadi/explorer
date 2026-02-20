import React from "react";
import VerifyContractStepper from "../containers/VerifyContract/VerifyContractStepper";

const VerifyContract = () => {
  return (
    <div className="p-6 sm:p-32">
      <div className="flex flex-col justify-center text-center">
        <div className="text-2xl font-bold">
          Verify & Publish Contract Source Code
        </div>
        <div className="mt-3 text-md sm:px-32">
          Source code verification provides transparency for users interacting
          with smart contracts. By uploading the source code, Etherscan will
          match the compiled code with that on the blockchain. Read more.
        </div>

        <div>
          <VerifyContractStepper />
        </div>
      </div>
    </div>
  );
};

export default VerifyContract;
