import React, { useEffect, useState } from "react";
import axios from "axios";
import Cleave from "cleave.js";
import Swal from "sweetalert2";
import moment from "moment";

import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, {
    textFilter,
    defaultFilter,
} from "react-bootstrap-table2-filter";
import { Button, Row } from "react-bootstrap";

import AddModal from "../includes/appointments/add";
import EditModal from "../includes/appointments/edit";
import RemoveModal from "../includes/appointments/remove";

import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";

const Appointments = ({ user }) => {
    // Table Data
    const [data, setData] = useState([]);

    // Calendar Data
    const [appointments, setAppointments] = useState([]);

    // Add, Edit , Remove Data
    const [addData, setAddData] = useState({});
    const [editData, setEditData] = useState({});
    const [removeData, setRemoveData] = useState({});

    // Modals
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [removeModal, setRemoveModal] = useState(false);
    // const [doneModal, setDoneModal] = useState(false);

    // DIV STATE
    const [showDiv, setShowDiv] = useState(false);

    // MODAL FUNCTIONS START

    // Add Modal
    const handleOpenAddModal = () => {
        setAddModal(true);
    };
    const handleCloseAddModal = () => {
        setAddModal(false);
        setAddData({});
    };

    // Edit Modal
    const handleOpenEditModal = () => {
        setEditModal(true);
    };
    const handleCloseEditModal = () => {
        setEditModal(false);
        setEditData({});
    };

    // Removal Modal
    const handleOpenRemoveModal = () => {
        setRemoveModal(true);
    };
    const handleCloseRemoveModal = () => {
        setRemoveModal(false);
        setRemoveData({});
    };

    // MODAL FUNCTIONS END

    // Populate Table Data
    const fetchData = async () => {
        try {
            const response = await axios.get("/api/appointments", {}); // works
            setData(response.data);

            const events = response.data.map((val) => ({
                title: val.full_name,
                start: val.from_datetime,
                end: val.to_datetime,
            }));
            setAppointments(events);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // SHOW DIV TOGGLE
    const toggleDiv = () => {
        setShowDiv(!showDiv);
    };

    // // Cleave JS Formatting and Validation
    // const addItemUnitPrice = new Cleave("#addItem #txtUnitPrice", {
    //     numeral: true,
    //     numeralPositiveOnly: true,
    //     numeralThousandsGroupStyle: "thousand",
    //     numeralDecimalMark: ".",
    // });

    // const addItemTotalQuantity = new Cleave("#addItem #txtTotalQty", {
    //     numeral: true,
    //     numeralPositiveOnly: true,
    //     numeralThousandsGroupStyle: "thousand",
    //     numeralDecimalMark: ".",
    // });

    // ADD APPOINTMENTS FUNCTIONS START
    const handleAddSubmit = async () => {
        try {
            await axios
                .post("/api/add_appointment", { addData })
                .then((response) => {
                    handleCloseAddModal();
                    new Swal({
                        title: "Success",
                        text: "Successfully added a new appointment!",
                        icon: "success",
                        timer: 1500, // Set the timer duration in milliseconds
                        showCancelButton: false,
                        showConfirmButton: false,
                    });
                    fetchData();
                })
                .catch((error) => {
                    // Handle the error
                    new Swal({
                        title: "Error",
                        text: error,
                        icon: "error",
                        timer: 1500, // Set the timer duration in milliseconds
                        showCancelButton: false,
                        showConfirmButton: false,
                    });
                    console.error(error);
                });
        } catch (error) {
            console.error(error);
        }
    };
    // ADD APPOINTMENTS FUNCTIONS END

    // EDIT APPOINTMENTS FUNCTIONS START
    const handleEditSubmit = async () => {
        try {
            await axios
                .post("/api/update_appointment", { editData })
                .then((response) => {
                    handleCloseEditModal();
                    new Swal({
                        title: "Success",
                        text: "Successfully updated an appointment!",
                        icon: "success",
                        timer: 1500, // Set the timer duration in milliseconds
                        showCancelButton: false,
                        showConfirmButton: false,
                    });
                    fetchData();
                })
                .catch((error) => {
                    // Handle the error
                    new Swal({
                        title: "Error",
                        text: error,
                        icon: "error",
                        timer: 1500, // Set the timer duration in milliseconds
                        showCancelButton: false,
                        showConfirmButton: false,
                    });
                    console.error(error);
                });
        } catch (error) {
            console.error(error);
        }
    };
    // EDIT APPOINTMENTS FUNCTIONS END

    // REMOVE APPOINTMENTS FUNCTIONS START
    const handleRemoveSubmit = async () => {
        try {
            await axios
                .post("/api/remove_appointment", { removeData })
                .then((response) => {
                    handleCloseRemoveModal();
                    new Swal({
                        title: "Success",
                        text: "Successfully removed an appointment!",
                        icon: "success",
                        timer: 1500, // Set the timer duration in milliseconds
                        showCancelButton: false,
                        showConfirmButton: false,
                    });
                    fetchData();
                })
                .catch((error) => {
                    // Handle the error
                    new Swal({
                        title: "Error",
                        text: error,
                        icon: "error",
                        timer: 1500, // Set the timer duration in milliseconds
                        showCancelButton: false,
                        showConfirmButton: false,
                    });
                    console.error(error);
                });
        } catch (error) {
            console.error(error);
        }
    };
    // REMOVE APPOINTMENTS FUNCTIONS END

    // BOOTSTRAP TABLE FILTERS START

    // Filter Text and Numbers (Exact)
    const [searchText, setSearchText] = useState("");
    const handleSearch = (event) => {
        setSearchText(event.target.value);
    };

    const filteredData = data.filter((patient) => {
        const { first_name, last_name, from_datetime, to_datetime, purpose } =
            patient;
        const searchValue = searchText.toLowerCase();
        return (
            first_name.toLowerCase().includes(searchValue) ||
            last_name.toLowerCase().includes(searchValue) ||
            from_datetime.toLowerCase().includes(searchValue) ||
            to_datetime.toLowerCase().includes(searchValue) ||
            purpose.toLowerCase().includes(searchValue)
        );
    });

    const handleEventChange = (eventInfo) => {
        // Update the event data in your state or make an API call to update the event in the backend
        console.log(eventInfo.event);
    };
    // BOOTSTRAP TABLE FILTERS END

    // BOOTSTRAP TABLE INITIALIZATION
    const columns = [
        {
            dataField: "first_name",
            text: "First Name",
            headerAlign: "center", // Center-align the column header
            align: "center",
        },
        {
            dataField: "last_name",
            text: "Last Name",
            headerAlign: "center", // Center-align the column header
            align: "center",
        },
        {
            dataField: "from_datetime",
            text: "From Date Time",
            headerAlign: "center", // Center-align the column header
            align: "center",
        },
        {
            dataField: "to_datetime",
            text: "To Date Time",
            headerAlign: "center", // Center-align the column header
            align: "center",
        },
        {
            dataField: "purpose",
            text: "Purpose",
            headerAlign: "center", // Center-align the column header
            align: "center",
        },
        {
            dataField: "actions",
            text: "Actions",
            headerAlign: "center", // Center-align the column header
            align: "center",
            formatter: (cell, row) => (
                <div>
                    {/* <Button
                        variant="primary"
                        size="md"
                        onClick={() => handleView(row)}
                    >
                        <i className="px-1 fa fa-info-circle"> View </i>
                    </Button>{" "} */}
                    <Button
                        variant="warning"
                        size="md"
                        onClick={() => handleEdit(row)}
                    >
                        <i className="p-1 fa fa-edit"></i>
                    </Button>{" "}
                    <Button
                        variant="danger"
                        size="md"
                        onClick={() => handleRemove(row)}
                    >
                        <i className="p-1 fa fa-trash"></i>
                    </Button>
                </div>
            ),
        },
    ];
    // BOOTSTRAP TABLE INITIALIZATION END

    // View , Edit and Remove Functions
    const handleView = async (row) => {
        console.log("View", row);
        // Add your view logic here
    };

    const handleEdit = (row) => {
        console.log("Edit", row);

        // Autofill Fields
        setEditData({
            appointment_id: row.id,
            full_name: row.full_name,
            patient_id: row.patient_id,
            from_datetime: row.from_datetime,
            to_datetime: row.to_datetime,
            purpose: row.purpose,
        });

        // Open Edit Modal
        handleOpenEditModal();
    };

    const handleRemove = (row) => {
        console.log("Remove", row);
        // Add your remove logic here
        setRemoveData({
            appointment_id: row.id,
            user_id: user.user_id,
            username: user.username,
        });
        handleOpenRemoveModal();
    };

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-5">
                        <h1>
                            <i className="fa fa-calendar fa-lg p-2 pt-3 m-2"></i>
                            Appointments
                        </h1>
                    </div>
                    <div className="col-2"></div>
                    <div className="col-5 d-flex align-items-end justify-content-end ">
                        <button
                            className="btn btn-success my-3 mx-1"
                            id="addAppointmentBtn"
                            onClick={handleOpenAddModal}
                        >
                            <i className="fa fa-plus p-1"></i> Create
                            Appointment{" "}
                        </button>
                        <button
                            className="btn btn-secondary my-3"
                            onClick={toggleDiv}
                        >
                            <i className="fa fa-eye p-1"></i> View Appointments
                            Table{" "}
                        </button>
                    </div>
                </div>

                {showDiv && (
                    <div className="container bg-white p-4">
                        {/* Search Bar  */}
                        <div className="row">
                            <div className="col-9"></div>
                            <div className="col-3 d-flex align-items-end justify-content-end ">
                                <input
                                    type="text"
                                    value={searchText}
                                    onChange={handleSearch}
                                    className="form-control my-3"
                                    placeholder="Search for Patients"
                                />
                            </div>
                        </div>

                        <BootstrapTable
                            keyField="id"
                            // data={data}
                            data={filteredData}
                            columns={columns}
                            filter={filterFactory()}
                            pagination={paginationFactory()}
                            wrapperClasses="table-responsive" // Add this class to make the table responsive
                            classes="table-bordered table-hover" // Add other classes for styling if needed
                            noDataIndication={() => (
                                <div className="text-center">
                                    No records found.
                                </div>
                            )}
                        />
                    </div>
                )}

                {/* FULL CALENDAR  */}
                <div className="container py-3">
                    {/* <h1>Appointments Calendar</h1> */}
                    <FullCalendar
                        plugins={[timeGridPlugin]}
                        initialView="timeGridWeek"
                        events={appointments}
                        headerToolbar={{
                            left: "prev,next today",
                            center: "title",
                            right: "timeGridWeek,timeGridDay",
                        }}
                        slotDuration="00:15:00"
                        editable={true} // Make the events editable
                        selectable={true} // Enable event selection
                        selectMirror={true}
                        slotMinTime="10:00:00" // Set the minimum time to 10:00 AM
                        slotMaxTime="19:00:00" // Set the maximum time to 7:00 PM
                        eventChange={handleEventChange} // Handle event changes
                    />
                </div>

                {/* MODALS  */}
                <AddModal
                    user={user}
                    isOpen={addModal}
                    onClose={handleCloseAddModal}
                    addData={addData}
                    setAddData={setAddData}
                    handleAddSubmit={handleAddSubmit}
                />
                <EditModal
                    user={user}
                    isOpen={editModal}
                    onClose={handleCloseEditModal}
                    editData={editData}
                    setEditData={setEditData}
                    handleEditSubmit={handleEditSubmit}
                />
                <RemoveModal
                    user={user}
                    isOpen={removeModal}
                    onClose={handleCloseRemoveModal}
                    removeData={removeData}
                    handleRemoveSubmit={handleRemoveSubmit}
                />
            </div>
        </>
    );
};

export default Appointments;
