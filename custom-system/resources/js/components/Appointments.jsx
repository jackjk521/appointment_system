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
import { Button } from "react-bootstrap";

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

    // Modals
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [removeModal, setRemoveModal] = useState(false);
    // const [doneModal, setDoneModal] = useState(false);

    // Add Modal
    const handleOpenAddModal = () => {
        setAddModal(true);
    };
    const handleCloseAddModal = () => {
        setAddModal(false);
    };

    // Edit Modal
    const handleOpenEditModal = () => {
        setEditModal(true);
    };
    const handleCloseEditModal = () => {
        setEditModal(false);
    };

    // Removal Modal
    const handleOpenRemoveModal = () => {
        setRemoveModal(true);
    };
    const handleCloseRemoveModal = () => {
        setRemoveModal(false);
    };

    // replace this events with data
    const events = [
        {
            title: "Event 1",
            start: "2023-07-01T10:00:00",
            end: "2023-07-01T12:00:00",
        },
        {
            title: "Event 2",
            start: "2023-07-02T14:00:00",
            end: "2023-07-02T16:00:00",
        },
        // Add more events here...
    ];

    useEffect(() => {
        // // Populate Table Data
        //  const fetchData = async () => {
        //         try {
        //             const response = await axios.get("/api/appointments", {}); // works
        //             setData(response.data);
        //         } catch (error) {
        //             console.error(error);
        //         }
        //  };
        // fetchData();
    }, [data]);

    $(document).ready(function () {
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

        // ADD PATIENT FUNCTIONS START
        $("#addAppointmentBtn").on("click", async function () {
            handleOpenAddModal();
        });

        $("#btnAddAppointment").on("click", async function () {
            // let patientData = {
            //     first_name: $("#addPatient #txtFirstName").val(),
            //     last_name: $("#addPatient #txtLastName").val(),
            //     age: $("#addPatient #txtAge").val(),
            //     weight: $("#addPatient #txtWeight").val(),
            //     height: $("#addPatient #txtHeight").val(),
            //     //To get the User ID for Logs
            //     user_id: user.user_id,
            //     username: user.username,
            // };

            // try {
            //     await axios
            //         .post("/api/add_patient", { patientData })
            //         .then((response) => {
            //             handleCloseAddModal();
            //             new Swal({
            //                 title: "Success",
            //                 text: "Successfully added a new patient!",
            //                 icon: "success",
            //                 timer: 1500, // Set the timer duration in milliseconds
            //                 showCancelButton: false,
            //                 showConfirmButton: false,
            //             });
            //             fetchData();
            //         })
            //         .catch((error) => {
            //             // Handle the error
            //             new Swal({
            //                 title: "Error",
            //                 text: error,
            //                 icon: "error",
            //                 timer: 1500, // Set the timer duration in milliseconds
            //                 showCancelButton: false,
            //                 showConfirmButton: false,
            //             });
            //             console.error(error);
            //         });
            // } catch (error) {
            //     console.error(error);
            // }
        });
        // ADD PATIENT FUNCTIONS END

        // EDIT PATIENT FUNCTIONS START
        // $("#btnEditPatient").on("click", async function () {
        //     let patientData = {
        //         patient_id: $("#editPatient #txtPatientId").val(),
        //         first_name: $("#editPatient #txtFirstName").val(),
        //         last_name: $("#editPatient #txtLastName").val(),
        //         age: $("#editPatient #txtAge").val(),
        //         weight: $("#editPatient #txtWeight").val(),
        //         height: $("#editPatient #txtHeight").val(),
        //         //To get the User ID for Logs
        //         user_id: user.user_id,
        //         username: user.username,
        //     };

        //     try {
        //         await axios
        //             .post("/api/update_patient", { patientData })
        //             .then((response) => {
        //                 handleCloseEditModal();
        //                 new Swal({
        //                     title: "Success",
        //                     text: "Successfully update an patient!",
        //                     icon: "success",
        //                     timer: 1500, // Set the timer duration in milliseconds
        //                     showCancelButton: false,
        //                     showConfirmButton: false,
        //                 });

        //                 fetchData();
        //             })
        //             .catch((error) => {
        //                 // Handle the error
        //                 new Swal({
        //                     title: "Error",
        //                     text: error,
        //                     icon: "error",
        //                     timer: 1500, // Set the timer duration in milliseconds
        //                     showCancelButton: false,
        //                     showConfirmButton: false,
        //                 });
        //                 console.error(error);
        //             });
        //     } catch (error) {
        //         console.error(error);
        //     }
        // });
        // EDIT PATIENT FUNCTIONS END

        // REMOVE ITEM FUNCTIONS START
        // $("#btnRemovePatient").on("click", async function () {
        //     let patientData = {
        //         patient_id: $("#removePatient #txtPatientId").val(),
        //         //To get the User ID for Logs
        //         user_id: user.user_id,
        //         username: user.username,
        //     };
        //     try {
        //         await axios
        //             .post("/api/remove_patient", { patientData })
        //             .then((response) => {
        //                 handleCloseRemoveModal();
        //                 new Swal({
        //                     title: "Success",
        //                     text: "Successfully removed an patient!",
        //                     icon: "success",
        //                     timer: 1500, // Set the timer duration in milliseconds
        //                     showCancelButton: false,
        //                     showConfirmButton: false,
        //                 });

        //                 fetchData();
        //             })
        //             .catch((error) => {
        //                 // Handle the error
        //                 new Swal({
        //                     title: "Error",
        //                     text: error,
        //                     icon: "error",
        //                     timer: 1500, // Set the timer duration in milliseconds
        //                     showCancelButton: false,
        //                     showConfirmButton: false,
        //                 });
        //                 console.error(error);
        //             });
        //     } catch (error) {
        //         console.error(error);
        //     }
        // });
        // REMOVE ITEM FUNCTIONS END
    });

    // BOOTSTRAP TABLE FILTERS START

    // Filter Text and Numbers (Exact)
    const [searchText, setSearchText] = useState("");
    const handleSearch = (event) => {
        setSearchText(event.target.value);
    };

    const filteredData = data.filter((patient) => {
        const { first_name, last_name, age, height, weight } = patient;
        const searchValue = searchText.toLowerCase();
        return (
            first_name.toLowerCase().includes(searchValue) ||
            last_name.toLowerCase().includes(searchValue) ||
            parseFloat(age).toString().includes(searchValue) ||
            parseFloat(height).toString().includes(searchValue) ||
            parseFloat(weight).toString().includes(searchValue)
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
                        <i className="px-2 fa fa-edit"> Edit</i>
                    </Button>{" "}
                    <Button
                        variant="danger"
                        size="md"
                        onClick={() => handleRemove(row)}
                    >
                        <i className="px-2 fa fa-trash"> Remove</i>
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
        // setEditPatient({
        //     patient_id: row["id"],
        //     first_name: row["first_name"],
        //     last_name: row["last_name"],
        //     age: row["age"],
        //     weight: row["weight"],
        //     height: row["height"],
        // });

        console.log(editPatient);

        // Open Edit Modal
        handleOpenEditModal();
    };

    const handleRemove = (row) => {
        console.log("Remove", row);
        // Add your remove logic here
        // setRemovePatient({
        //     patient_id: row["id"],
        // });
        handleOpenRemoveModal();
    };

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <h1>
                            <i className="fa fa-calendar fa-lg p-2 pt-3 m-2"></i>
                            Appointments
                        </h1>
                    </div>
                    <div className="col-6"></div>
                    <div className="col-3 d-flex align-items-end justify-content-end ">
                        <button
                            className="btn btn-success my-3"
                            id="addAppointmentBtn"
                        >
                            <i className="fa fa-plus p-1"></i> Create Appointment{" "}
                        </button>
                    </div>
                </div>

                {/* FULL CALENDAR  */}
                <div>
                    <h1>Appointments Calendar</h1>
                    <FullCalendar
                        plugins={[timeGridPlugin]}
                        initialView="timeGridWeek"
                        events={events}
                        headerToolbar={{
                            left: "prev,next today",
                            center: "title",
                            right: "timeGridWeek,timeGridDay",
                        }}
                        slotDuration="00:15:00"
                        editable={true} // Make the events editable
                        selectable={true} // Enable event selection
                        selectMirror={true}
                        eventChange={handleEventChange} // Handle event changes
                    />
                </div>

                {/* MODALS  */}
                <AddModal
                    user={user}
                    isOpen={addModal}
                    onClose={handleCloseAddModal}
                />
                <EditModal
                    user={user}
                    isOpen={editModal}
                    onClose={handleCloseEditModal}
                    editPatient={editPatient}
                />
                <RemoveModal
                    user={user}
                    isOpen={removeModal}
                    onClose={handleCloseRemoveModal}
                    removePatient={removePatient}
                />

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
                            <div class="text-center">No records found.</div>
                        )}
                    />
                </div>
            </div>
        </>
    );
};

export default Appointments;
