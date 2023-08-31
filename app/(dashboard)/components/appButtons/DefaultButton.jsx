import React from "react";
import { Loading } from "utils/constant";

const DefaultButton = ({ title, type, className, loading }) => {
  return (
    <>
      {loading ? (
        Loading
      ) : (
        <button type={type} className={className}>
          {title}
        </button>
      )}
    </>
  );
};

export default DefaultButton;
