import React from 'react';
import {Routes, Route} from 'react-router-dom';
import LoginPage from '../features/auth/pages/LoginPage';
import Dashboard from '../pages/Dashboard';
import UserPage from '../pages/userAccounts';




const AppRoutes = () =>{
    return(
        <Routes>
            <Route path='/login' element={<LoginPage></LoginPage>}/>
            <Route path='/' element={<Dashboard/>}></Route>
            <Route path='/useraccount' element={<UserPage></UserPage>}></Route>
        </Routes>
     
    )
}
export default AppRoutes;