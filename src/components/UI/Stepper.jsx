import React from "react";

const Stepper = ({ current, items }) => {
  return (
    <div>
      <ul className="relative flex flex-row gap-x-2 max-w-xs mx-auto">
        {items.map(({ key, label }) => (
          <li key={key} className="shrink basis-0 flex-1 group">
            <div className="md:min-w-[250px] w-full inline-flex items-center text-xs align-middle">
              <span
                className={`flex size-7 justify-center items-center shrink-0 rounded-full dark:bg-neutral-700 dark:text-white ${
                  current === key
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {key}
              </span>
              <span
                className={`ms-2 block grow md:grow-0 text-sm dark:text-white ${
                  current === key ? "text-blue-500" : "text-gray-800"
                } `}
              >
                {label}
              </span>
              <div className="ms-2 w-full h-px flex-1 bg-gray-200 group-last:hidden dark:bg-neutral-700"></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Stepper;
