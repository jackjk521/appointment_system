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
import EditModal from "../includes/purchases/edit";
import RemoveModal from "../includes/purchases/remove";

// jsGRid
// import PurchaseLine_table from "./jsGrid/PurchaseLine_table";

const Purchases = ({ user }) => {
    // Table Data
    const [data, setData] = useState([]);

    // Add, Edit , Remove Data
    const [viewData, setViewData] = useState({ purchLineData: [] });
    const [addData, setAddData] = useState({ purchLineData: [] });
    const [editData, setEditData] = useState({ purchLineData: [] });
    const [removeData, setRemoveData] = useState({});

    // Modals
    const [viewModal, setViewModal] = useState(false);
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [removeModal, setRemoveModal] = useState(false);

    // MODAL FUNCTIONS START

    // View Modal
    const handleOpenViewModal = () => {
        setViewModal(true);
    };
    const handleCloseViewModal = () => {
        setViewModal(false);
    };

    // Add Modal
    const handleOpenAddModal = async () => {
        try {
            const response = await axios.get("/api/gen_purchase_number");
            const purchaseNumber = response.data;

            if (purchaseNumber) {
                setAddData((prevData) => ({
                    ...prevData,
                    purchase_number: purchaseNumber,
                    total_amount: 0.0,
                }));

                setAddModal(true);
            }
        } catch (error) {
            console.error(error);
        }
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
            const response = await axios.get("/api/purchases", {}); // works
            setData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // ADD APPOINTMENTS FUNCTIONS START
    const handleAddSubmit = async () => {
        // console.log(addData);
        try {
            await axios
                .post("/api/add_purchase", { addData })
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
    };
    // ADD APPOINTMENTS FUNCTIONS END

    // REMOVE ITEM FUNCTIONS START
    const handleRemoveSubmit = async () => {
        try {
            await axios
                .post("/api/remove_purchase", { removeData })
                .then((response) => {
                    handleCloseRemoveModal();
                    new Swal({
                        title: "Success",
                        text: "Successfully removed a purchase!",
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

    // EDIT PATIENT FUNCTIONS START
    const handleEditSubmit = async () => {
        console.log(editData);
        try {
            await axios
                .post("/api/update_purchase", { editData })
                .then((response) => {
                    handleCloseEditModal();
                    // new Swal({
                    //     title: "Success",
                    //     text: "Successfully update an patient!",
                    //     icon: "success",
                    //     timer: 1500, // Set the timer duration in milliseconds
                    //     showCancelButton: false,
                    //     showConfirmButton: false,
                    // });

                    fetchData();
                })
                .catch((error) => {
                    // Handle the error
                    // new Swal({
                    //     title: "Error",
                    //     text: error,
                    //     icon: "error",
                    //     timer: 1500, // Set the timer duration in milliseconds
                    //     showCancelButton: false,
                    //     showConfirmButton: false,
                    // });
                    console.error(error);
                });
        } catch (error) {
            console.error(error);
        }
    };
    // EDIT PATIENT FUNCTIONS END

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
        console.log("View", row.id);
        // Add your view logic here

        try {
            const response = await axios.get("/api/get_purchase", {
                params: {
                    purch_header_id: row.id,
                },
            });
            const purchaseHeader = response.data;
            // console.log(purchaseHeader[0])
            if (purchaseHeader) {
                setViewData((prevData) => ({
                    ...prevData,
                    purchase_number: purchaseHeader[0].purchase_number,
                    patient_name: purchaseHeader[0].patient_name,
                    total_amount: purchaseHeader[0].total_amount,
                    created_by: purchaseHeader[0].username,
                }));

                try {
                    const res = await axios.get("/api/get_purchase_line", {
                        params: {
                            purch_header_id: row.id,
                        },
                    });
                    const purchase_lines = res.data.map((val) => ({
                        item_name: val.item_name,
                        item_price: val.item_price,
                        purchased_quantity: val.purchased_quantity,
                        purchase_sub_total: val.purchase_sub_total,
                    }));
                    setViewData((prevData) => ({
                        ...prevData,
                        purchLineData: purchase_lines,
                    }));
                    handleOpenViewModal();
                } catch (error) {
                    console.error(error);
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = async (row) => {
        console.log("Edit", row);

        // Autofill Fields
        try {
            const response = await axios.get("/api/get_purchase", {
                params: {
                    purch_header_id: row.id,
                },
            });
            const purchaseHeader = response.data;
            // console.log(purchaseHeader[0])
            if (purchaseHeader) {
                setEditData((prevData) => ({
                    ...prevData,
                    purchase_header_id: row.id,
                    patient_id: purchaseHeader[0].patient_id,
                    purchase_number: purchaseHeader[0].purchase_number,
                    full_name: purchaseHeader[0].patient_name,
                    total_amount: purchaseHeader[0].total_amount,
                    created_by: purchaseHeader[0].username,
                }));

                try {
                    const res = await axios.get("/api/get_purchase_line", {
                        params: {
                            purch_header_id: row.id,
                        },
                    });
                    const purchase_lines = res.data.map((val) => ({
                        purchase_line_id: val.id,
                        item_id: val.item_id,
                        item_name: val.item_name,
                        item_price: val.item_price,
                        purchased_quantity: val.purchased_quantity,
                        purchase_sub_total: val.purchase_sub_total,
                    }));
                    setEditData((prevData) => ({
                        ...prevData,
                        purchLineData: purchase_lines,
                    }));
                    // Open Edit Modal
                    handleOpenEditModal();
                } catch (error) {
                    console.error(error);
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleRemove = (row) => {
        console.log("Remove", row.id);
        // Add your remove logic here

        setRemoveData({
            purch_header_id: row.id,
            user_id: user.user_id,
            username: user.username,
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
                            onClick={handleOpenAddModal}
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
                            <div className="text-center">No records found.</div>
                        )}
                    />
                </div>
            </div>
        </>
    );
};

export default Purchases;
