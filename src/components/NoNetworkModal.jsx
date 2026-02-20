import { Modal } from "antd";
import React from "react";

const NoNetworkModal = ({ open, onOkayClick, error }) => {
  return (
    <Modal
      title="No Network Detected"
      centered
      closable={false}
      open={open}
      okText="Retry"
      style={{ border: "1px solid black", borderRadius: "8px" }}
      onOk={onOkayClick}
    >
      <p>
        Please make sure your hardhat node is running, try <code>npx hardhat node</code>
      </p>
      {error && (
        <p className="mt-2 text-red-600 text-sm">
          {error}
        </p>
      )}
    </Modal>
  );
};

export default NoNetworkModal;
