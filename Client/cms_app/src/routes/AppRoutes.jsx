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
import Pages from '../pages/Pages/ShowPages'
import PageForm from '../pages/Pages/PageForm'
import EditPage from '../pages/Pages/EditPage'
import DeletePage from '../pages/Pages/DeletePage'
import Details from "../pages/Pages/PageDetails"
import Userpage from '../pages/userAccounts'







const AppRoutes = () =>{
    return(
        <Routes>
            <Route path='/' element={<LoginPage/>}/>
            <Route path='/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>}></Route>
            <Route path='/dashboard' element={<Dashboard/>}></Route>
            <Route path='/useraccount' element={<Userpage></Userpage>}></Route>
            <Route path='/user/add' element={<AddUser/>}/>
            <Route path='/profile' element={ <PrivateRoute> <MainLayout><ProfilePage /></MainLayout> </PrivateRoute>}/>
            <Route path="/useraccount/:id" element={<AdminUserProfile />} />
            <Route path="/categories" element={<ShowCategories></ShowCategories>}/>
            <Route path="/categories/details/:id" element={<CategoryDetails />} />
            <Route path="/categories/new" element={<CategoryForm />} />
            <Route path='/categories/edit/:id' element={<EditCategory/>}/>
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

