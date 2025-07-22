import React from 'react';
import {Routes, Route} from 'react-router-dom';
import LoginPage from '../features/auth/pages/LoginPage';
import Dashboard from '../pages/Dashboard';
import MainLayout from '../layouts/Mainlayout';
import Pages from '../components/Pages.component/ShowPages';
import PageForm from '../components/Pages.component/PageForm';
import EditPage from '../components/Pages.component/EditPage';
import DeletePage from '../components/Pages.component/DeletePage';

import CategoryForm from '../components/Category/CategoryForm';
import ShowCategories from '../components/Category/ShowCategory';
import EditCategory from '../components/Category/Editategory';
import DeleteCategory from '../components/Category/DeleteCategory';




const AppRoutes = () =>{
    return(
        <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/' element={<MainLayout><Dashboard /></MainLayout>} />
            <Route path='/pages' element={<Pages/>} />
            <Route path='/pages/add' element={<PageForm/>} />
            <Route path='/pages/edit/:id' element={<EditPage/>} />
            <Route path='/pages/delete/:id' element={<DeletePage/>}></Route>
            
            <Route path='/categories' element={<ShowCategories></ShowCategories>}></Route>
             <Route path='/categories/add' element={<CategoryForm></CategoryForm>}/>  
            <Route path='/categories/edit/:id' element={<EditCategory></EditCategory>}/>
            <Route path='/categories/delete/:id' element={<DeleteCategory></DeleteCategory>}/>

        </Routes>
     
    )
}
export default AppRoutes;

