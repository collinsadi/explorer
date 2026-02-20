import React, { useMemo, useState, useEffect } from "react";
import Button from "../../components/UI/Button";
import { getSolidityCompilerVersions } from "../../helpers/getSolidityCompilerVersions";

const ContractDetails = ({ contractDetails, onContinueClick }) => {
  // @Todo: Fix this component
  const [solidityVersions, setSolidityVersions] = useState([]);

  const [contractAddress, setContractAddress] = useState(
    contractDetails?.contractAddress || ""
  );
  const [compilerType, setCompilerType] = useState(
    contractDetails?.compilerType || "solc"
  );
  const [compilerVersion, setCompilerVersion] = useState(
    contractDetails?.compilerVersion || ""
  );
  const [licenseType, setLicenseType] = useState(
    contractDetails?.licenseType || "mit"
  );

  useEffect(() => {
    const fetchVersions = async () => {
      const data = await getSolidityCompilerVersions();
      setSolidityVersions(data?.releases);
    };

    fetchVersions();
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    onContinueClick({
      contractAddress,
      compilerType,
      compilerVersion,
      licenseType,
    });
  };

  const solcVersions = useMemo(() => {
    if (!solidityVersions) return [];
    let data = [];

    Object.entries(solidityVersions).map(([k, v], idx) => {
      data.push({ key: idx, label: v, value: k });
    });

    return data;
  }, [solidityVersions]);

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[70%] mx-auto p-4 bg-white shadow-md rounded-md text-left"
    >
      <h2 className="text-lg font-semibold mb-4">Enter Contract Details</h2>

      {/* Contract Address Input */}
      <label
        className="block text-sm font-medium mb-1"
        htmlFor="contractAddress"
      >
        Please enter the Contract Address you would like to verify
      </label>
      <input
        required
        type="text"
        id="contractAddress"
        value={contractAddress}
        onChange={(e) => setContractAddress(e.target.value)}
        placeholder="0x..."
        className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-gray-500"
      />

      {/* Compiler Type Dropdown */}
      <label className="block text-sm font-medium mb-1" htmlFor="compilerType">
        Please select Compiler Type
      </label>
      <select
        required
        id="compilerType"
        value={compilerType}
        onChange={(e) => setCompilerType(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-gray-500"
      >
        <option value="">Please Select</option>
        <option value="solc">Solidity</option>
        <option value="vyper">Vyper</option>
      </select>

      {/* Compiler Version Dropdown */}

      <label
        className="block text-sm font-medium mb-1"
        htmlFor="contractAddress"
      >
        Please select Compiler Version
      </label>
      <select
        required
        id="compilerType"
        value={compilerVersion}
        onChange={(e) => setCompilerVersion(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-gray-500"
      >
        <option value="">Please Select</option>
        {solcVersions?.map(({ key, value, label }) => {
          return (
            <option key={key} value={value}>
              {label}
            </option>
          );
        })}
      </select>

      {/* License Type Dropdown */}
      <label className="block text-sm font-medium mb-1" htmlFor="licenseType">
        Please select Open Source License Type
      </label>
      <select
        required
        id="licenseType"
        value={licenseType}
        onChange={(e) => setLicenseType(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:border-gray-500"
      >
        <option value="">Please Select</option>
        <option value="mit">MIT</option>
        <option value="gpl">GPL-3.0</option>
        <option value="apache">Apache-2.0</option>
      </select>

      {/* Terms Checkbox */}
      {/* <div className="flex items-center mb-4">
        <input
          type="checkbox"
          id="terms"
          checked={agreedToTerms}
          onChange={() => setAgreedToTerms(!agreedToTerms)}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-gray-500"
        />
        <label htmlFor="terms" className="ml-2 text-sm">
          I agree to the{" "}
          <a href="/terms" className="text-blue-600 underline">
            terms of service
          </a>
        </label>
      </div> */}

      <div className="px-2 mt-4 mb-0 flex max-w-md m-auto">
        <Button label="Continue" type="submit" />
      </div>
    </form>
  );
};

export default ContractDetails;
