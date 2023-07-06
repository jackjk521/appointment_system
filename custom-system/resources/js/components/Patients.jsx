import React, { useEffect, useState } from "react";
import axios from "axios";
import Cleave from "cleave.js";
import Swal from "sweetalert2";
import moment from 'moment'

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

const Patients = ({ user }) => {
    // Table Data
    const [data, setData] = useState([]);

    // View 
    const [purchaseHistory, setPurchaseHistory] = useState([]);
    
    // Modals
    const [viewModal, setViewModal] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [removeModal, setRemoveModal] = useState(false);

     // View Modal
     const handleOpenViewModal = () => {
        setViewModal(true);
    };
    const handleCloseViewModal = () => {
        setViewModal(false);
    };

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

    //VIew Patient Fields
    const [viewPatient, setViewPatient] = useState({
        patient_id: '',
        first_name: '',
        last_name: '',
        age: '',
        weight: '',
        height: '',
    });

    // Edit Patient Fields
    const [editPatient, setEditPatient] = useState({
        patient_id: '',
        first_name: '',
        last_name: '',
        age: '',
        weight: '',
        height: '',
    });

    // Remove Item Fields
    const [removePatient, setRemovePatient] = useState({
        patient_id: '',
    });

    // Populate Table Data
    const fetchData = async () => {
        try {
            const response = await axios.get("/api/patients", {}); // works
            setData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

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
        $("#addPatientBtn").on("click", async function () {
            handleOpenAddModal();
        });

        $("#btnAddPatient").on("click", async function () {
            let patientData = {
                first_name: $("#addPatient #txtFirstName").val(),
                last_name: $("#addPatient #txtLastName").val(),
                age: $("#addPatient #txtAge").val(),
                weight: $("#addPatient #txtWeight").val(),
                height: $("#addPatient #txtHeight").val(),
                //To get the User ID for Logs
                user_id: user.user_id,
                username: user.username,
            };

            try {
                await axios
                    .post("/api/add_patient", { patientData })
                    .then((response) => {
                        handleCloseAddModal();
                        new Swal({
                            title: "Success",
                            text: "Successfully added a new patient!",
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
        });
        // ADD PATIENT FUNCTIONS END

        // EDIT PATIENT FUNCTIONS START
        $("#btnEditPatient").on("click", async function () {
            let patientData = {
                patient_id: $("#editPatient #txtPatientId").val(),
                first_name: $("#editPatient #txtFirstName").val(),
                last_name: $("#editPatient #txtLastName").val(),
                age: $("#editPatient #txtAge").val(),
                weight: $("#editPatient #txtWeight").val(),
                height: $("#editPatient #txtHeight").val(),
                //To get the User ID for Logs
                user_id: user.user_id,
                username: user.username,
            };

            try {
                await axios
                    .post("/api/update_patient", { patientData })
                    .then((response) => {
                        handleCloseEditModal();
                        new Swal({
                            title: "Success",
                            text: "Successfully update an patient!",
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
        });
        // EDIT PATIENT FUNCTIONS END

        // REMOVE ITEM FUNCTIONS START
        $("#btnRemovePatient").on("click", async function () {
            let patientData = {
                patient_id: $("#removePatient #txtPatientId").val(),
                //To get the User ID for Logs
                user_id: user.user_id,
                username: user.username,
            };
            try {
                await axios
                    .post("/api/remove_patient", { patientData })
                    .then((response) => {
                        handleCloseRemoveModal();
                        new Swal({
                            title: "Success",
                            text: "Successfully removed an patient!",
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
        });
        // REMOVE ITEM FUNCTIONS END
    });

 

    // Filter Text and Numbers (Exact)
    const [searchText, setSearchText] = useState("");
    const handleSearch = (event) => {
        setSearchText(event.target.value);
    };

    const filteredData = data.filter((patient) => {
        const { first_name, last_name, age, height, weight} = patient;
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
                        <i className="px-1 fa fa-info-circle"> View </i>
                    </Button>{" "}
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

    // View , Edit and Remove Functions
    const handleView = async (row) => {
        console.log("View", row);
        // Add your view logic here
        let patient_id = row.id
        try {
            const response = await axios.get("/api/get_patient", {
                params: {
                    patient_id: patient_id
                }
            });
            const patientData = response.data;

            if (patientData) {

                setViewPatient({
                    patient_id: patientData[0].patient_id,
                    first_name: patientData[0].first_name,
                    last_name: patientData[0].last_name,
                    age: patientData[0].age,
                    weight: patientData[0].weight,
                    height: patientData[0].height,
                })
                
                    try {
                        const res = await axios.get("/api/get_patient_history", {
                            params: {
                                  patient_id: patient_id
                            }
                        });

                        // console.log(res.data)
                        const purchase_lines = res.data.map((val) => ({
                           item_id: val.item_id,
                            date_created: moment(val.date_created).format("YYYY-MM-DD"),
                            item_name: val.item_name,
                            item_price: val.item_price,
                            purchased_quantity: val.purchased_quantity,
                            purchase_sub_total: val.purchase_sub_total
                        }));

                        setPurchaseHistory(purchase_lines)
                        // console.log(purchaseHistory)
                        handleOpenViewModal();
                    } catch (error) {
                        console.error(error);
                    }
        
                }
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (row) => {
        console.log("Edit", row);

        // Autofill Fields
        setEditPatient({
            patient_id: row["id"],
            first_name: row["first_name"],
            last_name: row["last_name"],
            age: row["age"],
            weight: row["weight"],
            height: row["height"],
        });

        console.log(editPatient);

        // Open Edit Modal
        handleOpenEditModal();
    };

    const handleRemove = (row) => {
        console.log("Remove", row);
        // Add your remove logic here
        setRemovePatient({
            patient_id: row["id"],
        });
        handleOpenRemoveModal();
    };

    // Render Component START
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <h1>
                            <i className="fa fa-users fa-lg p-2 pt-3 m-2"></i>
                            Patients
                        </h1>
                    </div>
                    <div className="col-6"></div>
                    <div className="col-3 d-flex align-items-end justify-content-end ">
                        <button
                            className="btn btn-success my-3"
                            id="addPatientBtn"
                        >
                            <i className="fa fa-plus p-1"></i>
                            {" "}
                            Add Patient{" "}
                        </button>
                    </div>
                </div>

                {/* MODALS  */}
                <ViewModal
                    user={user}
                    isOpen={viewModal}
                    onClose={handleCloseViewModal}
                    viewPatient={viewPatient}
                    purchaseHistory={purchaseHistory}
                />
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
                        noDataIndication={() => <div class="text-center">No records found.</div>}
                    />
                </div>
            </div>
        </>
    );
};

export default Patients;
