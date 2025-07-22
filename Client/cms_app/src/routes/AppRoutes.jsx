import React from 'react';
import {Routes, Route} from 'react-router-dom';
import LoginPage from '../features/auth/pages/LoginPage';
import Dashboard from '../pages/Dashboard';
import MainLayout from '../layouts/Mainlayout';
import Pages from '../components/ShowPages';
import PageForm from '../components/PageForm';
import EditPage from '../components/EditPage';
import DeletePage from '../components/DeletePage';




const AppRoutes = () =>{
    return(
        <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/' element={<MainLayout><Dashboard /></MainLayout>} />
            <Route path='/pages' element={<Pages/>} />
            <Route path='/pages/add' element={<PageForm/>} />
            <Route path='/pages/edit/:id' element={<EditPage/>} />
            <Route path='/pages/delete/:id' element={<DeletePage/>}></Route>
        </Routes>
     
    )
}
export default AppRoutes;