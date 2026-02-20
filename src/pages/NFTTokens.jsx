import React, { useMemo, useState } from "react";
import { Table } from "antd";
import { getNFTTokenColumnConfig } from "../config";
import { useTokenList } from "../hooks";

const NFTTokens = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { tokens, loading } = useTokenList("nft"); // or 1155

  const onTableChange = (pagination) => {
    setPageNumber(() => pagination.current);
  };

  return (
    <div className="p-6">
      <div className="flex text-gray-500 text-sm justify-between">
        <span>Total {tokens?.length} transactions for token transfer </span>
      </div>

      <Table
        size="large"
        className={`mt-4 overflow-x-scroll ${loading && "animate-pulse"}`}
        columns={[...getNFTTokenColumnConfig()]}
        dataSource={tokens || []}
        onChange={onTableChange}
        pagination={{
          position: "bottom-right",
          current: pageNumber,
          pageSize: 10,
          total: tokens.length,
        }}
      />
    </div>
  );
};

export default NFTTokens;
