import React, {useState} from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from "./Navbar";
import Patients from "./Patients"
import Inventory from "./Inventory"
import Purchases from "./Purchases"
import Appointments from "./Appointments"


const Dashboard = ({ user, setUser}) => {
    
    // NAV TAB SELECTION START
    const [selectedNavItem, setSelectedNavItem] = useState('patients');

    const handleNavItemClick = (navItem) => {
        setSelectedNavItem(navItem);
    };
    // NAV TAB SELECTION END

    return (
        <>
            <Navbar setUser={setUser} onNavItemClick={handleNavItemClick}/>
            <div className="container">
                 
                 {selectedNavItem == 'patients' && <Patients user={user}/>}
                 {selectedNavItem == 'inventory' && <Inventory user={user}/>}
                 {selectedNavItem == 'appointments' && <Appointments user={user}/>}
                 {selectedNavItem == 'purchases' && <Purchases user={user}/>}

            </div>
        </>
    );
};

export default Dashboard;
