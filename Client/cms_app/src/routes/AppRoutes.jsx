import React from 'react';
import {Routes, Route} from 'react-router-dom';
import LoginPage from '../features/auth/pages/LoginPage';
import Dashboard from '../pages/Dashboard';
import Pages from '../components/Pages.component/ShowPages'
import PageForm from '../components/Pages.component/PageForm'
import EditPage from '../components/Pages.component/EditPage'
import DeletePage from '../components/Pages.component/DeletePage'
import Userpage from '../pages/userAccounts'
import Details from "../components/Pages.component/PageDetails"



const AppRoutes = () =>{
    return(
        <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/' element={<Dashboard />} />
            <Route path='/pages' element={<Pages/>} />
            <Route path='/pages/add' element={<PageForm/>} />
            <Route path='/pages/edit/:id' element={<EditPage/>} />
            <Route path='/pages/delete/:id' element={<DeletePage/>}></Route>
            <Route path='/useraccount' element={<Userpage/>}></Route>
            <Route path="/page-details/:id" element={<Details />} />
        </Routes>
     
    )
}
export default AppRoutes;