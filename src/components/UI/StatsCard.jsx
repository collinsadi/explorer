import React from "react";
import { Link } from "react-router-dom";

const StatsCard = ({
  label,
  value,
  unit = "",
  link = "",
  isLoading = false,
}) => {
  return (
    <div className={`p-4 text-center ${!!isLoading && "animate-pulse"}`}>
      <h3 className="text-gray-600 font-semibold text-sm mb-2">{label}</h3>
      <div className="flex justify-center items-center space-x-2">
        {link ? (
          <div className="flex flex-row items-center">
            <Link to={link} className="flex items-center">
              <span className="font-bold text-xl">{value}</span>
            </Link>
            {unit && <span className="text-sm text-gray-500 ml-1">{unit}</span>}
          </div>
        ) : (
          <>
            <span className="font-bold text-xl">{value}</span>
            {unit && <span className="text-sm text-gray-500 ml-1">{unit}</span>}
          </>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
