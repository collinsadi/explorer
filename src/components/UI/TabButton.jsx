import React, { Fragment, useEffect, useState } from "react";

const TabButton = ({
  items,
  onTabButtonClick,
  className = "",
  defaultActiveKey = "",
}) => {
  const [selectedKey, setSelectedKey] = useState(defaultActiveKey);

  useEffect(() => {
    setSelectedKey(defaultActiveKey);
  }, [defaultActiveKey]);

  const onButtonClick = (id) => {
    setSelectedKey(id);
    onTabButtonClick(id);
  };

  return (
    <div className="flex flex-wrap my-2">
      {items.map(({ label, value, icon, ...rest }) => (
        <Fragment>
          <button
            {...rest}
            onClick={() => onButtonClick(value)}
            className="relative"
          >
            {!!icon && (
              <span
                className={`absolute top-[-17px] ${
                  value === selectedKey ? "left-[82px]" : "left-[85px]"
                }`}
              >
                {icon}
              </span>
            )}
            <span
              className={`mx-3 p-1.5 rounded hover:bg-black-800 ${
                value === selectedKey
                  ? "text-white bg-black "
                  : " bg-[#f7f7f7] hover:bg-black-800 text-black border"
              } ${!!rest.disabled && "cursor-not-allowed"} ${className}`}
            >
              {" "}
              {label}
            </span>
          </button>
        </Fragment>
      ))}
    </div>
  );
};

export default TabButton;
