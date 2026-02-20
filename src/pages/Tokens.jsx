import React, { useMemo, useState } from "react";
import { Table } from "antd";
import { getTokenTransferColumnConfig } from "../config";
import { useTokenList } from "../hooks";

const Tokens = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { tokens, loading } = useTokenList();

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
        columns={[...getTokenTransferColumnConfig()]}
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

export default Tokens;
