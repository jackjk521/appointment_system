import React, { useState, useEffect, useRef } from "react";
import { Modal, Button } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";
import axios from "axios";
import Select from "react-select";

import CustomSelectEditor from "../../components/utility/CustomSelectPicker";
import CustomQuantityEditor from "../../components/utility/CustomQuantityEditor";

const AddModal = ({
    user,
    isOpen,
    onClose,
    addData,
    setAddData,
    handleAddSubmit,
}) => {
    // Selectpicker for Patients
    const [selectedOption, setSelectedOption] = useState(null);
    const [options, setOptions] = useState([]);

    const [counter, setCounter] = useState(0);

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

        if (addData.purchLineData) {
            // Calculate the new total amount based on the subtotals in the purchLineData array
            const newTotalAmount = addData.purchLineData.reduce(
                (total, row) => total + parseFloat(row.purchase_sub_total),
                0
            );

            // Update the total amount state variable
            setAddData((prevData) => ({
                ...prevData,
                total_amount: newTotalAmount,
            }));
        }
    }, [addData.purchLineData]); // Run once

    // Generate a unique id for each new row
    const generateUniqueId = async () => {
        try {
            const response = await axios.get("/api/gen_purchase_line", {});
            const latestId = parseInt(response.data) || 0;
            setCounter(latestId);
            return latestId;
        } catch (error) {
            return null; // Handle any errors and return a default value
        }
    };

    // Add Data
    useEffect(() => {
        setAddData((prevData) => ({
            ...prevData,
            purchLineData: [], // Initialize purchLineData as an empty array
            user_id: user.user_id,
            username: user.username,
        }));
        generateUniqueId();
    }, []);

    // HANDLE TOTAL AMOUNT
    const handleTotalAmount = () => {
        return (
            addData.total_amount > 0 ? addData.total_amount : 0.0
        ).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };

    // HANDLE OPTION SELECTION
    const handleSelectChange = (selected) => {
        setSelectedOption(selected);
        setAddData((prevData) => ({ ...prevData, patient_id: selected.value }));
    };

    // Clear Fields
    const onCloseCleared = () => {
        setSelectedOption(null);
        setAddData((prevData) => ({
            ...prevData,
            user_id: user.user_id,
            username: user.username,
            total_amount: 0.0,
        }));
        onClose();

        // Function to reset the counter and call generateUniqueId again
        const resetCounter = async () => {
            setCounter(0); // Reset the counter

            // Call generateUniqueId to get the latest ID
            const latestId = await generateUniqueId();

            if (latestId) {
                setCounter(parseInt(latestId)); // Set the counter to the latest ID
            }
        };

        resetCounter();
    };
    // Purchase Line Table START

    // Selectpicker for Items
    const [itemOptions, setItemsOptions] = useState([]);

    // Function to handle row insertion
    const handleInsertRow = async () => {
        const newRow = {
            id: counter + 1,
            item_id: 0,
            item_name: "Select a product", // user input allowed
            item_price: 0.0,
            purchased_quantity: 0, // user input allowed
            purchase_sub_total: 0.0,
        };

        console.log(newRow);
        setAddData((prevState) => ({
            ...prevState,
            purchLineData: prevState.purchLineData
                ? [...prevState.purchLineData, newRow]
                : [newRow],
        }));
        setCounter((prevCounter) => prevCounter + 1);
    };

    // Function to handle row deletion
    const handleDeleteRow = (rowId) => {
        const updatedData = addData.purchLineData.filter(
            (row) => row.id !== rowId
        );

        setAddData((prevState) => ({
            ...prevState,
            purchLineData: updatedData,
        }));
    };
    // Selectpicker for the Items dropdowm
    const handleItemsEdit = (newValue, rowId, dataField) => {
        // Update the data with the new value
        const updatedData = addData.purchLineData.map((row) => {
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
                                addData.purchLineData.map((r) =>
                                    r.id === rowId ? updatedRow : r
                                );

                            setAddData((prevState) => ({
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
        setAddData((prevState) => ({
            ...prevState,
            purchLineData: updatedData,
        }));
    };

    // Quantity Edit handler
    const handleQuantityEdit = (newValue, rowId, dataField) => {
        const updatedData = addData.purchLineData.map((row) => {
            if (row.id === rowId) {
                let updatedRow = { ...row, [dataField]: newValue };

                if (dataField === "purchased_quantity") {
                    const quantity = newValue !== "" ? parseFloat(newValue) : 0;
                    const unitPrice = parseFloat(row.item_price);
                    const subTotal = quantity > 0 ? quantity * unitPrice : 0;
                    updatedRow = {
                        ...updatedRow,
                        purchased_quantity: newValue,
                        purchase_sub_total: subTotal.toFixed(2),
                    };
                }

                return updatedRow;
            }

            return row;
        });

        setAddData((prevState) => ({
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
                    value={value}
                    onChange={(newValue) =>
                        // handleCellEdit(newValue, row.id, column.dataField)
                        handleItemsEdit(newValue, row.id, column.dataField)
                    }
                    options={itemOptions}
                />
            ),
            formatter: (cell, row) => {
                const selectedOption = itemOptions.find(
                    (option) => option.value === cell
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
                <CustomQuantityEditor
                    value={value}
                    onValueChange={(newValue) =>
                        handleQuantityEdit(newValue, row.id, column.dataField)
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
        {
            dataField: "actions",
            text: "Actions",
            headerAlign: "center",
            align: "center",
            editable: false,
            formatter: (cell, row) => (
                <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteRow(row.id)}
                >
                    <i className="p-1 fa fa-trash"></i>
                </button>
            ),
        },
    ];

    // Purchase Line END

    return (
        <>
            <Modal
                id="addPurchase"
                size="lg"
                show={isOpen}
                onHide={onCloseCleared}
                centered
            >
                <Modal.Header className="bg-success text-white" closeButton>
                    <Modal.Title>Add Purchase</Modal.Title>
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
                                    value={addData.purchase_number}
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
                                    id="addSelPatients"
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
                            <br></br>
                            <span className="d-flex align-items-end justify-content-end text-danger">
                                Note: Add all products first before inputting
                                the quantity
                            </span>

                            <div className="container p-4">
                                {Array.isArray(addData.purchLineData) &&
                                addData.purchLineData.length > 0 ? (
                                    <BootstrapTable
                                        keyField="id"
                                        data={addData.purchLineData}
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
                                        No products added
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
                        onClick={handleAddSubmit}
                    >
                        Create Purchase
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AddModal;
