import { Link } from "react-router-dom";

import {
  bnToCurrency,
  getCurrencyInEth,
  roundUpNumber,
  truncateAddress,
} from "../utils";
import { getTxsFees } from "../helpers";

export const getTransactionColumnConfig = (skip = []) => {
  const COLUMNS = [
    {
      title: "Tx Hash",
      dataIndex: "hash",
      key: "hash",
      render: (hash) => (
        <Link className="text-[#1677ff]" to={`/tx/${hash}`}>
          {truncateAddress(hash, 10)}
        </Link>
      ),
    },
    {
      title: "Method",
      dataIndex: "data",
      key: "data",
      render: (address) => (
        <span className="font-bold">{truncateAddress(address)}</span>
      ),
    },
    {
      title: "From",
      dataIndex: "from",
      key: "from",
      render: (address) => (
        <Link to={`/address/${address}`} className="text-blue-500">
          {truncateAddress(address)}
        </Link>
      ),
    },
    {
      title: "To",
      dataIndex: "to",
      key: "to",
      render: (address, data) => (
        <Link
          to={`/address/${!!address ? address : data.creates}`}
          className="text-blue-500"
        >
          {!!address ? truncateAddress(address) : "Create: Contract"}
        </Link>
      ),
    },
    {
      title: "Amount",
      dataIndex: "value",
      key: "value",
      render: (value) => (
        <span className="font-bold">{roundUpNumber(bnToCurrency(value))}</span>
      ),
    },
    {
      title: "Txn fee",
      dataIndex: "txsFee",
      key: "txsFee",
      render: (_, tx) => (
        <span className="font-bold">
          {roundUpNumber(getCurrencyInEth(getTxsFees(tx))) + " ETH"}
        </span>
      ),
    },
  ];

  const tableColumns = COLUMNS.filter(({ key }) => !skip.includes(key));

  return tableColumns;
};
