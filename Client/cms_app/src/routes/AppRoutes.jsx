import React from 'react';
import {Routes, Route} from 'react-router-dom';
import LoginPage from '../features/auth/pages/LoginPage';
import Dashboard from '../pages/Dashboard';
import MainLayout from '../layouts/Mainlayout';




const AppRoutes = () =>{
    return(
        <Routes>
            <Route path='/login' element={<LoginPage></LoginPage>}/>
            <Route path='/' element={<MainLayout><Dashboard/></MainLayout>}></Route>
        </Routes>
     
    )
}
export default AppRoutes;