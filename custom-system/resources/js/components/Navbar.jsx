
import React from "react";
import ReactDOM from "react-dom/client";   
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'

const Navbar = ({setUser, onNavItemClick}) => {
    // Logout
    const signOut = () =>{
      setUser(null)
    }

    // $(document).ready(function() {
    //   console.log('jQuery is working!');
    // });

    $(document).ready(function() {
        // Tabs Switch active class
        $(document).on('click', '#patients-tab', function() {
          $("#inventory-tab").removeClass('tab-active')
          $("#appointments-tab").removeClass('tab-active')
          $("#purchases-tab").removeClass('tab-active')
          $("#patients-tab").addClass('tab-active')

          onNavItemClick('patients')
        });
        $(document).on('click', '#inventory-tab', function() {
          $("#patients-tab").removeClass('tab-active')
          $("#appointments-tab").removeClass('tab-active')
          $("#purchases-tab").removeClass('tab-active')
          $("#inventory-tab").addClass('tab-active')

          onNavItemClick('inventory')
        });
        $(document).on('click', '#appointments-tab', function() {
          $("#patients-tab").removeClass('tab-active')
          $("#inventory-tab").removeClass('tab-active')
          $("#purchases-tab").removeClass('tab-active')
          $("#appointments-tab").addClass('tab-active')

          onNavItemClick('appointments')
        });
        $(document).on('click', '#purchases-tab', function() {
          $("#patients-tab").removeClass('tab-active')
          $("#inventory-tab").removeClass('tab-active')
          $("#appointments-tab").removeClass('tab-active')
          $("#purchases-tab").addClass('tab-active')

          onNavItemClick('purchases')
        });
  
    });
    
    return (
        <nav class="navbar navbar-expand-lg bg-white p-0">
        <div class="container-fluid">
            <a class="navbar-brand px-5" href="#"> CUSTOM NAME</a>
          <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
            
            <ul class="navbar-nav ms-auto">
                
                <li class="nav-item hover-item p-2 pt-3 tab-active" id="patients-tab">
                    <i class="d-flex justify-content-center fa fa-users"></i>
                    <a class="nav-link" aria-current="page" href="#">Patients</a>
                </li>
                <li class="nav-item hover-item p-2 px-4 pt-3" id="purchases-tab">
                    <i class="d-flex justify-content-center fa fa-money"></i>
                    <a class="nav-link" aria-current="page" href="#">Purchases</a>
                </li>
                <li class="nav-item hover-item p-2 px-4 pt-3" id="inventory-tab">
                    <i class="d-flex justify-content-center fa fa-tasks"></i>
                    <a class="nav-link" aria-current="page" href="#">Inventory</a>
                </li>
                <li class="nav-item hover-item p-2 pt-3" id="appointments-tab">
                    <i class="d-flex justify-content-center fa fa-calendar"></i>
                    <a class="nav-link" aria-current="page" href="#">Appointments</a>
                </li>
                <li class="nav-item hover-item p-2 pt-3" onClick={signOut}>
                    <i class="d-flex justify-content-center fa fa-sign-out"></i>
                    <a class="nav-link" aria-current="page" >Sign Out</a>
                </li>

            </ul>
          </div>
         </div> {/* container-fluid end */}
      </nav>
        
    );
}

export default Navbar;

