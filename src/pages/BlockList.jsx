import React, { useMemo, useState } from "react";
import { Table } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

import { useLatestBlocks } from "../hooks";
import { getGasPriceAndRewards } from "../helpers";
import { bnToCurrency, roundUpNumber, truncateAddress } from "../utils";

dayjs.extend(LocalizedFormat);

const COLUMNS = [
  {
    title: "Block",
    dataIndex: "block",
    key: "block",
    render: (blockNumber) => (
      <Link className="text-[#1677ff]" to={`/block/${blockNumber}`}>
        {blockNumber}
      </Link>
    ),
  },
  {
    title: "Date time",
    dataIndex: "date",
    key: "date",
    render: (text) => <span>{dayjs(text).format("L LT")}</span>,
  },
  {
    title: "Validator",
    dataIndex: "validator",
    key: "validator",
    render: (text) => (
      <span className="font-bold">{truncateAddress(text)}</span>
    ),
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
    render: (text) => (
      <span className="font-bold">
        {roundUpNumber(bnToCurrency(text)) + " Gwei"}
      </span>
    ),
  },
  {
    title: "Gas limit",
    dataIndex: "gasLimit",
    key: "gasLimit",
    render: (text) => (
      <span className="font-bold">
        {roundUpNumber(bnToCurrency(text)) + " Gwei"}
      </span>
    ),
  },
  {
    title: "Avg. Gas price",
    dataIndex: "gasPrice",
    key: "gasPrice",
    render: (text) => (
      <span className="font-bold">
        {roundUpNumber(bnToCurrency(text)) + " Gwei"}
      </span>
    ),
  },
  {
    title: "Block rewards",
    dataIndex: "blockRewards",
    key: "blockRewards",
    render: (text) => (
      <span className="font-bold">
        {roundUpNumber(bnToCurrency(text)) + " Gwei"}
      </span>
    ),
  },
];

const Blocks = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { blocks, loading, totalBlocks } = useLatestBlocks(pageNumber);

  const dataSource = useMemo(() => {
    let data = [];

    blocks.map((block) => {
      const { averageGasPrice, totalGasFees } = getGasPriceAndRewards(block);

      data.push({
        key: block.hash,
        block: block.number,
        validator: block.miner,
        date: block.timestamp,
        txs: block.transactions.length,
        blockSize: block.number,
        gasUsed: block.gasUsed,
        gasLimit: block.gasLimit,
        gasPrice: averageGasPrice,
        blockRewards: totalGasFees,
      });
    });

    return data;
  }, [blocks]);

  const onTableChange = (pagination) => {
    setPageNumber(() => pagination.current);
  };

  return (
    <div className="p-6">
      <h1 className="ml-2 font-varela font-bold text-xl mx-auto">
        Block list (after Merge)
      </h1>
      <div className="mt-10 p-2">
        <h4>Total {totalBlocks} blocks </h4>
        <Table
          size="large"
          className={`mt-4 overflow-x-scroll ${loading && "animate-pulse"} `}
          columns={COLUMNS}
          dataSource={dataSource}
          onChange={onTableChange}
          pagination={{
            position: "bottom-right",
            current: pageNumber,
            pageSize: 10,
            total: totalBlocks,
          }}
        />
      </div>
    </div>
  );
};

export default Blocks;
