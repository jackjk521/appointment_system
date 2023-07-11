import React, {useEffect} from "react";
import { Modal, Button } from "react-bootstrap";

const AddModal = ({
    user,
    isOpen,
    onClose,
    addData,
    setAddData,
    handleAddSubmit,
}) => {
    // Add Data
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
                id="addItem"
                size="md"
                show={isOpen}
                onHide={onCloseCleared}
                centered
            >
                <Modal.Header className="bg-success text-white" closeButton>
                    <Modal.Title>Add Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row p-2">
                        <div className="col-6">
                            <div className="form-group">
                                <label className="fw-bold py-3">
                                    Product Number
                                </label>
                                <input
                                    type="text"
                                    name="product_number"
                                    id="txtProductNumber"
                                    placeholder="Product Number"
                                    className="form-control clear-fields"
                                    value={addData.product_number}
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label className="fw-bold py-3">
                                    Item Name
                                </label>
                                <input
                                    type="text"
                                    name="item_name"
                                    id="txtItemName"
                                    placeholder="Item Name"
                                    className="form-control clear-fields"
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row p-2">
                        <div className="col-4">
                            <div className="form-group">
                                {/* Selectpicker  */}
                                <label className="fw-bold py-3">Unit</label>
                                <input
                                    type="text"
                                    name="unit"
                                    id="txtUnit"
                                    placeholder="PC, BOX"
                                    className="form-control clear-fields"
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="form-group">
                                <label className="fw-bold py-3">
                                    Unit Price
                                </label>
                                <input
                                    type="number"
                                    name="unit_price"
                                    id="txtUnitPrice"
                                    className="form-control clear-fields"
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="form-group">
                                <label className="fw-bold py-3">
                                    Total Quantity
                                </label>
                                <input
                                    type="number"
                                    name="total_quantity"
                                    id="txtTotalQty"
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
                    <Button variant="secondary" id="btnAddItem" onClick={handleAddSubmit}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AddModal;
