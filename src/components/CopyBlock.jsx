import {
  ClipboardDocumentCheckIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";

const CopyBlock = ({ value }) => {
  const [hasCopied, setHasCopied] = useState(false);

  const onCopyClick = (event) => {
    event.preventDefault();
    setHasCopied(true);

    navigator.clipboard.writeText(value);
    setTimeout(() => setHasCopied(false), 1000);
  };
  return (
    <div className="flex items-center space-x-2">
      <div className="truncate">{value}</div>
      {!hasCopied ? (
        <div className="cursor-pointer" onClick={onCopyClick}>
          <ClipboardDocumentIcon className="h-4 w-4" />
        </div>
      ) : (
        <div className="cursor-pointer">
          <ClipboardDocumentCheckIcon className="h-4 w-4" color="green" />
        </div>
      )}
    </div>
  );
};

export default CopyBlock;
