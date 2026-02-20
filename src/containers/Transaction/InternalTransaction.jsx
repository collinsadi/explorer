import React, { useMemo } from "react";
import { Table } from "antd";

const DATA = {
  operation: "1",
  from: 1,
  to: "Mike",
  gasLimit: 23,
  amount: 12,
};

const COLUMNS = [
  {
    title: "Operation",
    dataIndex: "operation",
    key: "operation",
  },
  {
    title: "From",
    dataIndex: "from",
    key: "from",
  },
  {
    title: "To",
    dataIndex: "to",
    key: "to",
  },
  {
    title: "Gas limit",
    dataIndex: "gasLimit",
    key: "gasLimit",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
];

const InternalTransaction = () => {
  const dataSource = useMemo(() => {
    let data = [];

    for (let i = 0; i <= Math.random() * 1000; i++) {
      data.push({ ...DATA, key: i });
    }

    return data;
  }, []);

  return (
    <div className="p-6">
      <div className="flex text-gray-500 text-sm justify-between">
        <span>
          From 0x4838...77bf73ce8b0bad5f97 To 0xe082...83a622fb5eadc92a Total 0
          calls with ETH transfer and contract creation
        </span>
      </div>

      <Table
        size="large"
        className="mt-4 overflow-x-scroll"
        columns={COLUMNS}
        dataSource={dataSource}
        pagination={{
          position: "bottom-right",
        }}
      />
    </div>
  );
};

export default InternalTransaction;
