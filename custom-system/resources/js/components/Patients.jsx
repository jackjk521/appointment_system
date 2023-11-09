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

import ViewModal from "../includes/patients/view";
import AddModal from "../includes/patients/add";
import EditModal from "../includes/patients/edit";
import RemoveModal from "../includes/patients/remove";

import { paginationOptions } from "./helper/paginationConfig";
import ExportButton from "./utility/ExportButton";

// const API_BASE_URL = "https://localhost:8000/api"; // Update with your backend URL

// axios.defaults.baseURL = API_BASE_URL;

const Patients = ({ user }) => {
    // TABLE DATA
    const [data, setData] = useState([]);

    // MODAL STATES INIT
    const [modalType, setModalType] = useState(null);
    const [modalData, setModalData] = useState({
        purchaseHistory: [],
        user_id: user.user_id,
        username: user.username,
    });

    // SEARCH BAR INIT
    const [searchText, setSearchText] = useState("");

    // FETCH TABLE DATA
    const fetchPatients = async () => {
        try {
            await axios
                .get("/api/patients")
                .then((response) => {
                    // Handle the response
                    setData(response.data);
                })
                .catch((error) => {
                    // Handle the error
                    console.error(error);
                });
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchPatients();
    }, []);

    const handleModalOpen = (type, rowData = {}) => {
        setModalType(type);
        setModalData(rowData);
    };

    const handleModalClose = () => {
        setModalType(null);
        setModalData({
            purchaseHistory: [],
            user_id: user.user_id,
            username: user.username,
        });
    };

    const handleOpenAddModal = () => {
        setModalType("add");
    };

    // MODAL SUBMIT (SWTICH CASE)
    const handleModalSubmit = async (actionType) => {
        try {
            let url = "";
            let successMessage = "";

            if (actionType === "add") {
                url = "/api/add_patient";
                successMessage = "Successfully added a new patient!";
            } else if (actionType === "edit") {
                url = "/api/update_patient";
                successMessage = "Successfully updated a patient!";
            } else if (actionType === "remove") {
                url = "/api/remove_patient";
                successMessage = "Successfully removed a patient!";
            }

            const response = await axios
                .post(url, { modalData })
                .then((response) => {
                    // Handle the response
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

                    fetchPatients();
                })
                .catch((error) => {
                    // Handle the error
                    console.error(error);
                });
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

    // FILTER TEXT AND NUMBER ON SEARCH BAR
    const handleSearch = (event) => {
        setSearchText(event.target.value);
    };

    // FILTERED DATA FOR SEARCH BAR
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
            dataField: "age",
            text: "Age",
            headerAlign: "center", // Center-align the column header
            align: "center",
        },
        {
            dataField: "height",
            text: "Height (in CM)",
            headerAlign: "center", // Center-align the column header
            align: "center",
        },
        {
            dataField: "weight",
            text: "Weight (in KG)",
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
                    <Button
                        variant="primary"
                        size="md"
                        onClick={() => handleView(row)}
                    >
                        <i className="p-1 fa fa-info-circle"></i>
                    </Button>{" "}
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

    // HANDLE VIEW, EDIT AND REMOVE BUTTONS
    const handleView = async (row) => {
        console.log("View", row);
        // Add your view logic here
        try {
            await axios
                .get("/api/get_patient", {
                    params: {
                        patient_id: row.id,
                    },
                })
                .then(async (response) => {
                    // Handle the response
                    const patientData = response.data;

                    if (patientData) {
                        setModalData((prevData) => ({
                            ...prevData,
                            patient_id: patientData[0].id,
                            first_name: patientData[0].first_name,
                            last_name: patientData[0].last_name,
                            age: patientData[0].age,
                            weight: patientData[0].weight,
                            height: patientData[0].height,
                        }));
        
                        try {
                            const res = await axios.get("/api/get_patient_history", {
                                params: {
                                    patient_id: row.id,
                                },
                            });
        
                            // console.log(res.data)
                            const purchase_lines = res.data.map((val) => ({
                                id: val.id,
                                item_id: val.item_id,
                                date_created: moment(val.date_created).format(
                                    "YYYY-MM-DD"
                                ),
                                item_name: val.item_name,
                                item_price: val.item_price,
                                purchased_quantity: val.purchased_quantity,
                                purchase_sub_total: val.purchase_sub_total,
                            }));
        
                            setModalData((prevData) => ({
                                ...prevData,
                                purchaseHistory: purchase_lines,
                            }));
        
                            setModalType("view");
                        } catch (error) {
                            console.error(error);
                        }
                                
                    }
                })
                .catch((error) => {
                    // Handle the error
                console.error(error);

                });
   
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (row) => {
        console.log("Edit", row);

        // Autofill Fields
        setModalData((prevData) => ({
            ...prevData,
            patient_id: row.id,
            first_name: row.first_name,
            last_name: row.last_name,
            age: row.age,
            weight: row.weight,
            height: row.height,
        }));

        // Open Edit Modal
        setModalType("edit");
    };

    const handleRemove = (row) => {
        console.log("Remove", row);
        // Add your remove logic here
        setModalData((prevData) => ({
            ...prevData,
            patient_id: row.id,
        }));

        // Open Remove  Modal
        setModalType("remove");
    };

    // PAGINATION
    const options = paginationOptions;

    // RENDER COMPONENT START
    return (
        <>
            <div className="container">
                <div className="row px-3">
                    <div className="col-3">
                        <h1>
                            <i className="fa fa-users fa-lg p-2 pt-3 m-2"></i>
                            Patients
                        </h1>
                    </div>
                    <div className="col-6">
                        <ExportButton data={data} />
                    </div>
                    <div className="col-3 d-flex align-items-end justify-content-end">
                        <button
                            className="btn btn-success my-3"
                            id="addPatientBtn"
                            onClick={handleOpenAddModal}
                        >
                            <i className="fa fa-plus p-1"></i> Add Patient{" "}
                        </button>
                    </div>
                </div>

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

                {/* MODALS  */}
                <ViewModal
                    user={user}
                    isOpen={modalType === "view"}
                    onClose={handleModalClose}
                    viewData={modalData}
                />
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
            </div>
        </>
    );
};

export default Patients;
