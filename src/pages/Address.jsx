import React from "react";
import { useParams } from "react-router-dom";

import Divider from "../components/UI/Divider";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import AddressOverview from "../containers/Address/AddressOverview";
import TransactionInfo from "../containers/Address/TransactionInfo";
import MoreInfo from "../containers/Address/MoreInfo";
import AddressSection from "../containers/Address/AddressSection";
import AddressContractSection from "../containers/Address/AddressContractSection";
import {
  useAddressTransactionDataV2,
  useAddressData,
  useContractDetails,
} from "../hooks";
import ContractInfo from "../containers/Address/ContractInfo";

const AddressPage = () => {
  const { address } = useParams();
  const { summary, isContractAddress } = useAddressData(address);
  const {
    transactions,
    latestTransaction,
    firstTransaction,
    totalTransactions,
    tokenTransfers,
    nftTransfers,
    contractDetails: contractCreationTx,
  } = useAddressTransactionDataV2(address, isContractAddress);

  const { contractDetails } = useContractDetails(address);

  return (
    <div className="p-6">
      <div>
        <div className="flex flex-col">
          <div className="flex align-middle font-varela items-center content-center">
            <span className="col-span-16 font-bold text-lg">Address </span>
            <span className="col-span-16 mx-2 text-md">{address}</span>
            <DocumentDuplicateIcon className="w-3 h-3" />
          </div>

          <span className="text-gray">ENS: ENS NAME 🔥 </span>
        </div>

        <Divider />

        <div className="grid grid-cols-3 gap-4">
          <AddressOverview
            ethBalance={summary.balance}
            usdBalance={summary.usdValue}
          />
          <TransactionInfo
            ethBalance={summary.balance}
            usdBalance={summary.usdValue}
          />
          {!isContractAddress ? (
            <MoreInfo
              totalTxs={totalTransactions || null}
              latestTx={latestTransaction || null}
              firstTx={firstTransaction || null}
            />
          ) : (
            <ContractInfo
              address={address}
              tokenInfo={contractDetails?.tokenInfo}
              creator={contractCreationTx?.from}
              txHash={contractCreationTx?.hash}
            />
          )}
        </div>

        <div>
          {/* For Address */}
          {!isContractAddress ? (
            <AddressSection
              transactions={transactions}
              tokenTransfers={tokenTransfers}
              nftTransfers={nftTransfers}
            />
          ) : (
            <AddressContractSection
              transactions={transactions}
              tokenTransfers={tokenTransfers}
              nftTransfers={nftTransfers}
              deploymentCode={contractCreationTx?.data}
              creationCode={contractDetails?.deploymentCode}
              contractCreator={contractCreationTx?.from}
              contractTxHash={contractCreationTx?.hash}
            />
          )}

          {/* For Contracts */}
          {/* <AddressContractSection /> */}
        </div>
      </div>
    </div>
  );
};

export default AddressPage;
