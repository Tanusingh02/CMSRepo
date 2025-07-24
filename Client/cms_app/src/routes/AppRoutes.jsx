import React from 'react';
import {Routes, Route, Router} from 'react-router-dom';
import LoginPage from '../features/auth/pages/LoginPage';
import Dashboard from '../pages/Dashboard';
import UserPage from '../pages/userAccounts';
import CategoryForm from '../components/Category/CategoryForm';
import DeleteCategory from '../components/Category/DeleteCategory';
import EditCategory from '../components/Category/Editategory';
import ShowCategories from '../components/Category/ShowCategory';
import CategoryDetails from "../components/Category/CategoryDetails";
import MainLayout from '../layouts/Mainlayout';

import Pages from '../components/Pages.component/ShowPages'
import PageForm from '../components/Pages.component/PageForm'
import EditPage from '../components/Pages.component/EditPage'
import DeletePage from '../components/Pages.component/DeletePage'
import Userpage from '../pages/userAccounts'






const AppRoutes = () =>{
    return(
        <Routes>
            <Route path='/login' element={<LoginPage></LoginPage>}/>
            
            <Route path='/' element={<Dashboard/>}></Route>
            <Route path='/useraccount' element={<UserPage></UserPage>}></Route>

            <Route path="/categories" element={<MainLayout><ShowCategories></ShowCategories></MainLayout>}/>
            <Route path="/categories/details/:id" element={<MainLayout><CategoryDetails /></MainLayout>} />
            <Route path="/categories/new" element={<MainLayout><CategoryForm /></MainLayout>} />
            <Route path='/categories/edit/:id' element={<MainLayout><EditCategory/></MainLayout>}/>
            <Route path='/categories/delete/:id' element={<DeleteCategory></DeleteCategory>}/>

            <Route path='/login' element={<LoginPage />} />
            <Route path='/' element={<Dashboard />} />
            <Route path='/pages' element={<Pages/>} />
            <Route path='/pages/add' element={<PageForm/>} />
            <Route path='/pages/edit/:id' element={<EditPage/>} />
            <Route path='/pages/delete/:id' element={<DeletePage/>}></Route>
            <Route path='/useraccount' element={<Userpage/>}></Route>
        </Routes>
     
    )
}
export default AppRoutes;

