import React from "react";
import { Modal, Button } from "react-bootstrap";

const RemoveModal = ({ user, isOpen, onClose, removeData, handleRemoveSubmit }) => {

    return (
        <>
            <Modal
                id="removeAppointment"
                size="md"
                show={isOpen}
                onHide={onClose}
                centered
            >
                <Modal.Header className="bg-danger text-white" closeButton>
                    <Modal.Title>Cancel Appointment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-12">
                            <div className="form-group">
                                <input
                                    type="hidden"
                                    name="txtAppointmentId"
                                    id="txtAppointmentId"
                                    value={removeData.apppointment_id}
                                    className="form-control"
                                />

                                <h5 className="text-center">
                                    Are you sure you want to remove selected
                                    appointment?
                                </h5>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" id="btnRemoveAppointment" onClick={handleRemoveSubmit}>
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
