import React from "react";

const Loader = () => {
  return (
    <div class="d-flex justify-content-center m-4">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
