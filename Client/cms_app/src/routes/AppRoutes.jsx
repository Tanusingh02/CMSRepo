import React from 'react';
import {Routes, Route} from 'react-router-dom';
import LoginPage from '../features/auth/pages/LoginPage';
import Dashboard from '../pages/Dashboard';





const AppRoutes = () =>{
    return(
        <Routes>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/' element={<Dashboard/>}></Route>
        </Routes>
     
    )
}
export default AppRoutes;