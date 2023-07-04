import React from "react";
import { Modal, Button } from "react-bootstrap";

const AddModal = ({ user, isOpen, onClose }) => {
    return (
        <>
            <Modal
                id="addItem"
                size="lg"
                show={isOpen}
                onHide={onClose}
                centered
            >
                <Modal.Header className="bg-success text-white" closeButton>
                    <Modal.Title>View Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* TO EDIT  */}
                    <div className="row">
                        <div className="col-6">
                            <div className="form-group">
                                <label className="py-3">Product Number</label>
                                <span
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
                                <label className="py-3">Item Name</label>
                                <span
                                    type="text"
                                    name="txtItemName"
                                    id="txtItemName"
                                    placeholder="Item Name"
                                    className="form-control"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-4">
                            <div className="form-group">
                                {/* Selectpicker  */}
                                <label className="py-3">Unit</label>
                                <span
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
                                <label className="py-3">Unit Price</label>
                                <span
                                    type="number"
                                    name="txtUnitPrice"
                                    id="txtUnitPrice"
                                    className="form-control"
                                />
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="form-group">
                                <label className="py-3">Total Quantity</label>
                                <span
                                    type="number"
                                    name="txtTotalQty"
                                    id="txtTotalQty"
                                    className="form-control"
                                />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer></Modal.Footer>
            </Modal>
        </>
    );
};

export default AddModal;
