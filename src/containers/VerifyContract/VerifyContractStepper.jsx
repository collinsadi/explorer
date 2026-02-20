import React, { useEffect, useState } from "react";
import ContractDetails from "./ContractDetails";
import Stepper from "../../components/UI/Stepper";
import ContractVerificationAdvancedForm from "./ContractVerificationAdvanceForm";
import { compileContract } from "../../helpers/compileContract";
import {
  loadABIFromIndexedDB,
  saveABIToIndexedDB,
} from "../../services/dbService";
import { useNavigate, useParams } from "react-router-dom";
import { isContract } from "../../utils";

const STEPS = [
  {
    key: 1,
    label: "Enter Contract Details",
  },
  {
    key: 2,
    label: "Verify and Publish",
  },
];

const VerifyContractStepper = () => {
  const [step, setStep] = useState(1);
  const [contractDetails, setContractDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const { address } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const isVerified = async () => {
      const abi = await loadABIFromIndexedDB(address);
      const isContractAddress = await isContract(address);
      if (!!abi || !isContractAddress) navigate(`/address/${address}`);
    };
    isVerified();
  }, [address, navigate]);

  const onContinueClick = (contractData) => {
    setStep((s) => s + 1);
    setContractDetails({ ...contractData });
  };

  const onBackClick = () => setStep(step - 1);

  const onSubmitClick = async (advancedData) => {
    setLoading(true);
    setContractDetails((contractData) => ({
      ...contractData,
      ...advancedData,
    }));

    try {
      const abi = await compileContract({
        sourceCode: advancedData.sourceCode,
        compilerVersion: contractDetails.compilerVersion,
        optimization: true,
        runs: 200,
      });
      await saveABIToIndexedDB(contractDetails?.contractAddress, abi);
      navigate(`/address/${contractDetails.contractAddress}`);
    } catch (error) {
      console.error("Error generating ABI:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mt-5">
        <Stepper items={STEPS} current={step} />
      </div>

      <div className="my-6">
        {step === 1 && (
          <div>
            <ContractDetails
              step={step}
              contractDetails={contractDetails}
              onContinueClick={onContinueClick}
            />
          </div>
        )}
        {step === 2 && (
          <div>
            {loading ? (
              <p> Loading ... </p>
            ) : (
              <ContractVerificationAdvancedForm
                step={step}
                contractDetails={contractDetails}
                onBackClick={onBackClick}
                onSubmitClick={onSubmitClick}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyContractStepper;
