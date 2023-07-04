import React from "react";
import ReactDOM from "react-dom/client";
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    useNavigate,
} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Login = ({ setUser }) => {
    const nav = useNavigate();

    // Login and Sign Up Functions
    const signup = async (e) => {
        e.preventDefault();

        try {
            let userData = {
                username: $("#inputUsername").val(),
                password: $("#inputPassword").val(),
                role: "Administrator",
                user_status: "ACTIVE",
            };

            const response = await axios.post("/api/signUp", {
                userData,
            });

            // console.log(response.data)
            if (response.data.success) {
                setUser(userData);
                nav("/dashboard");
            }

            console.log(response.data); // Log the response data (optional)
        } catch (error) {
            console.error(error);
        }
    };
    const login = async (e) => {
        e.preventDefault();

        try {
            let userData = {
                username: $("#inputUsername").val(),
                password: $("#inputPassword").val(),
            };

            const response = await axios.post("/api/login", {
                userData,
            });

            userData.user_id = response.data.user_id;

            if (response.data.success) {
                setUser(userData);
                nav("/dashboard");
            } else {
                new Swal({
                    title: "Error",
                    text: "Invalid User Credentials",
                    icon: "error",
                    timer: 1500, // Set the timer duration in milliseconds
                    buttons: false, // Hide the close button
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container pt-5">
            <div className="row justify-content-center pt-5">
                <div className="col-md-6 pt-5 bg-white">
                    {/* Add Logo Image here  */}
                    <img src="" alt=""></img>

                    <h1 className="text-center">LOGIN</h1>

                    {/* LOGIN START  */}
                    <form className="row g-3 p-5">
                        <div className="col-md-6">
                            <label
                                htmlFor="inputUsername"
                                className="form-label"
                            >
                                Username
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="inputUsername"
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label
                                htmlFor="inputPassword"
                                className="form-label"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="inputPassword"
                                required
                            />
                        </div>

                        <div className="col-12 d-flex justify-content-center">
                            <button
                                type="submit"
                                onClick={login}
                                className="btn btn-primary"
                            >
                                Log In
                            </button>
                        </div>
                    </form>
                    {/* LOGIN END */}
                </div>
            </div>
        </div>
    );
};

export default Login;
