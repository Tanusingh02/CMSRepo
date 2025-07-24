import React from 'react';
import {Routes, Route} from 'react-router-dom';
import LoginPage from '../features/auth/pages/LoginPage';
import Dashboard from '../pages/Dashboard';
import MainLayout from '../layouts/Mainlayout';
import UserPage from '../pages/userAccounts';
import AddUser from '../components/Login-Signup/Adduser';
import ProfilePage from '../pages/ProfilePage';
import PrivateRoute from './PrivateRoute';
import AdminUserProfile from '../pages/AdminUserProfile';

const AppRoutes = () =>{
    return(
        <Routes>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/' element={<PrivateRoute><Dashboard/></PrivateRoute>}></Route>
            <Route path='/useraccount' element={<UserPage></UserPage>}></Route>
            <Route path='/user/add' element={<MainLayout><AddUser/></MainLayout>}/>
            <Route path='/profile' element={ <PrivateRoute> <MainLayout><ProfilePage /></MainLayout> </PrivateRoute>}/>
            <Route path="/useraccount/:id" element={<MainLayout><AdminUserProfile /></MainLayout>} />
        </Routes>
    )
}
export default AppRoutes;