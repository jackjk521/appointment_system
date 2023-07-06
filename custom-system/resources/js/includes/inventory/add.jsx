import React from "react";
import { Modal, Button } from "react-bootstrap";

const AddModal = ({ user, isOpen, onClose }) => {
    return (
        <>
            <Modal
                id="addItem"
                size="md"
                show={isOpen}
                onHide={onClose}
                centered
            >
                <Modal.Header className="bg-success text-white" closeButton>
                    <Modal.Title>Add Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row p-2">
                        <div className="col-6">
                            <div className="form-group">
                                <label className="fw-bold py-3">
                                    Product Number
                                </label>
                                <input
                                    type="text"
                                    name="txtProductNumber"
                                    id="txtProductNumber"
                                    placeholder="Product Number"
                                    className="form-control"
                                />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label className="fw-bold py-3">
                                    Item Name
                                </label>
                                <input
                                    type="text"
                                    name="txtItemName"
                                    id="txtItemName"
                                    placeholder="Item Name"
                                    className="form-control"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row p-2">
                        <div className="col-4">
                            <div className="form-group">
                                {/* Selectpicker  */}
                                <label className="fw-bold py-3">Unit</label>
                                <input
                                    type="text"
                                    name="txtUnit"
                                    id="txtUnit"
                                    placeholder="PC, BOX"
                                    className="form-control"
                                />
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="form-group">
                                <label className="fw-bold py-3">
                                    Unit Price
                                </label>
                                <input
                                    type="number"
                                    name="txtUnitPrice"
                                    id="txtUnitPrice"
                                    className="form-control"
                                />
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="form-group">
                                <label className="fw-bold py-3">
                                    Total Quantity
                                </label>
                                <input
                                    type="number"
                                    name="txtTotalQty"
                                    id="txtTotalQty"
                                    className="form-control"
                                />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {/* <Button variant="secondary" onClick={onClose}>
                    Close
                    </Button> */}
                    <Button variant="secondary" id="btnAddItem">
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AddModal;
