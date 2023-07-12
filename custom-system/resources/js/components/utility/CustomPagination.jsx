const CustomPagination = ({ paginationProps }) => {
    const {
        currPage,
        totalPages,
        pageChange,
        sizePerPage,
        sizePerPageRenderer,
    } = paginationProps;

    return (
        <div className="d-flex justify-content-end">
            <div className="d-flex align-items-center mr-2">
                <span>Show:</span>
                {sizePerPageRenderer()}
            </div>
            <ul className="pagination">
                <li
                    className={`page-item${currPage === 1 ? " disabled" : ""}`}
                    onClick={() => pageChange(currPage - 1)}
                >
                    <a className="page-link">Previous</a>
                </li>
                {Array.from({ length: totalPages }, (_, index) => (
                    <li
                        key={index + 1}
                        className={`page-item${
                            currPage === index + 1 ? " active" : ""
                        }`}
                        onClick={() => pageChange(index + 1)}
                    >
                        <a className="page-link">{index + 1}</a>
                    </li>
                ))}
                <li
                    className={`page-item${
                        currPage === totalPages ? " disabled" : ""
                    }`}
                    onClick={() => pageChange(currPage + 1)}
                >
                    <a className="page-link">Next</a>
                </li>
            </ul>
        </div>
    );
};
export default CustomPagination;
