import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

const EditModal = ({ user, isOpen, onClose, editData, setEditData, handleEditSubmit}) => {
   
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
                id="editPatient"
                size="md"
                show={isOpen}
                onHide={onCloseCleared}
                centered
            >
                <Modal.Header className="bg-warning text-white" closeButton>
                    <Modal.Title>Edit Patient</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input
                        type="hidden"
                        name="patient_id"
                        id="txtPatientId"
                        value={editData.patient_id || ""}
                        className="form-control clear-fields"
                    />

                    <div className="row p-2">
                        <div className="col-6">
                            <div className="form-group">
                                <label className="fw-bold py-3">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    name="first_name"
                                    id="txtFirstName"
                                    placeholder="John"
                                    defaultValue={editData.first_name || ""}
                                    className="form-control clear-fields"
                                    onChange={handleInputChange}
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
                                    name="last_name"
                                    id="txtLastName"
                                    placeholder="Doe"
                                    defaultValue={editData.last_name || ""}
                                    className="form-control clear-fields"
                                    onChange={handleInputChange}
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
                                    name="age"
                                    id="txtAge"
                                    defaultValue={editData.age || ""}
                                    className="form-control clear-fields"
                                    onChange={handleInputChange}
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
                                    name="height"
                                    id="txtHeight"
                                    defaultValue={editData.height || ""}
                                    className="form-control clear-fields"
                                    onChange={handleInputChange}
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
                                    name="weight"
                                    id="txtWeight"
                                    defaultValue={editData.weight || ""}
                                    className="form-control clear-fields"
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" id="btnEditPatient" onClick={handleEditSubmit}>
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
