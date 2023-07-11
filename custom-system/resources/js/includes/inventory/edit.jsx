import React, { useState, useEffect} from "react";
import { Modal, Button } from "react-bootstrap";

const EditModal = ({
    user,
    isOpen,
    onClose,
    editData,
    setEditData,
    handleEditSubmit,
}) => {

    // Add Data
    useEffect(() => {
        setEditData((prevData) => ({
            ...prevData,
            user_id: user.user_id,
            username: user.username,
        }));
    }, []);

    // HANDLE INPUT CHANGER FUNCTIONS START
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditData((prevData) => ({ ...prevData, [name]: value }));
    };

    // ONCHANGE FUNCTIONS END

    // Clear Fields
    const onCloseCleared = () => {
        $(".clear-fields").val("");
        onClose();
    };

    return (
        <>
            <Modal
                id="editItem"
                size="md"
                show={isOpen}
                onHide={onCloseCleared}
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
                        value={editData.product_id || ""}
                        className="form-control clear-fields"
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
                                    value={editData.product_number || ""}
                                    className="form-control clear-fields"
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
                                    name="item_name"
                                    id="txtItemName"
                                    value= {editData.item_name || ""}                           
                                    className="form-control clear-fields"
                                    onChange={handleInputChange}
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
                                    name="unit"
                                    id="txtUnit"
                                    value={editData.unit || ""}
                                    className="form-control clear-fields"
                                    onChange={handleInputChange}
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
                                    name="unit_price"
                                    id="txtUnitPrice"
                                    value={editData.unit_price || ""}
                                    className="form-control clear-fields"
                                    onChange={handleInputChange}
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
                                    name="total_quantity"
                                    id="txtTotalQty"
                                    value={editData.total_quantity || ""}
                                    className="form-control clear-fields"
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" id="btnEditItem" onClick={handleEditSubmit}>
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
