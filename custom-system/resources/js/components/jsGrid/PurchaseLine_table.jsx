import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";
import Select from "react-select";
import axios from "axios";

const CustomSelectEditor = ({ value, onChange, options }) => {
    const handleChange = (selectedOption) => {
        onChange(selectedOption.value);
    };

    const selectedOption = options.find((option) => option.value === value);
    const displayValue = selectedOption ? selectedOption.label : "";

    return (
        <Select
            // value={{ value, label: displayValue }}
            value={{ value, label: displayValue }}
            onChange={handleChange}
            options={options}
        />
    );
};

const PurchaseLine_table = () => {
    const [data, setData] = useState([]);

    // Selectpicker for Items
    const [options, setOptions] = useState([]);

    useEffect(() => {
        // Get all Items
        const fetchItems = async () => {
            try {
                const response = await axios.get("/api/items", {}); // works
                $.each(response.data, (i, val) => {
                    setOptions((options) => [
                        ...options,
                        {
                            value: val.id,
                            label: val.item_name,
                        },
                    ]);
                });
            } catch (error) {
                console.error(error);
            }
        };

        fetchItems();
    }, []); // Run once

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
            item_id: '',
            item_name: "Select a product", // user input allowed
            item_price: 0.0,
            purchased_quantity: 0, // user input allowed
            purchase_sub_total: 0.0,
        };
        setData([...data, newRow]);
    };

    // Function to retrieve table data
    const handleRetrieveData = () => {
      console.log(data);
    };

    // Selectpicker for the Items dropdowm
    const handleCellEdit = (newValue, rowId, dataField) => {
        // Update the data with the new value
        const updatedData = data.map((row) => {
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
                            const updatedDataWithAutofill = data.map((r) =>
                                r.id === rowId ? updatedRow : r
                            );
                            setData(updatedDataWithAutofill);
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
        setData(updatedData);
    };
    const handleQuantityEdit = (newValue, rowId, dataField) => {
        const updatedData = data.map((row) => {
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

        setData(updatedData);
    };


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
                        handleCellEdit(newValue, row.id, column.dataField)
                    }
                    options={options}
                />
            ),
            formatter: (cell, row) => {
              const selectedOption = options.find((option) => option.value === cell);
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

    return (
        <div>
            <button onClick={handleInsertRow}>Insert Row</button>
            <button onClick={handleRetrieveData}>Retrieve Data</button>
            {/* <div>Total Amount: {calculateTotalAmount()}</div> */}
            <BootstrapTable
                keyField="id"
                data={data}
                columns={columns}
                cellEdit={cellEditFactory({ mode: "click", blurToSave: true })}
            />
        </div>
    );
};

export default PurchaseLine_table;
