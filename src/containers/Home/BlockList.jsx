import React from "react";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

import BlockCard from "../../components/UI/BlockCard";
import Title from "../../components/UI/Title";
import Button from "../../components/UI/Button";
import { useNavigate } from "react-router-dom";

const BlockListCard = ({ blocks, transactions, isLoading }) => {
  const navigate = useNavigate();

  const onBlockClick = () => {
    navigate("/block-list");
  };

  const onTransactionClick = () => {
    navigate("/txs");
  };

  return (
    <div className="container py-8 mx-auto">
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
        <div className="shadow-md border rounded p-6 overflow-hidden hidden md:block">
          <div className="flex justify-between items-center mb-4 px-2">
            <Title className="p-0">Blocks</Title>

            <ArrowRightIcon
              className="ml-2 w-4 h-4 cursor-pointer"
              onClick={onBlockClick}
            />
          </div>
          <div className="divide-y max-h-[470px] overflow-scroll">
            {blocks.map((block, index) => (
              <BlockCard isLoading={isLoading} key={index} {...block} />
            ))}
          </div>
          <div className="px-2 mt-4 mb-0 flex w-full">
            <Button label="Show All" onClick={onBlockClick} />
          </div>
        </div>

        <div className="shadow-md border rounded p-6 overflow-hidden">
          <div className="flex justify-between items-center mb-4 px-2">
            <Title className="p-0">Transactions</Title>

            <ArrowRightIcon
              className="ml-2 w-4 h-4 cursor-pointer"
              onClick={onTransactionClick}
            />
          </div>
          <div className="divide-y max-h-[470px] overflow-scroll">
            {transactions.map((block, index) => (
              <BlockCard
                isLoading={isLoading}
                key={index}
                {...block}
                isTransaction
              />
            ))}
          </div>
          <div className="px-2 mt-4 mb-0 flex w-full">
            <Button label="Show All" onClick={onTransactionClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockListCard;
