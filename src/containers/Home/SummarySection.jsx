import React from "react";
import Title from "../../components/UI/Title";
import SummaryCard from "../../components/SummaryCard";

const SummarySection = ({
  blockHeight,
  avgGasPrice,
  cumulativeTxCount,
  txn24hVolume,
  txnCost24hVolume,
  isLoading,
}) => {
  return (
    <div className="container py-8 mx-auto">
      <div className="flex justify-between items-center">
        <Title>Summary</Title>
      </div>
      <SummaryCard
        isLoading={isLoading}
        blockHeight={blockHeight}
        avgGasPrice={avgGasPrice}
        cumulativeTxCount={cumulativeTxCount}
        txn24hVolume={txn24hVolume}
        txnCost24hVolume={txnCost24hVolume}
      />
    </div>
  );
};

export default SummarySection;
