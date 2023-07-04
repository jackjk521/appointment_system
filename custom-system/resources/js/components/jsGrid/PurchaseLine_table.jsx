import React, { useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";
import Select from "react-select";

const CustomSelectEditor = ({ value, onChange, options }) => {
    const handleChange = (selectedOption) => {
        onChange(selectedOption.value);
    };

    return (
        <Select
            value={options.find((option) => option.value === value)}
            onChange={handleChange}
            options={options}
        />
    );
};


const PurchaseLine_table = () => {
    const [data, setData] = useState([]);

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
            name: "New Name",
            age: 0,
            address: "New Address",
            country: "New Country",
            married: false,
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
      
            // Get item by id
            
            // Autofill other columns based on the selected value
            if (dataField === 'age') {
              if (newValue === 18) {
                updatedRow = {
                  ...updatedRow,
                  name: 'John Doe',
                  address: '123 Main St',
                  country: 'USA',
                  married: false
                };
              } else if (newValue === 25) {
                updatedRow = {
                  ...updatedRow,
                  name: 'Jane Smith',
                  address: '456 Elm St',
                  country: 'Canada',
                  married: true
                };
              } else if (newValue === 30) {
                updatedRow = {
                  ...updatedRow,
                  name: 'Michael Johnson',
                  address: '789 Oak St',
                  country: 'Australia',
                  married: true
                };
              }
            }
      
            return updatedRow;
          }
          return row;
        });
      
        setData(updatedData);
      };

    const columns = [
        { dataField: "id", text: "ID", hidden:true }, //works
        { dataField: "name", text: "Name" },
        {
            dataField: "age",
            text: "Age",
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
                    options={[
                        { value: 18, label: "18" },
                        { value: 25, label: "25" },
                        { value: 30, label: "30" },
                    ]}
                />
            ),
        },
        { dataField: "address", text: "Address" },
        { dataField: "country", text: "Country" },
        { dataField: "married", text: "Is Married" },
    ];

    // const handleCellEdit = (newValue, rowId, dataField) => {
    //     // Update the data with the new value
    //     const updatedData = data.map((row) => {
    //         if (row.id === rowId) {
    //             return { ...row, [dataField]: newValue };
    //         }
    //         return row;
    //     });

    //     setData(updatedData);
    // };

    return (
        <div>
            <button onClick={handleInsertRow}>Insert Row</button>
            <button onClick={handleRetrieveData}>Retrieve Data</button>
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
