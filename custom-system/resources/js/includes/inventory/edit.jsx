import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const EditModal = ({ user, isOpen, onClose, editItem }) => {
    const [value, setValue] = useState("");

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <>
            <Modal
                id="editItem"
                size="md"
                show={isOpen}
                onHide={onClose}
                centered
            >
                <Modal.Header className="bg-warning text-white" closeButton>
                    <Modal.Title>Edit Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input
                        type="hidden"
                        name="txtProductId"
                        id="txtProductId"
                        value={editItem["product_id"]}
                        className="form-control"
                    />

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
                                    value={editItem["product_number"]}
                                    className="form-control"
                                    disabled
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
                                    defaultValue={editItem["item_name"]}
                                    className="form-control"
                                    onChange={handleChange}
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
                                    defaultValue={editItem["unit"]}
                                    className="form-control"
                                    onChange={handleChange}
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
                                    onChange={handleChange}
                                    defaultValue={editItem["unit_price"]}
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
                                    onChange={handleChange}
                                    defaultValue={editItem["total_quantity"]}
                                />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" id="btnEditItem">
                        Update
                    </Button>
                    {/* <Button variant="secondary" onClick={onClose}>
                    Close
                    </Button> */}
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default EditModal;
