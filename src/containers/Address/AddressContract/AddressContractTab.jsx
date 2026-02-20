import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import React from "react";
import CodeBlock from "../../../components/UI/CodeBlock";
import { truncateAddress } from "../../../utils";
import { useNavigate, useParams } from "react-router-dom";

const CONTRACT_NAVIGATIONS = [
  {
    id: 1,
    label: "Verify the contract",
    to: "/verify-contract",
    isActive: true,
  },
  {
    id: 2,
    label: "Is this a proxy",
    to: "/is-this-proxy",
    isActive: false,
    icon: <ArrowRightIcon className="w-3 h-3 ml-1.5" />,
  },
  {
    id: 1,
    label: "Verify with API",
    to: "/verify-with-api",
    isActive: false,
    icon: <ArrowRightIcon className="w-3 h-3 ml-1.5" />,
  },
];

const AddressContractTab = ({
  deploymentCode,
  creationCode,
  contractCreator,
  contractTxHash,
}) => {
  const navigate = useNavigate();
  const { address } = useParams();

  const onRedirectClick = (to) => {
    navigate(`${to}/${address}`);
  };

  return (
    <div className="flex flex-col">
      <div className="">
        <div className="flex text-center items-center my-2 text-black font-semibold">
          <InformationCircleIcon className="w-4 h-4 mr-2" />
          <span>Contract source code unverified</span>
        </div>
        <div className="my-2 text-sm">
          This contract was created by&nbsp;
          {truncateAddress(contractCreator)} on&nbsp;
          {contractTxHash}
        </div>
      </div>

      <div className="flex">
        {CONTRACT_NAVIGATIONS.map(({ label, id, isActive, icon, to }) => {
          return (
            <div>
              <button
                key={id}
                className={`flex justify-center items-center max-w-fit mx-1 my-4 p-2 rounded-md  ${
                  isActive
                    ? "bg-black text-white "
                    : "bg-white text-black hover:bg-gray-800 hover:text-white"
                }`}
                onClick={() => onRedirectClick(to)}
              >
                {label} {!!icon && icon}
              </button>
            </div>
          );
        })}
      </div>

      <div>
        <CodeBlock
          label="Contract deployment bytecode"
          content={deploymentCode}
        />
      </div>

      <div className="mt-6">
        <CodeBlock label="Contract creation bytecode" content={creationCode} />
      </div>
    </div>
  );
};

export default AddressContractTab;
