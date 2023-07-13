import React, { useEffect, useState } from "react";
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

import AddModal from "../includes/inventory/add";
import EditModal from "../includes/inventory/edit";
import RemoveModal from "../includes/inventory/remove";

import { paginationOptions } from "./helper/paginationConfig";

const Inventory = ({ user }) => {
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

    // Populate Table Data
    const fetchData = async () => {
        try {
            const response = await axios.get("/api/items", {}); // works
            setData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleModalClose = () => {
        setModalType(null);
        setModalData({
            purchaseHistory: [],
            user_id: user.user_id,
            username: user.username,
        });
    };

    const handleOpenAddModal = async () => {
        try {
            await axios
                .get("/api/gen_prod_number")
                .then((response) => {
                    setModalData((prevData) => ({
                        ...prevData,
                        product_number: response.data,
                    }));
                    setModalType("add");
                })
                .catch((error) => {
                    // Handle the error
                    console.error(error);
                });
        } catch (error) {
            console.error(error);
        }
    };

    // MODAL SUBMIT (SWTICH CASE)
    const handleModalSubmit = async (actionType) => {
        try {
            let url = "";
            let successMessage = "";

            if (actionType === "add") {
                url = "/api/add_item";
                successMessage = "Successfully added a new item!";
            } else if (actionType === "edit") {
                url = "/api/update_item";
                successMessage = "Successfully updated a item!";
            } else if (actionType === "remove") {
                url = "/api/remove_item";
                successMessage = "Successfully removed a item!";
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

    // FILTERED DATA FOR SEARCH BAR
    const filteredData = data.filter((item) => {
        const { product_number, item_name, unit, unit_price, total_quantity } =
            item;
        const searchValue = searchText.toLowerCase();
        return (
            product_number.toLowerCase().includes(searchValue) ||
            item_name.toLowerCase().includes(searchValue) ||
            unit.toLowerCase().includes(searchValue) ||
            parseFloat(unit_price).toString().includes(searchValue) ||
            parseFloat(total_quantity).toString().includes(searchValue)
        );
    });

    // BOOTSTRAP TABLE INITIALIZATION
    const columns = [
        {
            dataField: "product_number",
            text: "Product No.",
            headerAlign: "center", // Center-align the column header
            align: "center",
        },
        {
            dataField: "item_name",
            text: "Item Name",
            headerAlign: "center", // Center-align the column header
            align: "center",
        },
        {
            dataField: "unit",
            text: "Unit",
            headerAlign: "center", // Center-align the column header
            align: "center",
        },
        {
            dataField: "unit_price",
            text: "Unit Price (in PHP)",
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
            dataField: "total_quantity",
            text: "Total Quantity",
            headerAlign: "center", // Center-align the column header
            align: "center",
            formatter: (cell, row) => {
                return new Intl.NumberFormat("en-US", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
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
                    {/* <Button variant="info" size="md" onClick={() => handleView(row)}>
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

    // HANDLE VIEW, EDIT AND REMOVE BUTTONS
    const handleView = (row) => {
        console.log("View", row);
        // Add your view logic here
    };

    const handleEdit = (row) => {
        console.log("Edit", row);

        // Autofill Fields
        setModalData((prevData) => ({
            ...prevData,
            product_id: row.id,
            product_number: row.product_number,
            item_name: row.item_name,
            unit: row.unit,
            unit_price: row.unit_price,
            total_quantity: row.total_quantity,
        }));

        // Open Edit Modal
        setModalType("edit");
    };

    const handleRemove = (row) => {
        console.log("Remove", row);
        // Add your remove logic here
        setModalData((prevData) => ({
            ...prevData,
            product_id: row.id,
            product_number: row.product_number,
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
                    <div className="col-3">
                        <h1>
                            <i className="fa fa-tasks fa-lg p-2 pt-3 m-2"></i>
                            Inventory
                        </h1>
                    </div>
                    <div className="col-6"></div>
                    <div className="col-3 d-flex align-items-end justify-content-end ">
                        <button
                            className="btn btn-success my-3"
                            id="addItemBtn"
                            onClick={handleOpenAddModal}
                        >
                            {" "}
                            <i className="fa fa-plus p-1"></i>
                            Add Item{" "}
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
                                placeholder="Search for Items"
                            />
                        </div>
                    </div>

                    {filteredData ? (
                        <BootstrapTable
                            keyField="product_number"
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

export default Inventory;
