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

const Inventory = ({ user }) => {
    // Table Data
    const [data, setData] = useState([]);

    // View , Add, Edit , Remove Data
    const [viewData, setViewData] = useState({});
    const [addData, setAddData] = useState({});
    const [editData, setEditData] = useState({});
    const [removeData, setRemoveData] = useState({});

    // Modals
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [removeModal, setRemoveModal] = useState(false);

    // Add Modal
    const handleOpenAddModal = async () => {
        try {
            await axios
                .get("/api/gen_prod_number")
                .then((response) => {
                    setAddData((prevData) => ({
                        ...prevData,
                        product_number: response.data,
                    }));
                    setAddModal(true);
                })
                .catch((error) => {
                    // Handle the error
                    console.error(error);
                });
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

    // ADD ITEM FUNCTIONS START

    const handleAddSubmit = async () => {
        // console.log(addData)
        try {
            await axios
                .post("/api/add_item", { addData })
                .then((response) => {
                    handleCloseAddModal();
                    new Swal({
                        title: "Success",
                        text: "Successfully added a new item!",
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
    // ADD ITEM FUNCTIONS END

    // EDIT ITEM FUNCTIONS START
    const handleEditSubmit = async () => {
        try {
            await axios
                .post("/api/update_item", { editData })
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
    };
    // EDIT ITEM FUNCTIONS END

    // REMOVE ITEM FUNCTIONS START
    const handleRemoveSubmit = async () => {
    
        try {
            await axios
                .post("/api/remove_item", { removeData })
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
    };
    // REMOVE ITEM FUNCTIONS END

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
        setEditData((prevData) => ({
            ...prevData,
            product_id: row.id,
            product_number: row.product_number,
            item_name: row.item_name,
            unit: row.unit,
            unit_price: row.unit_price,
            total_quantity: row.total_quantity,
        }));

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

        setRemoveData((prevData) => ({
            ...prevData,
            product_id: row.id,
            product_number: row.product_number,
        }));
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

                {/* MODALS  */}
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
                        noDataIndication={() => (
                            <div class="text-center">No records found.</div>
                        )}
                    />
                </div>
            </div>
        </>
    );
};

export default Inventory;
