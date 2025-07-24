import React from 'react';
import {Routes, Route, Router} from 'react-router-dom';
import LoginPage from '../features/auth/pages/LoginPage';
import Dashboard from '../pages/Dashboard';
import CategoryForm from '../components/Category/CategoryForm';
import DeleteCategory from '../components/Category/DeleteCategory';
import EditCategory from '../components/Category/Editategory';
import ShowCategories from '../components/Category/ShowCategory';
import CategoryDetails from "../components/Category/CategoryDetails";
import MainLayout from '../layouts/Mainlayout';
import AddUser from '../components/Login-Signup/Adduser';
import ProfilePage from '../pages/ProfilePage';
import PrivateRoute from './PrivateRoute';
import AdminUserProfile from '../pages/AdminUserProfile';
import Pages from '../components/Pages.component/ShowPages'
import PageForm from '../components/Pages.component/PageForm'
import EditPage from '../components/Pages.component/EditPage'
import DeletePage from '../components/Pages.component/DeletePage'
import Userpage from '../pages/userAccounts'
import Details from "../components/Pages.component/PageDetails"






const AppRoutes = () =>{
    return(
        <Routes>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/' element={<PrivateRoute><Dashboard/></PrivateRoute>}></Route>
            <Route path='/' element={<Dashboard/>}></Route>
            <Route path='/useraccount' element={<Userpage></Userpage>}></Route>
            <Route path='/user/add' element={<MainLayout><AddUser/></MainLayout>}/>
            <Route path='/profile' element={ <PrivateRoute> <MainLayout><ProfilePage /></MainLayout> </PrivateRoute>}/>
            <Route path="/useraccount/:id" element={<MainLayout><AdminUserProfile /></MainLayout>} />
            <Route path="/categories" element={<MainLayout><ShowCategories></ShowCategories></MainLayout>}/>
            <Route path="/categories/details/:id" element={<MainLayout><CategoryDetails /></MainLayout>} />
            <Route path="/categories/new" element={<MainLayout><CategoryForm /></MainLayout>} />
            <Route path='/categories/edit/:id' element={<MainLayout><EditCategory/></MainLayout>}/>
            <Route path='/categories/delete/:id' element={<DeleteCategory></DeleteCategory>}/>
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

