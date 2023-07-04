import React from "react";
import { Modal, Button } from 'react-bootstrap';

const AddModal = ({ user, isOpen, onClose }) => {
    return (
        <>
           <Modal id="addItem" size="lg" show={isOpen} onHide={onClose} centered>
                <Modal.Header className="bg-success text-white" closeButton>
                    <Modal.Title>View Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* TO EDIT  */}
                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <label class="py-3">Product Number</label>
                                <span type="text" name="txtProductNumber" id="txtProductNumber"
                                placeholder="Product Number" class="form-control"/>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                                <label class="py-3">Item Name</label>
                                <span type="text" name="txtItemName" id="txtItemName"
                                placeholder="Item Name" class="form-control"/>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-4">
                            <div class="form-group">
                                {/* Selectpicker  */}
                                <label class="py-3">Unit</label>
                                <span type="text" name="txtUnit" id="txtUnit"
                                placeholder="PC, BOX" class="form-control"/>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="form-group">
                                <label class="py-3">Unit Price</label>
                                <span type="number" name="txtUnitPrice" id="txtUnitPrice" class="form-control"/>
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="form-group">
                                <label class="py-3">Total Quantity</label>
                                <span type="number" name="txtTotalQty" id="txtTotalQty" class="form-control"/>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AddModal;
