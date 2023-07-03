import React, {useState} from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from "./Navbar";
import Customers from "./Customers"
import Inventory from "./Inventory"
import Purchases from "./Purchases"
import Appointments from "./Appointments"




import AddModal from "../includes/customers/add"

const Dashboard = ({ user, setUser}) => {
    
    // Modals
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
      setShowModal(true);
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
    };

    // NAV TAB SELECTION START
    const [selectedNavItem, setSelectedNavItem] = useState('customers');

    const handleNavItemClick = (navItem) => {
        setSelectedNavItem(navItem);
    };
    // NAV TAB SELECTION END

    return (
        <>
            <Navbar setUser={setUser} onNavItemClick={handleNavItemClick}/>
            <div className="container">
                {/* <button onClick={handleOpenModal}>Open Modal</button>
                    <AddModal user={user} isOpen={showModal} onClose={handleCloseModal} /> */}
                 
                 {selectedNavItem == 'customers' && <Customers user={user}/>}
                 {selectedNavItem == 'inventory' && <Inventory user={user}/>}
                 {selectedNavItem == 'appointments' && <Appointments user={user}/>}
                 {selectedNavItem == 'purchases' && <Purchases user={user}/>}


            </div>
        </>
    );
};

export default Dashboard;
