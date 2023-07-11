import React, {useEffect}from "react";
import { Modal, Button } from "react-bootstrap";

const RemoveModal = ({ user, isOpen, onClose, removeData, setRemoveData, handleRemoveSubmit}) => {
    
    useEffect(() => {
        setRemoveData((prevData) => ({
            ...prevData,
            user_id: user.user_id,
            username: user.username,
        }));
    }, []);

    // Clear Fields
    const onCloseCleared = () => {
        $("#txtPurchHeaderId").val('')
        onClose();
    };


    return (
        <>
            <Modal
                id="removePurchase"
                size="md"
                show={isOpen}
                onHide={onCloseCleared}
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
                                    value={removeData.purch_header_id}
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
                    <Button variant="success" id="btnRemovePurchase" onClick={handleRemoveSubmit}>
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
