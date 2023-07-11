import React, { useState, useEffect, useRef } from "react";
import { Modal, Button } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";
import axios from "axios";
import Select from "react-select";

import CustomSelectEditor from "../../components/utility/CustomSelectPicker";

const EditModal = ({
    user,
    isOpen,
    onClose,
    editData,
    setEditData,
    handleEditSubmit,
}) => {
    // console.log(editData.purchLineData)
    // Selectpicker for Patients
    const [selectedOption, setSelectedOption] = useState(null);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        // Get all Patients
        const fetchPatients = async () => {
            try {
                const response = await axios.get("/api/patients", {}); // works
                const patients = response.data.map((val) => ({
                    value: val.id,
                    label: val.full_name,
                }));
                setOptions(patients);
            } catch (error) {
                console.error(error);
            }
        };

        // Get all Items
        const fetchItems = async () => {
            try {
                const response = await axios.get("/api/items", {});
                const items = response.data.map((val) => ({
                    value: val.id,
                    label: val.item_name,
                }));
                setItemsOptions(items);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPatients();
        fetchItems();

        if (editData.purchLineData) {
            // Calculate the new total amount based on the subtotals in the purchLineData array
            const newTotalAmount = editData.purchLineData.reduce(
                (total, row) => total + parseFloat(row.purchase_sub_total),
                0
            );

            // Update the total amount state variable
            setEditData((prevData) => ({
                ...prevData,
                total_amount: newTotalAmount,
            }));
        }
    }, [editData.purchLineData]); // Run once

    // EDIT Data
    useEffect(() => {
        // AUTO FILL SELECTPICKER
        setSelectedOption(
            editData.patient_id
                ? {
                      value: editData.patient_id,
                      label: editData.full_name,
                  }
                : null
        );

        setEditData((prevData) => ({
            ...prevData,
            user_id: user.user_id,
            username: user.username,
        }));
    }, []);

    // console.log(selectedOption)

    // HANDLE TOTAL AMOUNT
    const handleTotalAmount = () => {
        return (
            editData.total_amount > 0 ? editData.total_amount : 0.0
        ).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };

    // HANDLE OPTION SELECTION
    const handleSelectChange = (selected) => {
        setSelectedOption(selected);
        setEditData((prevData) => ({
            ...prevData,
            patient_id: selected?.value || null,
        }));
    };

    // Clear Fields
    const onCloseCleared = () => {
        setSelectedOption(null);
        setEditData({});
        onClose();
    };
    // Purchase Line Table START

    // Selectpicker for Items
    const [itemOptions, setItemsOptions] = useState([]);

    // Generate a unique id for each new row
    function generateUniqueId() {
        const timestamp = new Date().getTime(); // Get current timestamp
        const randomNum = Math.floor(Math.random() * 100); // Generate a random number between 0 and 999

        return `${timestamp}-${randomNum}`; // Combine timestamp and random number
    }

    // Function to handle row insertion
    const handleInsertRow = () => {
        const newRow = {
            id: generateUniqueId(),
            item_id: 0,
            item_name: "Select a product", // user input allowed
            item_price: 0.0,
            purchased_quantity: 0, // user input allowed
            purchase_sub_total: 0.0,
        };
        setEditData((prevState) => ({
            ...prevState,
            purchLineData: [...prevState.purchLineData, newRow],
        }));
    };

    // Selectpicker for the Items dropdowm
    const handleItemsEdit = (newValue, rowId, dataField) => {
        // Update the data with the new value
        const updatedData = editData.purchLineData.map((row) => {
            if (row.id === rowId) {
                let updatedRow = { ...row, [dataField]: newValue };

                // Autofill other columns based on the selected value
                if (dataField === "item_name") {
                    // Get item by id
                    axios
                        .get("/api/get_item", {
                            params: {
                                itemId: newValue, // Pass the item ID as a parameter
                            },
                        })
                        .then((response) => {
                            const parsedData = response.data;
                            if (parsedData) {
                                updatedRow = {
                                    ...updatedRow,
                                    item_id: parsedData["id"],
                                    item_price: parsedData["unit_price"],
                                };
                            }

                            // Update the state with the modified row
                            const updatedDataWithAutofill =
                                editData.purchLineData.map((r) =>
                                    r.id === rowId ? updatedRow : r
                                );

                            setEditData((prevState) => ({
                                ...prevState,
                                purchLineData: updatedDataWithAutofill,
                            }));
                        })
                        .catch((error) => {
                            // Handle the error
                            console.error(error);
                        });
                }
                return updatedRow;
            }
            return row;
        });
        setEditData((prevState) => ({
            ...prevState,
            purchLineData: updatedData,
        }));
    };

    // Quantity Edit handler
    const handleQuantityEdit = (newValue, rowId, dataField) => {
        const updatedData = editData.purchLineData.map((row) => {
            if (row.id === rowId) {
                let updatedRow = { ...row, [dataField]: newValue };

                if (dataField === "purchased_quantity") {
                    const quantity = parseFloat(newValue);
                    const unitPrice = parseFloat(row.item_price);
                    const subTotal = quantity > 0 ? quantity * unitPrice : 0;
                    updatedRow = {
                        ...updatedRow,
                        purchased_quantity: parseFloat(newValue),
                        purchase_sub_total: subTotal.toFixed(2), // Update the sub total
                    };
                }

                return updatedRow;
            }

            return row;
        });

        setEditData((prevState) => ({
            ...prevState,
            purchLineData: updatedData,
        }));
    };

    // TABLE START COLUMNS
    const columns = [
        { dataField: "id", text: "ID", hidden: true }, //works
        { dataField: "item_id", text: "Item ID", hidden: true }, //works
        {
            dataField: "item_name",
            text: "Item Name",
            headerAlign: "center", // Center-align the column header
            align: "center",
            editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
            ) => (
                <CustomSelectEditor
                    value={row.item_id}
                    onChange={(newValue) =>
                        // handleCellEdit(newValue, row.id, column.dataField)
                        handleItemsEdit(newValue, row.id, column.dataField)
                    }
                    options={itemOptions}
                />
            ),
            formatter: (cell, row) => {
                const selectedOption = itemOptions.find(
                    (option) => option.value === row.item_id
                );
                return selectedOption ? selectedOption.label : "";
            },
        },
        {
            dataField: "item_price",
            text: "Unit Price",
            headerAlign: "center", // Center-align the column header
            align: "center",
            editable: false,
            formatter: (cell, row) => {
                return new Intl.NumberFormat("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                }).format(cell);
            },
        },
        {
            dataField: "purchased_quantity",
            text: "Quantity",
            headerAlign: "center", // Center-align the column header
            align: "center",
            editorRenderer: (
                editorProps,
                value,
                row,
                column,
                rowIndex,
                columnIndex
            ) => (
                <input
                    type="number"
                    value={value}
                    className="form-control"
                    onChange={(e) =>
                        handleQuantityEdit(
                            parseFloat(e.target.value),
                            row.id,
                            column.dataField
                        )
                    }
                />
            ),
            formatter: (cell, row) => {
                return new Intl.NumberFormat("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                }).format(cell);
            },
        },
        {
            dataField: "purchase_sub_total",
            text: "Sub Total",
            headerAlign: "center", // Center-align the column header
            align: "center",
            editable: false,
            formatter: (cell, row) => {
                const formattedSubTotal = parseFloat(cell).toFixed(2);
                return new Intl.NumberFormat("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                }).format(formattedSubTotal);
            },
        },
    ];

    // Purchase Line END

    return (
        <>
            <Modal
                id="editPurchase"
                size="lg"
                show={isOpen}
                onHide={onCloseCleared}
                centered
            >
                <Modal.Header className="bg-warning text-white" closeButton>
                    <Modal.Title>Edit Purchase</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Total Amount for Purchase  */}
                    <div className="row pb-3">
                        <div
                            className="pull-right"
                            style={{ display: "inline-block" }}
                        >
                            <div>
                                <span className="pull-right fw-bold">
                                    {" "}
                                    TOTAL AMOUNT{" "}
                                </span>
                                <br></br>
                                <span className="pull-right">
                                    {" "}
                                    PHP{" "}
                                    <span id="txtTotalAmount">
                                        {handleTotalAmount()}
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="row p-2 pt-4">
                        <div className="col-6">
                            <div className="form-group">
                                <label className="fw-bold py-3">
                                    Purchase Number
                                </label>
                                <input
                                    type="text"
                                    name="txtPurchaseNumber"
                                    id="txtPurchaseNumber"
                                    placeholder="Purchase Number"
                                    className="form-control"
                                    value={editData.purchase_number}
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="form-group">
                                <label className="fw-bold py-3">
                                    Patient's Name
                                </label>

                                {/* Init Selectpicker for Patients */}
                                <Select
                                    id="editSelPatients"
                                    name="patients_id"
                                    value={selectedOption}
                                    onChange={handleSelectChange}
                                    options={options}
                                    isSearchable
                                    placeholder="Select an option"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Purchase Line jsGrid  */}
                    <div className="col-md-12">
                        <div className="row ">
                            <div className="d-flex align-items-end justify-content-end my-3">
                                <button
                                    className="btn btn-success"
                                    onClick={handleInsertRow}
                                >
                                    <i className="fa fa-plus p-1">
                                        {" "}
                                        Add Product{" "}
                                    </i>
                                </button>
                            </div>

                            <div className="container">
                                {Array.isArray(editData.purchLineData) &&
                                editData.purchLineData.length > 0 ? (
                                    <BootstrapTable
                                        keyField="id"
                                        data={editData.purchLineData}
                                        columns={columns}
                                        cellEdit={cellEditFactory({
                                            mode: "click",
                                            blurToSave: true,
                                        })}
                                        noDataIndication={() => (
                                            <div className="text-center">
                                                No records found.
                                            </div>
                                        )}
                                    />
                                ) : (
                                    <div className="text-center">
                                        No records found.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {/* <Button variant="secondary" onClick={onClose}>
                    Close
                    </Button> */}
                    <Button
                        variant="secondary"
                        id="btnAddPurchase"
                        onClick={handleEditSubmit}
                    >
                        Create Purchase
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default EditModal;
