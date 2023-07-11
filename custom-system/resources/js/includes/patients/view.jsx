import React from "react";
import { Modal, Button } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter, dateFilter, Comparator } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';

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
                    comparatorClassName: 'form-select form-select-sm',
                    comparatorStyle: { width: '60px', marginRight: '5px' },
                    dateClassName: 'form-control form-control-sm',
                    dateStyle: { width: '150px', marginRight: '5px' },
                    defaultValue: { date_created: new Date(), comparator: Comparator.GE },
                    withoutEmptyComparatorOption: true,
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
                  }
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
                                <span
                                    type="text"
                                    name="txtFirstName"
                                    id="txtFirstName"
                                    className="form-control"
                                >{viewData.first_name}</span>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="form-group">
                                <label className="py-3">Last Name</label>
                                <span
                                    type="text"
                                    name="txtLastName"
                                    id="txtLastName"
                                    className="form-control"
                                >{viewData.last_name}</span>
                            </div>
                        </div>
                        <div className="col-2">
                            <div className="form-group">
                                <label className="py-3">Age</label>
                                <span
                                    type="text"
                                    name="txtAge"
                                    id="txtAge"
                                    className="form-control"
                                >{viewData.age}</span>
                            </div>
                        </div>
                        <div className="col-2">
                            <div className="form-group">
                                <label className="py-3">Height</label>
                                <span
                                    type="text"
                                    name="txtHeight"
                                    id="txtHeight"
                                    className="form-control"
                                >{viewData.height}</span>
                            </div>
                        </div>
                        <div className="col-2">
                            <div className="form-group">
                                <label className="py-3">Weight</label>
                                <span
                                    type="text"
                                    name="txtWeight"
                                    id="txtWeight"
                                    className="form-control"
                                >{viewData.weight}</span>
                            </div>
                        </div>
                    </div>

                    {/* Display all purchases under that purchase header */}
                    {Array.isArray(viewData.purchaseHistory) &&
                        viewData.purchaseHistory.length > 0 ? (
                            <BootstrapTable
                                keyField="item_id"
                                data={viewData.purchaseHistory}
                                columns={columns}
                                filter={filterFactory()}
                                noDataIndication={() => (
                                    <div className="text-center">
                                        No records found.
                                    </div>
                                )}
                            />
                        ) : (
                            <div className="text-center">No records found.</div>
                        )}
                </Modal.Body>
                <Modal.Footer></Modal.Footer>
            </Modal>
        </>
    );
};

export default ViewModal;
