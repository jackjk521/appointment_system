import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

const EditModal = ({ user, isOpen, onClose, editPatient }) => {
    const [value, setValue] = useState("");

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <>
            <Modal
                id="editPatient"
                size="md"
                show={isOpen}
                onHide={onClose}
                centered
            >
                <Modal.Header className="bg-warning text-white" closeButton>
                    <Modal.Title>Edit Patient</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input
                        type="hidden"
                        name="txtPatientId"
                        id="txtPatientId"
                        value={editPatient["patient_id"]}
                        className="form-control"
                    />

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
                                    defaultValue={editPatient["first_name"]}
                                    className="form-control"
                                    onChange={handleChange}
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
                                    defaultValue={editPatient["last_name"]}
                                    className="form-control"
                                    onChange={handleChange}
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
                                    defaultValue={editPatient["age"]}
                                    className="form-control"
                                    onChange={handleChange}
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
                                    defaultValue={editPatient["weight"]}
                                    className="form-control"
                                    onChange={handleChange}
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
                                    defaultValue={editPatient["height"]}
                                    className="form-control"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" id="btnEditPatient">
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
