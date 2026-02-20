import React, { useMemo } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";

const DATA = {
  key: "1",
  address: "0x4838B106FCe9647Bdf1E7877BF73cE8B0BAD5f97",
  before: 234,
  after: 234,
  stateDifference: 12,
};

const COLUMNS = [
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
    render: (address) => (
      <Link className="text-[#1677ff]" to={`/address/${address}`}>
        {address}
      </Link>
    ),
  },
  {
    title: "Before",
    dataIndex: "before",
    key: "before",
  },
  {
    title: "After",
    dataIndex: "after",
    key: "after",
  },
  {
    title: "State Difference",
    dataIndex: "stateDifference",
    key: "stateDifference",
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
          The information below shows the changes to the current state of the
          respective addresses when this transaction is processed on the network
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
