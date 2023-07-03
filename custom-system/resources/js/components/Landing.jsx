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
                <Route path='/login' element={
                    <Login setUser={setUser}/>
                    }>
                </Route>
    
                <Route path='/dashboard' element={
                    <PrivateRoute user={user}>
                        <Dashboard user={user} setUser={setUser}/>
                    </PrivateRoute>
                }>
                </Route>

                <Route path='/customers' element={
                    <PrivateRoute user={user}>
                        <Dashboard user={user}/>
                    </PrivateRoute>
                }>
                </Route>

                {/* <Route exact path='/' element={<PrivateRoute path="/dashboard" component={Dashboard}/>}>
                </Route> */}
                {/* <PrivateRoute path="/dashboard" element={<Dashboard />} /> */}
            </Routes>
        </BrowserRouter>
    );
}

export default Landing;

