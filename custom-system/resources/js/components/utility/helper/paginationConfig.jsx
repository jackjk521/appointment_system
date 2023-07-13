import React from "react";

export const paginationTotalRenderer = (from, to, size) => {
  return (
    <div className="pagination-total">
      Showing {from}-{to} of {size} records
    </div>
  );
};

export const sizePerPageRenderer = ({ options, currSizePerPage }) => (
  <span className="d-none">
    {`Displaying ${currSizePerPage} ${options[0]} entries`}
  </span>
);

export const paginationOptions = {
  paginationSize: 5,
  pageStartIndex: 1,
  showTotal: true,
  paginationTotalRenderer: (from, to, size) =>
    paginationTotalRenderer(from, to, size),
  sizePerPageRenderer: ({ options, currSizePerPage }) =>
    sizePerPageRenderer({ options, currSizePerPage }),
};
