import React from "react";
import { Modal, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Select from "react-select";

const AddModal = ({ user, isOpen, onClose }) => {

// FROM DATE TIME 
  const [selectedDateTime, setSelectedDateTime] = useState(null);

  // TO DATE TIME 
// const [selectedDateTime, setSelectedDateTime] = useState(null);

// Selectpicker for Patients
const [selectedOption, setSelectedOption] = useState(null);
const [options, setOptions] = useState([]);
    
useEffect(() => {
    // Get all Patients
    const fetchPatients = async () => {
        try {
            const response = await axios.get("/api/patients", {}); // works
            const patients = response.data.map((val) => ({
                value: val.id,
                label: val.full_name,
            }));
            setOptions(patients);
        } catch (error) {
            console.error(error);
        }
    };

    fetchPatients();

}, []); 

    // Function to handle option selection
    const handleSelectChange = (selected) => {
        setSelectedOption(selected);
        $("#addPurchase").attr("data-patient-id", selected.value);
    };


    // FUNCTION TO HANDLE THE FOR DATE TIME CHANGE
    const handleDateTimeChange = (date) => {
        setSelectedDateTime(date);
    };

    // FUNCTION TO HANDLE THE FOR DATE TIME CHANGE
    // const handleDateTimeChange = (date) => {
    //     setSelectedDateTime(date);
    // };


    return (
        <>
            <Modal
                id="addAppointment"
                size="md"
                show={isOpen}
                onHide={onClose}
                centered
            >
                <Modal.Header className="bg-success text-white" closeButton>
                    <Modal.Title>Create Appointment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row p-2">
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
                        <div className="col-6">
                            <div className="form-group">
                                <label className="fw-bold py-3">
                                    Purpose
                                </label>
                                <input
                                    type="text"
                                    name="txtPurpose"
                                    id="txtPurpose"
                                    placeholder="Check up or Facial"
                                    className="form-control"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row p-2">
                        <div className="col-6">
                            <div className="form-group">
                                <DatePicker
                                    selected={selectedDateTime}
                                    onChange={handleDateTimeChange}
                                    showTimeSelect
                                    dateFormat="yyyy-MM-dd HH:mm:ss"
                                    timeFormat="HH:mm:ss"
                                    timeIntervals={15}
                                    timeCaption="Time"
                                    placeholderText="Select date and time"
                                />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <DatePicker
                                    selected={selectedDateTime}
                                    onChange={handleDateTimeChange}
                                    showTimeSelect
                                    dateFormat="yyyy-MM-dd HH:mm:ss"
                                    timeFormat="HH:mm:ss"
                                    timeIntervals={15}
                                    timeCaption="Time"
                                    placeholderText="Select date and time"
                                />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {/* <Button variant="secondary" onClick={onClose}>
                    Close
                    </Button> */}
                    <Button variant="secondary" id="btnAddAppointment">
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AddModal;
