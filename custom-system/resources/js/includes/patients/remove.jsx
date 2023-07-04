import React from "react";
import { Modal, Button } from "react-bootstrap";

const RemoveModal = ({ user, isOpen, onClose, removeItem }) => {
    return (
        <>
            <Modal
                id="removeItem"
                size="md"
                show={isOpen}
                onHide={onClose}
                centered
            >
                <Modal.Header className="bg-danger text-white" closeButton>
                    <Modal.Title>Remove Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-12">
                            <div className="form-group">
                                <input
                                    type="hidden"
                                    name="txtProductId"
                                    id="txtProductId"
                                    value={removeItem["product_id"]}
                                    className="form-control"
                                />
                                <input
                                    type="hidden"
                                    name="txtProductNumber"
                                    id="txtProductNumber"
                                    value={removeItem["product_number"]}
                                    className="form-control"
                                />

                                <h5 className="text-center">
                                    Are you sure you want to remove selected
                                    item?
                                </h5>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" id="btnRemoveItem">
                        Yes
                    </Button>
                    <Button variant="secondary" onClick={onClose}>
                        No
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default RemoveModal;
