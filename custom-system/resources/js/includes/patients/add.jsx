import React from "react";
import { Modal, Button } from "react-bootstrap";

const AddModal = ({ user, isOpen, onClose }) => {
    return (
        <>
            <Modal
                id="addPatient"
                size="md"
                show={isOpen}
                onHide={onClose}
                centered
            >
                <Modal.Header className="bg-success text-white" closeButton>
                    <Modal.Title>Add Patient</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row p-2">
                        <div className="col-6">
                            <div className="form-group">
                                <label className="fw-bold py-3">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    name="txtFirstName"
                                    id="txtFirstName"
                                    placeholder="John"
                                    className="form-control"
                                />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label className="fw-bold py-3">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    name="txtLastName"
                                    id="txtLastName"
                                    placeholder="Doe"
                                    className="form-control"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row p-2">
                        <div className="col-4">
                            <div className="form-group">
                                <label className="fw-bold py-3">Age</label>
                                <input
                                    type="number"
                                    name="txtAge"
                                    id="txtAge"
                                    className="form-control"
                                />
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="form-group">
                                <label className="fw-bold py-3">
                                    Weight (in kg)
                                </label>
                                <input
                                    type="number"
                                    name="txtWeight"
                                    id="txtWeight"
                                    className="form-control"
                                />
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="form-group">
                                <label className="fw-bold py-3">
                                    Height (in cm)
                                </label>
                                <input
                                    type="number"
                                    name="txtHeight"
                                    id="txtHeight"
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
                    <Button variant="secondary" id="btnAddPatient">
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AddModal;