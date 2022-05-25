
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";



import CreateEmployee from './employee/create.component';
import EditEmployee from './employee/editcomponent';
import ListEmployees from './employee/list.component';

function Employee() {


    return (
        <Routes>
            <Route path="/home" element={<ListEmployees />} />
            <Route path="/home/crear" element={<CreateEmployee />} />
            <Route path="/home/employee/:id" element={<EditEmployee />} />
        </Routes>
        
    );
}

export default Employee;

if (document.getElementById('employee')) {
    ReactDOM.render(
    <BrowserRouter>
        <Employee />
    </BrowserRouter>
        , document.getElementById('employee'));
}
