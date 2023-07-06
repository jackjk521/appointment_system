import React, { useState, useEffect, useRef } from "react";
import { Modal, Button } from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";
import axios from "axios";
import Select from "react-select";

import CustomSelectEditor from "../../components/utility/CustomSelectPicker";

const AddModal = ({
    user,
    isOpen,
    onClose,
    purchLineData,
    setPurchLineData,
    addModalData,
    setAddModalData,
    purchaseNumber,
}) => {
    // Get table reference
    const tableRef = useRef(null);
    // Selectpicker for Patients
    const [selectedOption, setSelectedOption] = useState(null);
    const [options, setOptions] = useState([]);

    console.log(purchaseNumber);
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

        // Calculate the new total amount based on the subtotals in the purchLineData array
        const newTotalAmount = purchLineData.reduce(
            (total, row) => total + parseFloat(row.purchase_sub_total),
            0
        );

        fetchPatients();
        fetchItems();

        // Update the total amount state variable
        setAddModalData({ ...addModalData, totalAmount: newTotalAmount });
    }, [purchLineData]); // Run once

    // Function to handle option selection
    const handleSelectChange = (selected) => {
        setSelectedOption(selected);
        $("#addPurchase").attr("data-patient-id", selected.value);
    };

    const handleModalClose = () => {
        onClose();
        if (selectedOption) {
            setSelectedOption(null); // Reset selectedOption state to null if it has a value
            $("#addPurchase").attr("data-patient-id", null); // Clear the data-patient-id attribute using jQuery

            // Empty Table after close
            if (tableRef.current) {
                tableRef.current.setState({ data: [] });
            }
        }
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
        setPurchLineData([...purchLineData, newRow]);
    };

    // Function to retrieve table data
    // const handleRetrieveData = () => {
    //     setPurchLineData(purchLineData);
    //     console.log(purchLineData);
    // };

    // Selectpicker for the Items dropdowm
    const handleItemsEdit = (newValue, rowId, dataField) => {
        // Update the data with the new value
        const updatedData = purchLineData.map((row) => {
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
                            const updatedDataWithAutofill = purchLineData.map(
                                (r) => (r.id === rowId ? updatedRow : r)
                            );
                            setPurchLineData(updatedDataWithAutofill);
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
        setPurchLineData(updatedData);
    };

    // Quantity Edit handler
    const handleQuantityEdit = (newValue, rowId, dataField) => {
        const updatedData = purchLineData.map((row) => {
            if (row.id === rowId) {
                let updatedRow = { ...row, [dataField]: newValue };

                if (dataField === "purchased_quantity") {
                    const quantity = parseFloat(newValue);
                    const unitPrice = parseFloat(row.item_price);
                    const subTotal = quantity > 0 ? quantity * unitPrice : 0;
                    updatedRow = {
                        ...updatedRow,
                        purchase_sub_total: subTotal.toFixed(2), // Update the sub total
                    };
                }

                return updatedRow;
            }

            return row;
        });

        setPurchLineData(updatedData);
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
                id="addPurchase"
                size="lg"
                show={isOpen}
                onHide={handleModalClose}
                centered
            >
                <Modal.Header className="bg-success text-white" closeButton>
                    <Modal.Title>Add Purchase</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Total Amount for Purchase  */}
                    <div class="row pb-3">
                        <div
                            class="pull-right"
                            style={{ display: "inline-block" }}
                        >
                            <div>
                                <span class="pull-right fw-bold">
                                    {" "}
                                    TOTAL AMOUNT{" "}
                                </span>
                                <br></br>
                                <span class="pull-right">
                                    {" "}
                                    PHP{" "}
                                    <span id="txtTotalAmount">
                                        {addModalData.totalAmount.toLocaleString(
                                            "en-US",
                                            {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            }
                                        )}
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
                                    value={purchaseNumber}
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
                    <div class="col-md-12">
                        <div class="row">
                            <div>
                                <button
                                    className="btn btn-success me-auto"
                                    onClick={handleInsertRow}
                                >
                                    Insert Row
                                </button>
                                {/* <button
                                    className="btn btn-primary"
                                    onClick={handleRetrieveData}
                                >
                                    Retrieve Data
                                </button> */}
                                {/* <div>Total Amount: {calculateTotalAmount()}</div> */}
                                <BootstrapTable
                                    ref={tableRef}
                                    keyField="id"
                                    data={purchLineData}
                                    columns={columns}
                                    cellEdit={cellEditFactory({
                                        mode: "click",
                                        blurToSave: true,
                                    })}
                                    noDataIndication={() => (
                                        <div class="text-center">
                                            No records found.
                                        </div>
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {/* <Button variant="secondary" onClick={onClose}>
                    Close
                    </Button> */}
                    <Button variant="secondary" id="btnAddPurchase">
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AddModal;
