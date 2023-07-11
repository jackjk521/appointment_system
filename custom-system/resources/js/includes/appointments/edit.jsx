import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Select from "react-select";
import moment from "moment";

const EditModal = ({
    user,
    isOpen,
    onClose,
    editData,
    setEditData,
    handleEditSubmit,
}) => {
    // FROM DATE TIME
    const [selectedFromDateTime, setSelectedFromDateTime] = useState(null);
    // TO DATE TIME
    const [selectedToDateTime, setSelectedToDateTime] = useState(null);

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

    useEffect(() => {

        // AUTO FILL SELECTPICKER
        setSelectedOption(
            editData.patient_id
                ? {
                      value: editData.patient_id,
                      label: editData.full_name,
                  }
                : ''
        );

        // AUTO FILL FROM DATETIME
        setSelectedFromDateTime(
            editData.from_datetime ? new Date(editData.from_datetime) : null
        );

        // AUTP FILL TO DATETIME
        setSelectedToDateTime(
            editData.to_datetime ? new Date(editData.to_datetime) : null
        );

        setEditData((prevData) => ({
            ...prevData,
            user_id: user.user_id,
            username: user.username,
        }));
    }, [editData]);


    // ONCHANGE FUNCTIONS START

    // HANDLE OPTION SELECTION
    const handleSelectChange = (selected) => {
        setSelectedOption(selected);
        setEditData((prevData) => ({
            ...prevData,
            patient_id: selected?.value || null,
        }));
    };

    // HANDLE THE FOR DATE TIME CHANGE
    const handleFromDateTimeChange = (date) => {
        setSelectedFromDateTime(date);
        const formattedDate = moment(date).format("YYYY-MM-DD HH:mm");
        setEditData((prevData) => ({
            ...prevData,
            from_datetime: formattedDate,
        }));
    };

    // HANDLE THE FOR DATE TIME CHANGE
    const handleToDateTimeChange = (date) => {
        setSelectedToDateTime(date);
        const formattedDate = moment(date).format("YYYY-MM-DD HH:mm");
        setEditData((prevData) => ({
            ...prevData,
            to_datetime: formattedDate,
        }));
    };

    // HANDLE INPUT CHANGER FUNCTIONS START
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditData((prevData) => ({ ...prevData, [name]: value }));
    };

    // ONCHANGE FUNCTIONS END

    // Clear Fields
    const onCloseCleared = () => {
        setSelectedFromDateTime(null);
        setSelectedToDateTime(null);
        setSelectedOption(null);
        onClose();
    };

    return (
        <>
            <Modal
                id="addAppointment"
                size="md"
                show={isOpen}
                onHide={onCloseCleared}
                centered
            >
                <Modal.Header className="bg-success text-white" closeButton>
                    <Modal.Title>Edit Appointment</Modal.Title>
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
                                    name="patient_id"
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
                                <label className="fw-bold py-3">Purpose</label>
                                <input
                                    type="text"
                                    name="purpose"
                                    id="txtPurpose"
                                    placeholder="CHECK UP or FACIAL"
                                    className="form-control"
                                    value={editData.purpose || ""}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row p-2">
                        <div className="col-6">
                            <div className="form-group">
                                <DatePicker
                                    id="selFromDateTime"
                                    className="form-control"
                                    name="from_datetime"
                                    selected={selectedFromDateTime}
                                    onChange={handleFromDateTimeChange}
                                    showTimeSelect
                                    dateFormat="yyyy-MM-dd HH:mm"
                                    timeFormat="h:mm"
                                    timeIntervals={30}
                                    timeCaption="Time"
                                    placeholderText="Select date and time"
                                />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <DatePicker
                                    id="selToDateTime"
                                    className="form-control"
                                    name="to_datetime"
                                    selected={selectedToDateTime}
                                    onChange={handleToDateTimeChange}
                                    showTimeSelect
                                    dateFormat="yyyy-MM-dd HH:mm"
                                    timeFormat="h:mm"
                                    timeIntervals={30}
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
                    <Button
                        variant="secondary"
                        id="btnEditAppointment"
                        onClick={handleEditSubmit}
                    >
                        Edit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default EditModal;
