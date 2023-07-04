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

import AddModal from "../includes/patients/add";
import EditModal from "../includes/patients/edit";
import RemoveModal from "../includes/patients/remove";

const Inventory = ({ user }) => {
    // Table Data
    const [data, setData] = useState([]);

    // Modals
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [removeModal, setRemoveModal] = useState(false);

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

    // Edit Item Fields
    const [editItem, setEditItem] = useState({
        product: "",
        product_number: "",
        item_name: "",
        unit: "",
        unit_price: "",
        total_quantity: "",
    });

    // Remove Item Fields
    const [removeItem, setRemoveItem] = useState({
        product_id: "",
        product_number: "",
    });

    let genProdNum = "";

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

        // Generating Product Number in Add Modal
        genProdNum = async () => {
            try {
                await axios
                    .get("/api/gen_prod_number")
                    .then((response) => {
                        $("#addItem #txtProductNumber").val(response.data);
                        $("#addItem #txtProductNumber").prop("disabled", true);
                    })
                    .catch((error) => {
                        // Handle the error
                        console.error(error);
                    });
            } catch (error) {
                console.error(error);
            }
        };
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

        // ADD ITEM FUNCTIONS START
        $("#addItemBtn").on("click", async function () {
            try {
                await axios
                    .get("/api/gen_prod_number")
                    .then((response) => {
                        $("#addItem #txtProductNumber").val(response.data);
                        $("#addItem #txtProductNumber").prop("disabled", true);
                    })
                    .catch((error) => {
                        // Handle the error
                        console.error(error);
                    });
            } catch (error) {
                console.error(error);
            }
            handleOpenAddModal();
        });

        $("#btnAddItem").on("click", async function () {
            let itemData = {
                product_number: $("#addItem #txtProductNumber").val(),
                item_name: $("#addItem #txtItemName").val(),
                unit: $("#addItem #txtUnit").val(),
                unit_price: $("#addItem #txtUnitPrice").val(),
                total_quantity: $("#addItem #txtTotalQty").val(),
                //To get the User ID for Logs
                user_id: user.user_id,
                username: user.username,
            };

            try {
                await axios
                    .post("/api/add_item", { itemData })
                    .then((response) => {
                        handleCloseAddModal();
                        new Swal({
                            title: "Success",
                            text: "Successfully added a new item!",
                            icon: "success",
                            timer: 1500, // Set the timer duration in milliseconds
                            button: false, // Hide the close button
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
                            button: false, // Hide the close button
                        });
                        console.error(error);
                    });
            } catch (error) {
                console.error(error);
            }
        });
        // ADD ITEM FUNCTIONS END

        // EDIT ITEM FUNCTIONS START
        $("#btnEditItem").on("click", async function () {
            let itemData = {
                product_id: $("#editItem #txtProductId").val(),
                product_number: $("#editItem #txtProductNumber").val(),
                item_name: $("#editItem #txtItemName").val(),
                unit: $("#editItem #txtUnit").val(),
                unit_price: $("#editItem #txtUnitPrice").val(),
                total_quantity: $("#editItem #txtTotalQty").val(),
                //To get the User ID for Logs
                user_id: user.user_id,
                username: user.username,
            };

            try {
                await axios
                    .post("/api/update_item", { itemData })
                    .then((response) => {
                        handleCloseEditModal();
                        new Swal({
                            title: "Success",
                            text: "Successfully update an item!",
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
        // EDIT ITEM FUNCTIONS END

        // REMOVE ITEM FUNCTIONS START
        $("#btnRemoveItem").on("click", async function () {
            let itemData = {
                product_id: $("#removeItem #txtProductId").val(),
                product_number: $("#removeItem #txtProductNumber").val(),
                //To get the User ID for Logs
                user_id: user.user_id,
                username: user.username,
            };
            try {
                await axios
                    .post("/api/remove_item", { itemData })
                    .then((response) => {
                        handleCloseRemoveModal();
                        new Swal({
                            title: "Success",
                            text: "Successfully removed an item!",
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
            align: "right",
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
            align: "right",
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
            headerAlign: 'center', // Center-align the column header
            align: 'center',
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
    const handleView = (row) => {
        console.log("View", row);
        // Add your view logic here
    };

    const handleEdit = (row) => {
        console.log("Edit", row);

        // Autofill Fields
        setEditItem({
            product_id: row["id"],
            product_number: row["product_number"],
            item_name: row["item_name"],
            unit: row["unit"],
            unit_price: row["unit_price"],
            total_quantity: row["total_quantity"],
        });

        console.log(editItem);

        // Open Edit Modal
        handleOpenEditModal();
    };

    const handleRemove = (row) => {
        console.log("Remove", row);
        // Add your remove logic here
        setRemoveItem({
            product_id: row["id"],
            product_number: row["product_number"],
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
                            <i className="fa fa-tasks fa-lg p-2 pt-3 m-2"></i>
                            Inventory
                        </h1>
                    </div>
                    <div className="col-6"></div>
                    <div className="col-3 d-flex align-items-end justify-content-end ">
                        <button className="btn btn-success my-3" id="addItemBtn">
                            {" "}
                            Add Item{" "}
                        </button>
                    </div>
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
                    editItem={editItem}
                />
                <RemoveModal
                    user={user}
                    isOpen={removeModal}
                    onClose={handleCloseRemoveModal}
                    removeItem={removeItem}
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
                                placeholder="Search for Items"
                            />
                        </div>
                    </div>

                    <BootstrapTable
                        keyField="product_number"
                        // data={data}
                        data={filteredData}
                        columns={columns}
                        filter={filterFactory()}
                        pagination={paginationFactory()}
                        wrapperClasses="table-responsive" // Add this class to make the table responsive
                        classes="table-bordered table-hover" // Add other classes for styling if needed
                    />
                </div>
            </div>
        </>
    );
};

export default Inventory;
