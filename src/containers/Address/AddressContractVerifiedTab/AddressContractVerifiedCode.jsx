import React from "react";
import CodeBlock from "../../../components/UI/CodeBlock";

const AddressContractVerifiedCode = ({ creationCode, abi, deploymentCode }) => {
  return (
    <div className="flex flex-col">
      <div className="">
        <CodeBlock
          label="Contract creation bytecode"
          content={creationCode}
          showCopy
        />
      </div>

      <div className="mt-6">
        <CodeBlock
          label="Contract ABI"
          content={JSON.stringify(abi)}
          showCopy
        />
      </div>
      <div className="mt-6">
        <CodeBlock
          label="Deployed Bytecode"
          content={deploymentCode}
          showCopy
        />
      </div>
    </div>
  );
};

export default AddressContractVerifiedCode;
