import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

const Navbar = ({ setUser, onNavItemClick }) => {
    // Logout
    const signOut = () => {
        setUser(null);
    };

    // $(document).ready(function() {
    //   console.log('jQuery is working!');
    // });

    $(document).ready(function () {
        // Tabs Switch active class
        $(document).on("click", "#patients-tab", function () {
            $("#inventory-tab").removeClass("tab-active");
            $("#appointments-tab").removeClass("tab-active");
            $("#purchases-tab").removeClass("tab-active");
            $("#patients-tab").addClass("tab-active");

            onNavItemClick("patients");
        });
        $(document).on("click", "#inventory-tab", function () {
            $("#patients-tab").removeClass("tab-active");
            $("#appointments-tab").removeClass("tab-active");
            $("#purchases-tab").removeClass("tab-active");
            $("#inventory-tab").addClass("tab-active");

            onNavItemClick("inventory");
        });
        $(document).on("click", "#appointments-tab", function () {
            $("#patients-tab").removeClass("tab-active");
            $("#inventory-tab").removeClass("tab-active");
            $("#purchases-tab").removeClass("tab-active");
            $("#appointments-tab").addClass("tab-active");

            onNavItemClick("appointments");
        });
        $(document).on("click", "#purchases-tab", function () {
            $("#patients-tab").removeClass("tab-active");
            $("#inventory-tab").removeClass("tab-active");
            $("#appointments-tab").removeClass("tab-active");
            $("#purchases-tab").addClass("tab-active");

            onNavItemClick("purchases");
        });
    });

    return (
        <nav className="navbar navbar-expand-lg bg-white p-0">
            <div className="container-fluid">
                <a className="navbar-brand px-5" href="#">
                    {" "}
                    CUSTOM NAME
                </a>
                <div
                    className="collapse navbar-collapse"
                    id="navbarTogglerDemo03"
                >
                    <ul className="navbar-nav ms-auto">
                        <li
                            className="nav-item hover-item p-2 pt-3 tab-active"
                            id="patients-tab"
                        >
                            <i className="d-flex justify-content-center fa fa-users"></i>
                            <a
                                className="nav-link"
                                aria-current="page"
                                href="#"
                            >
                                Patients
                            </a>
                        </li>
                        <li
                            className="nav-item hover-item p-2 px-4 pt-3"
                            id="purchases-tab"
                        >
                            <i className="d-flex justify-content-center fa fa-money"></i>
                            <a
                                className="nav-link"
                                aria-current="page"
                                href="#"
                            >
                                Purchases
                            </a>
                        </li>
                        <li
                            className="nav-item hover-item p-2 px-4 pt-3"
                            id="inventory-tab"
                        >
                            <i className="d-flex justify-content-center fa fa-tasks"></i>
                            <a
                                className="nav-link"
                                aria-current="page"
                                href="#"
                            >
                                Inventory
                            </a>
                        </li>
                        <li
                            className="nav-item hover-item p-2 pt-3"
                            id="appointments-tab"
                        >
                            <i className="d-flex justify-content-center fa fa-calendar"></i>
                            <a
                                className="nav-link"
                                aria-current="page"
                                href="#"
                            >
                                Appointments
                            </a>
                        </li>
                        <li
                            className="nav-item hover-item p-2 pt-3"
                            onClick={signOut}
                        >
                            <i className="d-flex justify-content-center fa fa-sign-out"></i>
                            <a className="nav-link" aria-current="page">
                                Sign Out
                            </a>
                        </li>
                    </ul>
                </div>
            </div>{" "}
            {/* container-fluid end */}
        </nav>
    );
};

export default Navbar;
