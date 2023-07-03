import {React, useState} from "react";
import ReactDOM from "react-dom/client";   
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import Login from './Login'
import Dashboard from './Dashboard'


function Landing() {

    const [user, setUser] = useState(true)

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

            </Routes>
        </BrowserRouter>
    );
}

export default Landing;

