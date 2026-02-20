import {
  ClipboardDocumentCheckIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/outline";
import React, { useState } from "react";

const CodeBlock = ({ label, content, showCopy = false }) => {
  const [hasCopied, setHasCopied] = useState(false);
  const onCopyClick = (event) => {
    setHasCopied(true);
    event.preventDefault();
    navigator.clipboard.writeText(content);
    setTimeout(() => setHasCopied(false), 1000);
  };

  return (
    <div>
      {!!label && (
        <div className="flex text-center items-center my-2 text-black font-semibold mb-4 justify-between">
          <span className="font-extrabold text-md">
            {"</> "} {label}
          </span>

          <div>
            {showCopy && !hasCopied ? (
              <div className="cursor-pointer" onClick={onCopyClick}>
                <ClipboardDocumentIcon className="h-5 w-5" />
              </div>
            ) : null}

            {showCopy && hasCopied ? (
              <div className="cursor-pointer">
                <ClipboardDocumentCheckIcon className="h-5 w-5" color="green" />
              </div>
            ) : null}
          </div>
        </div>
      )}
      <div className="bg-[#f9f9f9] border border-[#ebebeb] rounded-md text-[#3d3d3d] px-4 whitespace-break-spaces max-h-[200px] overflow-y-scroll">
        <div className="text-wrap break-words">{content}</div>
      </div>
    </div>
  );
};

export default CodeBlock;
