import React, { useState, useCallback, useMemo } from "react";
import {
  ClipboardDocumentIcon,
  DocumentIcon,
} from "@heroicons/react/24/outline";
import { Collapse } from "antd";
import useContractFunctions from "../../../hooks/useContractFunctions";
import { Link } from "react-router-dom";
import { truncateAddress } from "../../../utils";

const AddressContractVerifiedWriteFunction = ({ address, abi }) => {
  const { writeFunctions, callWriteFunction } = useContractFunctions(
    address,
    abi
  );
  const [txStatus, setTxStatus] = useState({});
  const [inputValues, setInputValues] = useState({});

  // Handle input change for each parameter of write functions
  const handleInputChange = (key, index, value) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [key]: {
        ...(prevValues[key] || []),
        [index]: value,
      },
    }));
  };

  // Function to execute the write function with the provided input values
  const handleWriteFunction = useCallback(
    async (event, key) => {
      event.preventDefault();
      const functionName = writeFunctions[key].name;
      const inputs = Object.values(inputValues[key] || {});

      try {
        setTxStatus((prevStatus) => ({
          ...prevStatus,
          [key]: { status: "pending" },
        }));

        const tx = await callWriteFunction(functionName, ...inputs);
        setTxStatus((prevStatus) => ({
          ...prevStatus,
          [key]: { status: "pending", transactionHash: tx?.hash },
        }));

        await tx?.wait();

        if (!tx?.hash) {
          setTxStatus((prevStatus) => ({
            ...prevStatus,
            [key]: { status: "failed" },
          }));
        } else {
          setTxStatus((prevStatus) => ({
            ...prevStatus,
            [key]: { status: "Success", transactionHash: tx?.hash },
          }));
        }
      } catch (error) {
        console.error(`Error calling write function ${functionName}:`, error);
        setTxStatus((prevStatus) => ({
          ...prevStatus,
          [key]: { status: "error" },
        }));
      }
    },
    [callWriteFunction, writeFunctions, inputValues]
  );

  // Prepare tab content with dynamic inputs for each write function
  const tabContent = useMemo(() => {
    return writeFunctions.map((data, idx) => ({
      key: idx.toString(),
      label: `${idx + 1}. ${data.name}`,
      extra: (
        <ClipboardDocumentIcon
          className="h-5 w-5"
          onClick={(event) => {
            event.stopPropagation();
          }}
        />
      ),
      children: (
        <div>
          <p>Function: {data.name}</p>

          {data.inputs && data.inputs.length > 0 && (
            <div className="flex flex-col gap-2">
              {data.inputs.map((input, i) => (
                <input
                  key={i}
                  placeholder={input.name || `Input ${i + 1} (${input.type})`}
                  className="border border-gray-200 focus:border-gray-500 p-1 rounded-md"
                  onChange={(e) => handleInputChange(idx, i, e.target.value)}
                />
              ))}
              <div className="w-[100px]">
                <button
                  onClick={(event) => handleWriteFunction(event, idx)}
                  className="my-2 px-4 py-0.5 bg-black text-white rounded-md"
                >
                  Execute
                </button>
              </div>
            </div>
          )}

          <p>
            {txStatus[idx]?.status && `Status: ${txStatus[idx]?.status}`}
            {txStatus[idx]?.transactionHash && (
              <span>
                {" "}
                (Tx Hash:
                <Link to={`/tx/${txStatus[idx].transactionHash}`}>
                  {truncateAddress(txStatus[idx].transactionHash)}
                </Link>
                )
              </span>
            )}
          </p>
        </div>
      ),
    }));
  }, [writeFunctions, txStatus, inputValues]);

  return (
    <div className="flex flex-col">
      <div className="flex items-center my-2">
        <DocumentIcon className="w-4 h-4 mr-2" />
        Supports writing to the following contract function information
      </div>

      <div className="grid grid-cols-1 gap-4 mt-4">
        {tabContent.map((item) => (
          <div key={item.key} className="rounded-md shadow-md">
            <Collapse
              accordion
              expandIconPosition="end"
              items={[
                {
                  ...item,
                  collapsible: "header",
                },
              ]}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddressContractVerifiedWriteFunction;
