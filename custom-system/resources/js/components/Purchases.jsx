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

import { paginationOptions } from "./helper/paginationConfig";

const Purchases = ({ user }) => {
    // TABLE DATA
    const [data, setData] = useState([]);

    // MODAL STATES INIT
    const [modalType, setModalType] = useState(null);
    const [modalData, setModalData] = useState({
        purchLineData: [],
        user_id: user.user_id,
        username: user.username,
        total_amount: 0.0,
    });

    // SEARCH BAR INIT
    const [searchText, setSearchText] = useState("");

    const handleModalClose = () => {
        setModalType(null);
        setModalData((prevData) => ({
            ...prevData,
            purchLineData: [], // Initialize purchLineData as an empty array
            user_id: user.user_id,
            username: user.username,
            total_amount: 0.0,
        }));
    };

    const handleOpenAddModal = async () => {
        try {
            const response = await axios.get("/api/gen_purchase_number");
            const purchaseNumber = response.data;

            if (purchaseNumber) {
                setModalData((prevData) => ({
                    ...prevData,
                    purchase_number: purchaseNumber,
                    total_amount: 0.0,
                }));

                setModalType("add");
            }
        } catch (error) {
            console.error(error);
        }
    };

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

    // MODAL SUBMIT (SWTICH CASE)
    const handleModalSubmit = async (actionType) => {
        try {
            let url = "";
            let successMessage = "";

            if (actionType === "add") {
                url = "/api/add_purchase";
                successMessage = "Successfully added a new purchase!";
            } else if (actionType === "edit") {
                url = "/api/update_purchase";
                successMessage = "Successfully updated a purchase!";
            } else if (actionType === "remove") {
                url = "/api/remove_purchase";
                successMessage = "Successfully removed a purchase!";
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

    // FILTER TEXT AND NUMBER ON SEARCH BAR
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

    // HANDLE VIEW, EDIT AND REMOVE BUTTONS
    const handleView = async (row) => {
        console.log("View", row);
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
                setModalData((prevData) => ({
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
                    setModalData((prevData) => ({
                        ...prevData,
                        purchLineData: purchase_lines,
                    }));
                    // Open View Modal
                    setModalType("view");
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
            if (purchaseHeader) {
                setModalData((prevData) => ({
                    ...prevData,
                    purchase_header_id: row.id,
                    patient_name: row.patient_name,
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
                        id: val.id,
                        item_id: val.item_id,
                        item_name: val.item_name,
                        item_price: val.item_price,
                        purchased_quantity: val.purchased_quantity,
                        purchase_sub_total: val.purchase_sub_total,
                    }));
                    setModalData((prevData) => ({
                        ...prevData,
                        purchLineData: purchase_lines,
                    }));
                    // Open Edit Modal
                    setModalType("edit");
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

        setModalData({
            purch_header_id: row.id,
            user_id: user.user_id,
            username: user.username,
        });

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
                        keyField="purchase_number"
                        // data={data}
                        data={filteredData}
                        columns={columns}
                        filter={filterFactory()}
                        pagination={paginationFactory(options)}
                        wrapperClasses="table-responsive" // Add this class to make the table responsive
                        classes="table-bordered table-hover" // Add other classes for styling if needed
                        noDataIndication={() => (
                            <div className="text-center">No records found.</div>
                        )}
                    />
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

export default Purchases;
