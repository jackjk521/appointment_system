import React from "react";
import { Modal, Button } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, {
    textFilter,
    defaultFilter,
} from "react-bootstrap-table2-filter";


const ViewModal = ({ user, isOpen, onClose, viewPurchase, purchaseList}) => {

    console.log(purchaseList)
        // BOOTSTRAP TABLE INITIALIZATION
        const columns = [
            { dataField: "item_id", text: "Item ID", hidden: true }, //works

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
                id="viewPurchase"
                size="lg"
                show={isOpen}
                onHide={onClose}
                centered
            >
                <Modal.Header className="bg-primary text-white" closeButton>
                    <Modal.Title>View Purchase</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* TO EDIT  */}
                    <div className="row mb-4">
                        <div className="col-3">
                            <div className="form-group">
                                <label className="py-3">Purchase Number</label>
                                <span
                                    type="text"
                                    name="txtPurchaseNumber"
                                    id="txtPurchaseNumber"
                                    placeholder="Purchase Number"
                                    className="form-control"
                                >{viewPurchase.purchase_number}</span>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="form-group">
                                <label className="py-3">Patient's Name</label>
                                <span
                                    type="text"
                                    name="txtPatientName"
                                    id="txtPatientName"
                                    placeholder="Patient's Name"
                                    className="form-control"
                                >{viewPurchase.patient_name}</span>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="form-group">
                                <label className="py-3">Total Amount</label>
                                <span
                                    type="text"
                                    name="txtTotalAmount"
                                    id="txtTotalAmount"
                                    placeholder="Total Amount"
                                    className="form-control"
                                >{viewPurchase.total_amount}</span>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="form-group">
                                <label className="py-3">Created By</label>
                                <span
                                    type="text"
                                    name="txtCreatedBy"
                                    id="txtCreatedBy"
                                    placeholder="Created By"
                                    className="form-control"
                                >{viewPurchase.created_by}</span>
                            </div>
                        </div>
                    </div>

                    {/* Display all purchases under that purchase header */}
                    <BootstrapTable
                        keyField="item_id"
                        data={purchaseList}
                        columns={columns}
                        // filter={filterFactory()}
                        // pagination={paginationFactory()}
                        noDataIndication={() => (
                            <div class="text-center">No records found.</div>
                        )}
                    />

                </Modal.Body>
                <Modal.Footer></Modal.Footer>
            </Modal>
        </>
    );
};

export default ViewModal;
