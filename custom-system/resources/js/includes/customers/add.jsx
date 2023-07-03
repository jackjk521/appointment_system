import React from "react";
import { Modal, Button } from 'react-bootstrap';

const AddModal = ({ user, isOpen, onClose }) => {
    return (
        <>
           <Modal show={isOpen} onHide={onClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Modal Content</p>
                    <div class="row">
                        <div class="col-6">
                            <div class="form-group">
                                <label>Truck ID</label>
                                <input type="text" name="txtTruckId" id="txtTruckId"
                                placeholder="Truck ID" class="form-control"/>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-group">
                                <label>Truck ID</label>
                                <input type="text" name="txtTruckId" id="txtTruckId"
                                placeholder="Truck ID" class="form-control"/>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {/* <Button variant="secondary" onClick={onClose}>
                    Close
                    </Button> */}
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AddModal;
