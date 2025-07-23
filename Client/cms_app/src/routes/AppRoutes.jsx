import React from 'react';
import {Routes, Route, Router} from 'react-router-dom';
import LoginPage from '../features/auth/pages/LoginPage';
import Dashboard from '../pages/Dashboard';
import UserPage from '../pages/userAccounts';
import CategoryForm from '../components/Category/CategoryForm';
import DeleteCategory from '../components/Category/DeleteCategory';
import EditCategory from '../components/Category/Editategory';
import ShowCategories from '../components/Category/ShowCategory';
import MainLayout from '../layouts/Mainlayout';




const AppRoutes = () =>{
    return(
        <Routes>
            <Route path='/login' element={<LoginPage></LoginPage>}/>
            
            <Route path='/' element={<Dashboard/>}></Route>
            <Route path='/useraccount' element={<UserPage></UserPage>}></Route>

            <Route path="/categories" element={<MainLayout><ShowCategories></ShowCategories></MainLayout>}/>
            {/* <Route path='/categories/add' element={<CategoryForm></CategoryForm>}/>
             */}
            <Route path="/categories/new" element={<MainLayout><CategoryForm /></MainLayout>} />

            <Route path='/categories/edit/:id' element={<MainLayout><EditCategory/></MainLayout>}/>
            <Route path='/categories/delete/:id' element={<DeleteCategory></DeleteCategory>}/>

        </Routes>
     
    )
}
export default AppRoutes;

