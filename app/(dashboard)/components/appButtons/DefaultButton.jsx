import Loader from "components/Loader";
import React from "react";

const DefaultButton = ({ title, type, className, loading }) => {
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <button type={type} className={className}>
          {title}
        </button>
      )}
    </>
  );
};

export default DefaultButton;
