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

const Patients = ({ user }) => {
    // Table Data
    const [data, setData] = useState([]);

    // View
    const [purchaseHistory, setPurchaseHistory] = useState([]);

    // View , Add, Edit , Remove Data
    const [viewData, setViewData] = useState({ purchaseHistory: [] });
    const [addData, setAddData] = useState({});
    const [editData, setEditData] = useState({});
    const [removeData, setRemoveData] = useState({});

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
        setViewData({});
    };

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

    // ADD PATIENT FUNCTIONS START
    const handleAddSubmit = async () => {
 
        try {
            await axios
                .post("/api/add_patient", { addData })
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
    };
    // ADD PATIENT FUNCTIONS END

    // EDIT PATIENT FUNCTIONS START
    const handleEditSubmit = async () => {

        try {
            await axios
                .post("/api/update_patient", { editData })
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
    };
    // EDIT PATIENT FUNCTIONS END

    // REMOVE ITEM FUNCTIONS START
    const handleRemoveSubmit = async () => {
        try {
            await axios
                .post("/api/remove_patient", { removeData })
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
    };
    // REMOVE ITEM FUNCTIONS END



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

    // View , Edit and Remove Functions
    const handleView = async (row) => {
        console.log("View", row);
        // Add your view logic here
        try {
            const response = await axios.get("/api/get_patient", {
                params: {
                    patient_id: row.id,
                },
            });
            const patientData = response.data;

            if (patientData) {
                setViewData((prevData) =>({
                    ...prevData, 
                    patient_id: patientData[0].id,
                    first_name: patientData[0].first_name,
                    last_name: patientData[0].last_name,
                    age: patientData[0].age,
                    weight: patientData[0].weight,
                    height: patientData[0].height,
                }))

                try {
                    const res = await axios.get("/api/get_patient_history", {
                        params: {
                            patient_id: row.id,
                        },
                    });

                    // console.log(res.data)
                    const purchase_lines = res.data.map((val) => ({
                        item_id: val.item_id,
                        date_created: moment(val.date_created).format(
                            "YYYY-MM-DD"
                        ),
                        item_name: val.item_name,
                        item_price: val.item_price,
                        purchased_quantity: val.purchased_quantity,
                        purchase_sub_total: val.purchase_sub_total,
                    }));

                    setViewData((prevData) =>({
                        ...prevData, 
                        purchaseHistory: purchase_lines
                    }))
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
        setEditData((prevData) => ({
            ...prevData,
            patient_id: row.id,
            first_name: row.first_name,
            last_name: row.last_name,
            age: row.age,
            weight: row.weight,
            height: row.height,
        }));

        // Open Edit Modal
        handleOpenEditModal();
    };

    const handleRemove = (row) => {
        console.log("Remove", row);
        // Add your remove logic here
        setRemoveData((prevData) => ({
            ...prevData,
            patient_id: row.id
        }))
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
                            onClick={handleOpenAddModal}
                        >
                            <i className="fa fa-plus p-1"></i> Add Patient{" "}
                        </button>
                    </div>
                </div>

                {/* MODALS  */}
                <ViewModal
                    user={user}
                    isOpen={viewModal}
                    onClose={handleCloseViewModal}
                    viewData={viewData}
                />
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
                    setRemoveData={setRemoveData}
                    handleRemoveSubmit={handleRemoveSubmit}
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

export default Patients;
