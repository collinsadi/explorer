import React, { useMemo } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";

const DATA = {
  key: "1",
  block: 1,
  validator: "Mike",
  date: Date.now(),
  age: 32,
  txs: 123,
  blockSize: 4854,
  gasUsed: 234,
  gasLimit: 234,
  gasPrice: 12,
  blockRewards: 10,
};

const COLUMNS = [
  {
    title: "Block",
    dataIndex: "block",
    key: "block",
    render: (blockNumber) => (
      <Link className="text-[#1677ff]" to={`/tx/${blockNumber}`}>
        {blockNumber}
      </Link>
    ),
  },
  {
    title: "Date time",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Validator",
    dataIndex: "validator",
    key: "validator",
    render: (text) => <span className="font-bold">{text}</span>,
  },
  {
    title: "Txns",
    dataIndex: "txs",
    key: "txs",
  },
  {
    title: "Block size",
    dataIndex: "blockSize",
    key: "blockSize",
  },
  {
    title: "Gas used",
    dataIndex: "gasUsed",
    key: "gasUsed",
  },
  {
    title: "Gas limit",
    dataIndex: "gasLimit",
    key: "gasLimit",
  },
  {
    title: "Avg. Gas price",
    dataIndex: "gasPrice",
    key: "gasPrice",
    render: (text) => <span className="font-bold">{text}</span>,
  },
  {
    title: "Block rewards",
    dataIndex: "blockRewards",
    key: "blockRewards",
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
        <span>Total 108 calls with ETH transfer and contract creation</span>
        <span>Hide zero-amount txns</span>
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
