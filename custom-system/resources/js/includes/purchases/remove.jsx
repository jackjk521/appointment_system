import React from "react";
import { Modal, Button } from "react-bootstrap";

const RemoveModal = ({ user, isOpen, onClose, removePurchase}) => {
    console.log(removePurchase["purch_header_id"]);
    return (
        <>
            <Modal
                id="removePurchase"
                size="md"
                show={isOpen}
                onHide={onClose}
                centered
            >
                <Modal.Header className="bg-danger text-white" closeButton>
                    <Modal.Title>Remove Purchase</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="row">
                        <div className="col-12">
                            <div className="form-group">
                                <input
                                    type="hidden"
                                    name="txtPurchHeaderId"
                                    id="txtPurchHeaderId"
                                    value={removePurchase["purch_header_id"]}
                                    className="form-control"
                                />

                                <h5 className="text-center">
                                    Are you sure you want to remove the selected
                                   purchase?
                                </h5>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" id="btnRemovePurchase">
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
