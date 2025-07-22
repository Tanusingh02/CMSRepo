import React from 'react';
import {Routes, Route} from 'react-router-dom';
import LoginPage from '../features/auth/pages/LoginPage';
import Dashboard from '../pages/Dashboard';
import MainLayout from '../layouts/Mainlayout';
import UserPage from '../pages/userAccounts';





const AppRoutes = () =>{
    return(
        <Routes>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/' element={<Dashboard/>}></Route>
            <Route path='/login' element={<LoginPage></LoginPage>}/>
            <Route path='/' element={<MainLayout><Dashboard/></MainLayout>}></Route>
            <Route path='/useraccount' element={<UserPage></UserPage>}></Route>
        </Routes>
     
    )
}
export default AppRoutes;