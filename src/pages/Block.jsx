import React, { useCallback, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

import Divider from "../components/UI/Divider";
import TabButton from "../components/UI/TabButton";
import BlockOverview from "../containers/Block/BlockOverview";
import BlockTransactions from "../containers/Block/BlockTransaction";
import InternalTransaction from "../containers/Block/InternalTransaction";
import TokenTransfer from "../containers/Block/TokenTransfer";
import Withdrawals from "../containers/Block/Withdrawals";
import { useNavigate, useParams } from "react-router-dom";
import useBlockData from "../hooks/useBlockData";

const TABS = [
  { id: "overview", label: "Overview", value: "overview" },
  { id: "transaction", label: "Transactions", value: "transaction" },
  {
    id: "internalTxs",
    label: "Internal Txs",
    value: "internalTxs",
    disabled: true,
  },
  {
    id: "tokenTransfer",
    label: "Token Transfers",
    value: "tokenTransfer",
    disabled: true,
  },
  {
    id: "withdrawal",
    label: "Withdrawals",
    value: "withdrawal",
    disabled: true,
  },
];

const Block = () => {
  const [activeTab, setActiveTab] = useState(TABS[0].value);

  const { id } = useParams();
  const navigate = useNavigate();

  const { block } = useBlockData(Number(id));

  const onTabButtonClick = (id) => {
    setActiveTab(id);
  };

  const onPreviousBlockClick = (event) => {
    event.preventDefault();
    navigate(`/block/${Number(id) - 1}`, { replace: false });
  };

  const onNextBlockClick = (event) => {
    event.preventDefault();
    navigate(`/block/${Number(id) + 1}`, { replace: false });
  };

  const getActiveTabContent = useCallback(() => {
    if (activeTab === "overview") {
      return <BlockOverview block={block} />;
    } else if (activeTab === "transaction") {
      return <BlockTransactions block={block} />;
    } else if (activeTab === "internalTxs") {
      return <InternalTransaction block={block} />;
    } else if (activeTab === "tokenTransfer") {
      return <TokenTransfer block={block} />;
    } else {
      return <Withdrawals block={block} />;
    }
  }, [activeTab, id, block]);

  return (
    <div className="p-6">
      <div>
        <div className="flex flex-row font-varela font-bold">
          <span className="text-lg">Block</span>
          <div className="flex flex-row justify-items-center items-center ml-4">
            <ChevronLeftIcon
              className="w-3 h-3 cursor-pointer"
              onClick={onPreviousBlockClick}
            />
            <span className="text-md mx-1">{id || ""}</span>
            <ChevronRightIcon
              className="w-3 h-3 cursor-pointer"
              onClick={onNextBlockClick}
            />
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

export default Block;
