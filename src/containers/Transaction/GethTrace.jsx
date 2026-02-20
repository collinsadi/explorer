import React, { useMemo } from "react";
import { Table } from "antd";
import { useTransactionTrace } from "../../hooks";

const COLUMNS = [
  {
    title: "Step",
    dataIndex: "step",
    key: "step",
  },
  {
    title: "PC",
    dataIndex: "pc",
    key: "pc",
  },
  {
    title: "Operation",
    dataIndex: "op",
    key: "operation",
    render: (text) => <span className="font-bold">{text}</span>,
  },
  {
    title: "Gas limit",
    dataIndex: "gas",
    key: "gasLimittxs",
  },
  {
    title: "Gas Cost",
    dataIndex: "gasCost",
    key: "gasCost",
  },
  {
    title: "Depth",
    dataIndex: "depth",
    key: "depth",
  },
];

const GethTraces = ({ transaction }) => {
  const { trace } = useTransactionTrace(transaction.hash);

  const traceData = useMemo(() => {
    if (!trace) return [];
    let data = [];

    trace.structLogs?.map((tx, idx) => {
      data.push({ ...tx, step: `[${idx + 1}]` });
    });

    return data;
  }, [trace]);

  return (
    <div className="p-6">
      <div className="flex text-gray-500 text-sm justify-between">
        <span>Total {trace?.structLogs?.length || 0} steps</span>
      </div>

      <Table
        size="large"
        className="mt-4 overflow-x-scroll"
        columns={COLUMNS}
        dataSource={traceData}
        pagination={{
          position: "bottom-right",
        }}
      />
    </div>
  );
};

export default GethTraces;
