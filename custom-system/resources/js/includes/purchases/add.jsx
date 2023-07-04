import React, { useState, useEffect } from 'react';
import { Modal, Button} from "react-bootstrap";
import axios from 'axios';
import Select from 'react-select';

const AddModal = ({ user, isOpen, onClose }) => {

    // Selectpicker for Patients
    const [selectedOption, setSelectedOption] = useState(null);
    const [options, setOptions] = useState([]);
    
    useEffect(() => {
        // Get all Patients
        const fetchPatients = async () => {
            try {
                const response = await axios.get("/api/patients", {}); // works
                $.each(response.data, (i, val) => {
                    setOptions((options) => [...options, {
                        value: val.id,
                        label: val.full_name
                    }]);
                });
            } catch (error) {
                console.error(error);
            }
        };

        fetchPatients()

    }, []); // Run once

    // Function to handle option selection
    const handleSelectChange = (selected) => {
        setSelectedOption(selected);
        $("#addPurchase").attr('data-patient-id', selected.value)
    };

    const handleModalClose = () => {
        onClose()
        if (selectedOption) {
          setSelectedOption(null); // Reset selectedOption state to null if it has a value
          $("#addPurchase").attr('data-patient-id', null); // Clear the data-patient-id attribute using jQuery
        }
      };
    return (
        <>
            <Modal
                id="addPurchase"
                size="md"
                show={isOpen}
                onHide={handleModalClose}
                centered
            >
                <Modal.Header className="bg-success text-white" closeButton>
                    <Modal.Title>Add Purchase</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    {/* Total Amount for Purchase  */}
                    <div class="row pb-3">
                        <div class="pull-right" style={{display: 'inline-block'}}>
                            <div>
                                <span class="pull-right fw-bold"> TOTAL AMOUNT </span>
                                <br></br>
                                <span class="pull-right"> PHP <span id="txtTotalAmount">0.00</span></span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="row p-2 pt-4">
                        <div className="col-6">
                            <div className="form-group">
                                <label className="fw-bold py-3">
                                    Purchase Number
                                </label>
                                <input
                                    type="text"
                                    name="txtPurchaseNumber"
                                    id="txtPurchaseNumber"
                                    placeholder="Purchase Number"
                                    className="form-control"
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label className="fw-bold py-3">
                                    Patient's Name
                                </label>
                
                                {/* Init Selectpicker for Patients */}
                                    <Select
                                        id="addSelPatients"
                                        value={selectedOption}
                                        onChange={handleSelectChange}
                                        options={options}
                                        isSearchable
                                        placeholder="Select an option"
                                    />

                            </div>
                        </div>
                    </div>

                    {/* Purchase Line jsGrid  */}
                    <div class="col-md-12">
                        <div class="row">
                        <div id="purchaseLineGrid"></div>
                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    {/* <Button variant="secondary" onClick={onClose}>
                    Close
                    </Button> */}
                    <Button variant="secondary" id="btnAddPurchase">
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AddModal;
