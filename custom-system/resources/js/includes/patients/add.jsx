import React, {useEffect} from "react";
import { Modal, Button } from "react-bootstrap";

const AddModal = ({ user, isOpen, onClose, addData, setAddData, handleAddSubmit}) => {
    
    // ADD DATA 
      useEffect(() => {
        setAddData((prevData) => ({
            ...prevData,
            user_id: user.user_id,
            username: user.username,
        }));
    }, []);

    // HANDLE INPUT CHANGER FUNCTIONS START
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAddData((prevData) => ({ ...prevData, [name]: value }));
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
                id="addPatient"
                size="md"
                show={isOpen}
                onHide={onCloseCleared}
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
                                    name="first_name"
                                    id="txtFirstName"
                                    placeholder="John"
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
                                    className="form-control clear-fields"
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {/* <Button variant="secondary" onClick={onClose}>
                    Close
                    </Button> */}
                    <Button variant="secondary" id="btnAddPatient" onClick={handleAddSubmit}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AddModal;
