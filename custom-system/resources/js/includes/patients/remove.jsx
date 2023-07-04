import React from "react";
import { Modal, Button } from 'react-bootstrap';

const RemoveModal = ({ user, isOpen, onClose, removeItem }) => {
    return (
        <>
           <Modal id="removeItem" size="md" show={isOpen} onHide={onClose} centered>
                <Modal.Header className="bg-danger text-white" closeButton>
                    <Modal.Title>Remove Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                    <div class="row">
                        <div class="col-12">
                            <div class="form-group">
                                <input type="hidden" name="txtProductId" id="txtProductId" value={removeItem['product_id']} class="form-control"/>
                                <input type="hidden" name="txtProductNumber" id="txtProductNumber" value={removeItem['product_number']} class="form-control"/>

                                <h5 class="text-center">Are you sure you want to remove selected item?</h5>
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
