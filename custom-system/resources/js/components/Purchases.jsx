import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Cleave from "cleave.js";
import Swal from "sweetalert2";

import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, {
    textFilter,
    defaultFilter,
} from "react-bootstrap-table2-filter";
import { Button } from "react-bootstrap";

import ViewModal from "../includes/purchases/view";
import AddModal from "../includes/purchases/add";
import EditModal from "../includes/patients/edit";
import RemoveModal from "../includes/purchases/remove";

// jsGRid
// import PurchaseLine_table from "./jsGrid/PurchaseLine_table";

const Purchases = ({ user }) => {
    // Table Data
    const [data, setData] = useState([]);

    // Add Modal Data
    const [purchLineData, setPurchLineData] = useState([]);

    // View Modal Data 
    const [purchaseList, setPurchaseList] = useState([]);

    const [addModalData, setAddModalData] = useState({
        purchase_number: "",
        totalAmount: 0.0,
    });

    // Modals
    const [viewModal, setViewModal] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [removeModal, setRemoveModal] = useState(false);

    // Add Modal
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

    // View Purchase Fields
    const [viewPurchase, setViewPurchase] = useState({
        purchase_number: "",
        patient_name: "",
        total_amount: "",
        created_by: "",
    });

    // Edit Item Fields
    const [editPatient, setEditPatient] = useState({
        patient_id: "",
        first_name: "",
        last_name: "",
        age: "",
        weight: "",
        height: "",
    });

    // Remove Item Fields
    const [removePurchase, setRemovePurchase] = useState({
        purch_header_id: "",
    });

    // Populate Table Data
    const fetchData = async () => {
        try {
            const response = await axios.get("/api/purchases", {}); // works
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

    // ADD PURCHASE FUNCTIONS START
    const generatePurchaseNumber = async () => {
        
    };

    $("#addPurchaseBtn").on("click", async function () {
        try {
            const response = await axios.get("/api/gen_purchase_number");
            const purchaseNumber = response.data;
            
            if (purchaseNumber) {
                setAddModalData((prevAddModalData) => ({
                    ...prevAddModalData,
                    purchase_number: purchaseNumber,
                }));
    
                handleOpenAddModal();
            }
        } catch (error) {
            console.error(error);
        }
    });

    $("#btnAddPurchase").off("click").on("click", async function (event) {
        event.stopPropagation();
        // console.log( $("#addPurchase").attr('data-patient-id')) // works

        let purchaseData = {
            purchase_number: addModalData.purchase_number,
            patient_id: $("#addPurchase").attr("data-patient-id"),
            total_amount: addModalData.totalAmount,
            purchase_line: purchLineData,
            //To get the User ID for Logs
            user_id: user.user_id,
            username: user.username,
        };

        // console.log(purchaseData)
        try {
            await axios
                .post("/api/add_purchase", { purchaseData })
                .then((response) => {
                        handleCloseAddModal();
                        new Swal({
                            title: "Success",
                            text: "Successfully added a new purchase!",
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
    // ADD PURCHASE FUNCTIONS END

    // VIEW PURCHASE FUNCTIONS START

    // const viewPurchaseFunction = async (id) => {
    //     try {
    //         const response = await axios.get("/api/get_purchase", {
    //             purch_header_id: id
    //         });
    //         const purchaseHeader = response.data;
    //         console.log(purchaseHeader)
    //         // if (purchaseNumber) {
    //         //     $("#viewPurchase #txtPurchaseNumber").val(purchaseHeader)
    //         //     setAddModalData((prevAddModalData) => ({
    //         //         ...prevAddModalData,
    //         //         purchase_number: purchaseNumber,
    //         //     }));
    
    //         //     handleOpenAddModal();
    //         // }
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    // VIEW PURCHASE FUNCTIONS END

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
    $("#removePurchase #btnRemovePurchase").on("click", async function () {
        console.log('removeingg')
        let purchaseData = {
           purch_header_id: $("#removePurchase #txtPurchHeaderId").val(),
            //To get the User ID for Logs
            user_id: user.user_id,
            username: user.username,
        };
        try {
            await axios
                .post("/api/remove_purchase", { purchaseData })
                .then((response) => {
                    handleCloseRemoveModal();
                    new Swal({
                        title: "Success",
                        text: "Successfully removed an purchase!",
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
        const { purchase_number, patient_name, total_amount } = patient;
        const searchValue = searchText.toLowerCase();
        return (
            purchase_number.toLowerCase().includes(searchValue) ||
            patient_name.toLowerCase().includes(searchValue) ||
            parseFloat(total_amount).toString().includes(searchValue)
        );
    });

    // BOOTSTRAP TABLE INITIALIZATION
    const columns = [
        {
            dataField: "purchase_number",
            text: "Purchase Number",
            headerAlign: "center", // Center-align the column header
            align: "center",
        },
        {
            dataField: "patient_name",
            text: "Patient's Name",
            headerAlign: "center", // Center-align the column header
            align: "center",
        },
        {
            dataField: "total_amount",
            text: "Total Amount",
            headerAlign: "center", // Center-align the column header
            align: "center",
            formatter: (cell, row) => {
                return new Intl.NumberFormat("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                }).format(cell);
            },
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
        console.log("View", row.id);
        // Add your view logic here
        // viewPurchaseFunction(row.id)
        let purch_header_id = row.id
        try {
            const response = await axios.get("/api/get_purchase", {
                params: {
                    purch_header_id: purch_header_id
                }
            });
            const purchaseHeader = response.data;
            console.log(purchaseHeader[0])
            if (purchaseHeader) {

                setViewPurchase({
                    purchase_number: purchaseHeader[0].purchase_number,
                    patient_name: purchaseHeader[0].patient_name,
                    total_amount: purchaseHeader[0].total_amount,
                    created_by: purchaseHeader[0].username
                })

                    try {
                        const res = await axios.get("/api/get_purchase_line", {
                            params: {
                                purch_header_id: purch_header_id
                            }
                        });
                        const purchase_lines = res.data.map((val) => ({
                            item_name: val.item_name,
                            item_price: val.item_price,
                            purchased_quantity: val.purchased_quantity,
                            purchase_sub_total: val.purchase_sub_total
                        }));
                        setPurchaseList(purchase_lines)
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
        console.log("Remove", row.id);
        // Add your remove logic here
        setRemovePurchase({
            purch_header_id: row.id,
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
                            <i className="fa fa-money fa-lg p-2 pt-3 m-2"></i>
                            Purchases
                        </h1>
                    </div>
                    <div className="col-6"></div>
                    <div className="col-3 d-flex align-items-end justify-content-end ">
                        <button
                            className="btn btn-success my-3"
                            id="addPurchaseBtn"
                        >
                            <i className="fa fa-plus p-1"></i> Create Purchase{" "}
                        </button>
                    </div>
                </div>

                {/* MODALS  */}
                <ViewModal
                    user={user}
                    isOpen={viewModal}
                    onClose={handleCloseViewModal}
                    viewPurchase={viewPurchase}
                    purchaseList={purchaseList}
                />
                <AddModal
                    user={user}
                    isOpen={addModal}
                    onClose={handleCloseAddModal}
                    purchLineData={purchLineData}
                    setPurchLineData={setPurchLineData}
                    addModalData={addModalData}
                    purchaseNumber={addModalData.purchase_number}
                    setAddModalData={setAddModalData}
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
                    removePurchase={removePurchase}
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
                                placeholder="Search for Purchases"
                            />
                        </div>
                    </div>

                    {/* <PurchaseLine_table/> */}

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

export default Purchases;
