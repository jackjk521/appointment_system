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
import daygridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import EventItem from "../components/utility/CustomEventItem";
import { paginationOptions } from "./helper/paginationConfig";

const Appointments = ({ user }) => {
    // Calendar Data
    const [appointments, setAppointments] = useState([]);

    // TABLE DATA
    const [data, setData] = useState([]);

    // MODAL STATES INIT
    const [modalType, setModalType] = useState(null);
    const [modalData, setModalData] = useState({
        user_id: user.user_id,
        username: user.username,
    });

    // SEARCH BAR INIT
    const [searchText, setSearchText] = useState("");

    // DIV STATE
    const [showDiv, setShowDiv] = useState(false);

    // MODAL FUNCTIONS START

    const handleModalClose = () => {
        setModalType(null);
        setModalData({
            user_id: user.user_id,
            username: user.username,
        });
    };

    const handleOpenAddModal = () => {
        setModalType("add");
    };

    const handleOpenEditModal = () => {
        setModalType("edit");
    };
    // MODAL FUNCTIONS END

    // Populate Table Data
    const fetchData = async () => {
        try {
            const response = await axios.get("/api/appointments", {}); // works
            setData(response.data);

            const events = response.data.map((val) => ({
                appointment_id: val.id,
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

    // MODAL SUBMIT (SWTICH CASE)
    const handleModalSubmit = async (actionType) => {
        try {
            let url = "";
            let successMessage = "";

            if (actionType === "add") {
                url = "/api/add_appointment";
                successMessage = "Successfully added a new appointment!";
            } else if (actionType === "edit") {
                url = "/api/update_appointment";
                successMessage = "Successfully updated a appointment!";
            } else if (actionType === "remove") {
                url = "/api/remove_appointment";
                successMessage = "Successfully removed a appointment!";
            }

            const response = await axios.post(url, { modalData });

            handleModalClose();

            if (response.data.success) {
                Swal.fire({
                    title: "Success",
                    text: successMessage,
                    icon: "success",
                    timer: 1500,
                    showCancelButton: false,
                    showConfirmButton: false,
                });
            }

            fetchData();
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: error.message,
                icon: "error",
                timer: 1500,
                showCancelButton: false,
                showConfirmButton: false,
            });
            console.error(error);
        }
    };

    // BOOTSTRAP TABLE FILTERS START
    // FILTERED DATA FOR SEARCH BAR
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
                    {/* <Button
                        variant="warning"
                        size="md"
                        onClick={() => handleEdit(row)}
                    >
                        <i className="p-1 fa fa-edit"></i>
                    </Button>{" "} */}
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

    // HANDLE VIEW, EDIT AND REMOVE BUTTONS
    const handleView = async (row) => {
        console.log("View", row);
        // Add your view logic here
    };

    const handleEdit = (row) => {
        console.log("Edit", row);

        // Autofill Fields
        setModalData({
            appointment_id: row.id,
            full_name: row.full_name,
            patient_id: row.patient_id,
            from_datetime: row.from_datetime,
            to_datetime: row.to_datetime,
            purpose: row.purpose,
        });
        // Open Edit Modal
        setModalType("edit");
    };

    const handleRemove = (row) => {
        console.log("Remove", row);
        // Add your remove logic here
        setModalData((prevData) => ({
            ...prevData,
            appointment_id: row.id,
        }));

        // Open Remove Modal
        setModalType("remove");
    };

    // PAGINATION
    const options = paginationOptions;

    // RENDER COMPONENT START
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

                        {filteredData ? (
                            <BootstrapTable
                                keyField="id"
                                data={filteredData}
                                columns={columns}
                                filter={filterFactory()}
                                pagination={paginationFactory(options)}
                                wrapperClasses="table-responsive"
                                classes="table-bordered table-hover"
                                noDataIndication={() => (
                                    <div className="text-center">
                                        No records found.
                                    </div>
                                )}
                            />
                        ) : (
                            <div className="text-center">Loading...</div>
                        )}
                    </div>
                )}
                {/* FULL CALENDAR  */}
                <div className="container py-3">
                    <FullCalendar
                        plugins={[
                            timeGridPlugin,
                            daygridPlugin,
                            interactionPlugin,
                        ]}
                        initialView="timeGridWeek"
                        events={appointments}
                        headerToolbar={{
                            left: "prev today next",
                            center: "title",
                            right: "dayGridMonth timeGridWeek timeGridDay",
                        }}
                        slotDuration="00:15:00"
                        editable={true} // Make the events editable
                        // selectable={true} // Enable event selection
                        selectMirror={true}
                        eventClick={handleOpenEditModal}
                        eventContent={(info) => <EventItem info={info} />}
                        slotMinTime="10:00:00" // Set the minimum time to 10:00 AM
                        slotMaxTime="19:00:00" // Set the maximum time to 7:00 PM
                        eventChange={handleEventChange} // Handle event changes
                        dayHeaderContent={(args) => {
                            return (
                                <h5 className="text-dark">
                                    {moment(args.date).format("ddd Do")}{" "}
                                </h5>
                            );
                        }}
                    />
                </div>
                {/* MODALS  */}
                <AddModal
                    user={user}
                    isOpen={modalType === "add"}
                    onClose={handleModalClose}
                    addData={modalData}
                    setAddData={setModalData}
                    handleAddSubmit={() => handleModalSubmit("add")}
                />
                <EditModal
                    user={user}
                    isOpen={modalType === "edit"}
                    onClose={handleModalClose}
                    editData={modalData}
                    setEditData={setModalData}
                    handleEditSubmit={() => handleModalSubmit("edit")}
                />
                <RemoveModal
                    user={user}
                    isOpen={modalType === "remove"}
                    onClose={handleModalClose}
                    removeData={modalData}
                    setRemoveData={setModalData}
                    handleRemoveSubmit={() => handleModalSubmit("remove")}
                />
                {/* MODALS END  */}
            </div>
        </>
    );
};

export default Appointments;
