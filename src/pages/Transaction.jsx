import React, { useCallback, useState } from "react";
import { useParams } from "react-router-dom";

import Divider from "../components/UI/Divider";
import TabButton from "../components/UI/TabButton";
import TransactionOverview from "../containers/Transaction/TransactionOverview";
import TransactionState from "../containers/Transaction/TransactionState";
import InternalTransaction from "../containers/Transaction/InternalTransaction";
import GethTraces from "../containers/Transaction/GethTrace";
import ParityTrace from "../containers/Transaction/ParityTrace";
import useTransactionData from "../hooks/useTransactionData";
import CopyBlock from "../components/CopyBlock";

const TABS = [
  { id: 1, label: "Overview", value: "overview" },
  { id: 4, label: "Geth traces", value: "gethTrace" },

  { id: 2, label: "State", value: "state", disabled: true },
  { id: 3, label: "Internal Txs", value: "internalTxs", disabled: true },
  { id: 5, label: "Parity traces", value: "paratyTrace", disabled: true },
];

const Transaction = () => {
  const [activeTab, setActiveTab] = useState(TABS[0].value);

  const { hash } = useParams();
  const { transaction } = useTransactionData(hash);

  const onTabButtonClick = (id) => {
    setActiveTab(id);
  };

  const getActiveTabContent = useCallback(() => {
    if (activeTab === "overview") {
      return <TransactionOverview transaction={transaction} />;
    } else if (activeTab === "state") {
      return <TransactionState transaction={transaction} />;
    } else if (activeTab === "internalTxs") {
      return <InternalTransaction />;
    } else if (activeTab === "gethTrace") {
      return <GethTraces transaction={transaction} />;
    } else {
      return <ParityTrace transaction={transaction} />;
    }
  }, [activeTab, transaction]);

  return (
    <div className="p-6">
      <div>
        <div className="grid font-varela">
          <span className="col-span-16 font-bold text-lg">
            Transaction details
          </span>
          <div className="flex text-sm col-span-16 mx-1 my-3">
            <span className="mr-2 font-bold">Txn Hash:</span>
            <CopyBlock value={hash} />
          </div>
        </div>

        <Divider />

        <div className="flex mt-3">
          <TabButton
            defaultActiveKey={activeTab}
            items={TABS}
            onTabButtonClick={onTabButtonClick}
          />
        </div>

        <div>{getActiveTabContent()}</div>
      </div>
    </div>
  );
};

export default Transaction;
