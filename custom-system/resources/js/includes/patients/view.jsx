import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, {
    textFilter,
    dateFilter,
    Comparator,
} from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";

const ViewModal = ({ user, isOpen, onClose, viewData }) => {
    // BOOTSTRAP TABLE INITIALIZATION
    const columns = [
        { dataField: "item_id", text: "Item ID", hidden: true }, //works
        {
            dataField: "date_created",
            text: "Date",
            headerAlign: "center", // Center-align the column header
            align: "center",
            editable: false,
            filter: dateFilter({
                className: "d-flex justify-content-center",
                dateClassName: "form-control form-control-sm w-100",
                comparatorClassName: "d-none",
                onFilter: (filterValue, data) => {
                    // Implement your custom filter logic here
                    const filteredData = data.filter((row) => {
                        const rowDate = new Date(row.date_created);
                        return rowDate >= filterValue.date;
                    });
                    return filteredData;
                },
            }),
            formatter: (cell) => {
                // Format the date display
                const formattedDate = new Date(cell).toLocaleDateString();
                return formattedDate;
            },
        },
        {
            dataField: "item_name",
            text: "Item Name",
            headerAlign: "center", // Center-align the column header
            align: "center",
            editable: false,
        },
        {
            dataField: "item_price",
            text: "Unit Price",
            headerAlign: "center", // Center-align the column header
            align: "center",
            editable: false,
            formatter: (cell, row) => {
                return new Intl.NumberFormat("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                }).format(cell);
            },
        },
        {
            dataField: "purchased_quantity",
            text: "Quantity",
            headerAlign: "center", // Center-align the column header
            align: "center",
            editable: false,
            formatter: (cell, row) => {
                return new Intl.NumberFormat("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                }).format(cell);
            },
        },
        {
            dataField: "purchase_sub_total",
            text: "Sub Total",
            headerAlign: "center", // Center-align the column header
            align: "center",
            editable: false,
            formatter: (cell, row) => {
                const formattedSubTotal = parseFloat(cell).toFixed(2);
                return new Intl.NumberFormat("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                }).format(formattedSubTotal);
            },
        },
    ];

    // FILTER TEXT AND NUMBER IN SEARCH BAR
    const [searchText, setSearchText] = useState("");
    const handleSearch = (event) => {
        setSearchText(event.target.value);
    };

    // CHECK IF VIEW DATA IS NOT EMPTY
    if (!viewData || !viewData.purchaseHistory) {
        return <div>Loading...</div>; // or any other suitable loading state
    }

    // FILTERED DATA FOR SEARCH BAR
    const filteredData = viewData.purchaseHistory.filter(
        ({ item_name, item_price, purchased_quantity, purchase_sub_total }) => {
            const searchValue = searchText.toLowerCase();
            return (
                item_name.toLowerCase().includes(searchValue) ||
                parseFloat(item_price).toString().includes(searchValue) ||
                parseFloat(purchased_quantity)
                    .toString()
                    .includes(searchValue) ||
                parseFloat(purchase_sub_total).toString().includes(searchValue)
            );
        }
    );

    return (
        <>
            <Modal
                id="viewData"
                size="lg"
                show={isOpen}
                onHide={onClose}
                centered
            >
                <Modal.Header className="bg-primary text-white" closeButton>
                    <Modal.Title>View Patient</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* TO EDIT   */}
                    <div className="row mb-4">
                        <div className="col-3">
                            <div className="form-group">
                                <label className="py-3">First Name</label>
                                <input
                                    type="text"
                                    name="txtFirstName"
                                    id="txtFirstName"
                                    className="form-control"
                                    value={viewData.first_name}
                                />
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="form-group">
                                <label className="py-3">Last Name</label>
                                <input
                                    type="text"
                                    name="txtLastName"
                                    id="txtLastName"
                                    className="form-control"
                                    value={viewData.last_name}
                                />
                            </div>
                        </div>
                        <div className="col-2">
                            <div className="form-group">
                                <label className="py-3">Age</label>
                                <input
                                    type="text"
                                    name="txtAge"
                                    id="txtAge"
                                    className="form-control"
                                    value={viewData.age}
                                />
                            </div>
                        </div>
                        <div className="col-2">
                            <div className="form-group">
                                <label className="py-3">Height</label>
                                <input
                                    type="text"
                                    name="txtHeight"
                                    id="txtHeight"
                                    className="form-control"
                                    value={viewData.height}
                                />
                            </div>
                        </div>
                        <div className="col-2">
                            <div className="form-group">
                                <label className="py-3">Weight</label>
                                <input
                                    type="text"
                                    name="txtWeight"
                                    id="txtWeight"
                                    className="form-control"
                                    value={viewData.weight}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Display all purchases under that purchase header */}
                    {Array.isArray(viewData.purchaseHistory) &&
                    viewData.purchaseHistory.length > 0 ? (
                        <div>
                            <div className="row">
                                <div className="col-7"></div>
                                <div className="col-5 d-flex align-items-end justify-content-end ">
                                    <input
                                        type="text"
                                        value={searchText}
                                        onChange={handleSearch}
                                        className="form-control my-3"
                                        placeholder="Search for Items"
                                    />
                                </div>
                            </div>

                            <BootstrapTable
                                keyField="id"
                                data={filteredData}
                                columns={columns}
                                filter={filterFactory()}
                                pagination={paginationFactory()}
                                noDataIndication={() => (
                                    <div className="container py-4 text-center">
                                        No patient history found.
                                    </div>
                                )}
                            />
                        </div>
                    ) : (
                        <div className="container py-4 text-center">
                            No patient history found.
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer></Modal.Footer>
            </Modal>
        </>
    );
};

export default ViewModal;
