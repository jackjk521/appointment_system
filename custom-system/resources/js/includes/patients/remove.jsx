import React , {useEffect} from "react";
import { Modal, Button } from "react-bootstrap";

const RemoveModal = ({ user, isOpen, onClose, removeData, setRemoveData, handleRemoveSubmit}) => {
    useEffect(() => {
        setRemoveData((prevData) => ({
            ...prevData,
            user_id: user.user_id,
            username: user.username,
        }));
    }, []);

    // ONCHANGE FUNCTIONS END

    // Clear Fields
    const onCloseCleared = () => {
        $(".clear-fields").val("");
        onClose();
    };
    return (
        <>
            <Modal
                id="removePatient"
                size="md"
                show={isOpen}
                onHide={onClose}
                centered
            >
                <Modal.Header className="bg-danger text-white" closeButton>
                    <Modal.Title>Remove Patient</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-12">
                            <div className="form-group">
                                <input
                                    type="hidden"
                                    name="txtPatientId"
                                    id="txtPatientId"
                                    value={removeData.patient_id}
                                    className="form-control clear-fields"
                                />

                                <h5 className="text-center">
                                    Are you sure you want to remove the selected
                                    patient?
                                </h5>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" id="btnRemovePatient" onClick={handleRemoveSubmit}>
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
