import {React, useState} from "react";
import ReactDOM from "react-dom";   
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import Login from './Login'
import Dashboard from './Dashboard'
import Appointments from "./Appointments";

function Landing() {

    const [user, setUser] = useState({
        user_id: 3,
        username: 'admin',
        password: ''
    })

    return (
        <BrowserRouter>
            <Routes> 
                <Route path='/' element={
                    <Login setUser={setUser}/>
                    }>
                </Route>
    
                <Route path='/dashboard' element={
                    <PrivateRoute user={user}>
                        <Dashboard user={user} setUser={setUser}/>
                    </PrivateRoute>
                }>
                </Route>

                <Route path="/appointments" element={<Appointments />} />

            </Routes>
        </BrowserRouter>
    );
}

export default Landing;

