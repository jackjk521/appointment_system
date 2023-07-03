import React, {useEffect, useState}from "react";
import axios from "axios";
import Cleave from 'cleave.js';
import Swal from 'sweetalert2';

import BootstrapTable from "react-bootstrap-table-next";
import cellEditFactory from "react-bootstrap-table2-editor";
import { Button } from "react-bootstrap";

import AddModal from "../includes/patients/add"

const Inventory = ({ user }) => {
 
    // Table Data
    const [data, setData] = useState([]);

    // Modals
    const [addModal, setAddModal] = useState(false);

    // Numerical
    const [value, setValue] = useState('');

    let genProdNum = '';
    let btnAddItem = '';
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/api/items", {}); // works
                setData(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();

        // Generating Product Number in Add Modal
        genProdNum = async () => {
            try {
                await axios.get('/api/gen_prod_number')    
                     .then(response => {
                         $("#addItem #txtProductNumber").val(response.data)
                         $("#addItem #txtProductNumber").prop("disabled", true);
                     })
                     .catch(error => {
                         // Handle the error
                         console.error(error);
                     })
 
             } catch (error) {
                 console.error(error);
             } 
        }
        
        // Adding an Item 
        btnAddItem = async (itemData) => { 
           
        }



    }, []);



      const handleOpenAddModal = () => {
        setAddModal(true);
      };

      const handleCloseAddModal = () => {
        setAddModal(false);
      };
    
  

    // BOOTSTRAP TABLE INITIALIZATION
    const columns = [
        { dataField: "product_number", text: "Product No." },
        { dataField: "item_name", text: "Item Name" },
        { dataField: "unit", text: "Unit" },
        { dataField: "unit_price", text: "Unit Price" },
        { dataField: "total_quantity", text: "Total Quantity" },
        {
            dataField: "actions",
            text: "Actions",
            formatter: (cell, row) => (
              <div>
                <Button variant="info" size="md" onClick={() => handleView(row)}>
                    <i class="px-1 fa fa-info-circle"> View </i> 
                </Button>{" "}
                <Button variant="warning" size="md" onClick={() => handleEdit(row)}>
                    <i class="px-2 fa fa-edit">  Edit</i>
                </Button>{" "}
                <Button variant="danger" size="md" onClick={() => handleRemove(row)}>
                    <i class="px-2 fa fa-trash">  Remove</i>
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
        // Add your edit logic here
      };
    
      const handleRemove = (row) => {
        console.log("Remove", row);
        // Add your remove logic here
      };

      document.addEventListener('DOMContentLoaded', () => {
      
     });


      $(document).ready(function() {

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
        $('#addItemBtn').on('click', async function() {
            genProdNum()
            handleOpenAddModal()
        });

        $('#btnAddItem').on('click', async function() {
            
            let itemData = {
                product_number: $("#addItem #txtProductNumber").val(),
                item_name:  $("#addItem #txtItemName").val(),
                unit:  $("#addItem #txtUnit").val(),
                unit_price:  $("#addItem #txtUnitPrice").val(),
                total_quantity:  $("#addItem #txtTotalQty").val(),
                //To get the User ID for Logs
                user_id: user.user_id,
                username: user.username
            }

            try {
                    await axios.post('/api/add_item', { itemData })    
                    .then(response => {
                        console.log(response)
                        new Swal({
                            title: 'Success',
                            text: 'Successfully added a new item!',
                            icon: 'success',
                            timer: 1500, // Set the timer duration in milliseconds
                            buttons: false, // Hide the close button
                        });
                    })
                    .catch(error => {
                        // Handle the error
                        new Swal({
                            title: 'Error',
                            text: error,
                            icon: 'error',
                            timer: 1500, // Set the timer duration in milliseconds
                            buttons: false, // Hide the close button
                        });
                        console.error(error);
                    })
            } catch (error) {
                console.error(error);
            }

            handleCloseAddModal()
        });
        // ADD ITEM FUNCTIONS END
       
    });
      
 

    return (
        <>
            <div className="container">
                <div class="row">
                    <div class="col-3">
                        <h1>
                            <i class="fa fa-tasks fa-lg p-2 pt-3 m-2"></i>
                                Inventory
                        </h1>
                    </div>
                    <div class="col-6">
        
                    </div>
                    <div class="col-3 d-flex align-items-end justify-content-end ">
                        <button class="btn btn-success my-3" id="addItemBtn"> Add Item </button>
                    </div>
                </div>
            
                {/* MODALS  */}
                <AddModal user={user} isOpen={addModal} onClose={handleCloseAddModal} />


                <div class="container bg-white p-4">
                    <BootstrapTable
                        keyField="product_number"
                        data={data}
                        columns={columns}
                    />
                </div>
                
            </div>
        </>
    );
};

export default Inventory;
