import React from "react";
import { Table } from "antd";

import { getTransactionColumnConfig } from "../../../config";

const COLUMNS = [
  ...getTransactionColumnConfig(),
  {
    title: "Type",
    dataIndex: "transactionType",
    key: "transactionType",
  },
];

const AddresssTransactionList = ({ transactions }) => {
  return (
    <div className="p-6">
      <div className="flex text-gray-500 text-sm justify-between">
        <span>
          Total {transactions?.length} calls with ETH transfer and contract
          creation
        </span>
        <span>Hide zero-amount txns</span>
      </div>

      <Table
        size="large"
        className="mt-4 overflow-x-scroll"
        columns={COLUMNS}
        dataSource={transactions}
        pagination={{
          position: "bottom-right",
        }}
      />
    </div>
  );
};

export default AddresssTransactionList;
