import {
  ClipboardDocumentIcon,
  DocumentIcon,
} from "@heroicons/react/24/outline";
import React, { useCallback, useMemo, useState } from "react";
// @Todo: Replace with custom tailwind
import { Collapse } from "antd";
import useContractFunctions from "../../../hooks/useContractFunctions";

const AddressContractVerifiedReadFunction = ({ address, abi }) => {
  const { readFunctions, callReadFunction } = useContractFunctions(
    address,
    abi
  );
  const [results, setResults] = useState({});
  const [inputValues, setInputValues] = useState({});

  const handleReadFunction = useCallback(
    async (key) => {
      const functionName = readFunctions[key].name;
      const inputs = inputValues[key] || [];

      let inputArgs = [];
      Object.values(inputs).map((v) => inputArgs.push(v));
      if (!results[key]) {
        try {
          const result = await callReadFunction(functionName, ...inputArgs);
          setResults((prevResults) => ({ ...prevResults, [key]: result }));
        } catch (error) {
          console.error(`Error calling read function ${functionName}:`, error);
          setResults((prevResults) => ({
            ...prevResults,
            [key]: "Error fetching result",
          }));
        }
      }
    },
    [callReadFunction, readFunctions, results, inputValues]
  );

  const handleInputChange = (key, index, value) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [key]: {
        ...(prevValues[key] || []),
        [index]: value,
      },
    }));
  };

  const tabContent = useMemo(() => {
    return readFunctions.map((data, idx) => ({
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
          {data.inputs && data.inputs.length > 0 && (
            <div className="flex flex-col gap-2">
              {data.inputs.map((input, i) => (
                <input
                  key={i}
                  placeholder={input.name || `Input ${i + 1}`}
                  className="p-1 border border-gray-200 focus:border-gray-500 rounded-md"
                  onChange={(e) => handleInputChange(idx, i, e.target.value)}
                />
              ))}

              <div className="w-[100px]">
                <button
                  onClick={() => handleReadFunction(idx)}
                  className="my-2 px-4 py-0.5 bg-black text-white rounded-md"
                >
                  Execute
                </button>
              </div>
            </div>
          )}

          {results[idx] !== undefined && (
            <div>
              {readFunctions[idx].outputs &&
              readFunctions[idx].outputs.length > 0 ? (
                readFunctions[idx].outputs.map((output, outputIdx) => (
                  <p key={outputIdx}>
                    {output.type}:{" "}
                    {Array.isArray(results[idx])
                      ? results[idx][outputIdx]?.toString()
                      : results[idx]?.toString()}
                  </p>
                ))
              ) : (
                <p>No output</p>
              )}
            </div>
          )}
        </div>
      ),
    }));
  }, [readFunctions, results, inputValues]);

  return (
    <div className="flex flex-col">
      <div className="flex items-center mb-4">
        <DocumentIcon className="w-4 h-4 mr-2" />
        Supports reading the following contract function information
      </div>

      <div className="grid grid-cols-1 gap-4">
        {tabContent.map((item) => (
          <div key={item.key} className="rounded-md shadow-md">
            <Collapse
              accordion
              expandIconPosition="end"
              onChange={() => handleReadFunction(item.key)}
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

export default AddressContractVerifiedReadFunction;
