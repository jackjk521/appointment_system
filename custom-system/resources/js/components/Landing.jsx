import React from "react";
import ReactDOM from "react-dom/client";   
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import Example from './Example'

function Main() {

    return (
    <BrowserRouter>
    <div className="container">
            <Routes> 
                <Route path="/sample" element = {<Example />}/> 
            </Routes>
            <a href="/sample">Home</a> // works
    </div>
    </BrowserRouter>
    );
}

export default Main;

// if (document.getElementById("main")) {
//     ReactDOM.createRoot(document.getElementById('main')).render(     
//         <Main />        
//     );
// }

