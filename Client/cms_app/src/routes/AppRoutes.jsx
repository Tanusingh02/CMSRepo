import React from 'react';
import {Routes, Route, Router} from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import Dashboard from '../pages/Dashboard';
import CategoryForm from '../pages/Category/CategoryForm';
import DeleteCategory from '../pages/Category/DeleteCategory';
import EditCategory from '../pages/Category/EditCategory';
import ShowCategories from '../pages/Category/ShowCategory';
import CategoryDetails from "../pages/Category/CategoryDetails";
import MainLayout from '../layouts/Mainlayout';
import AddUser from '../components/Adduser';
import ProfilePage from '../pages/ProfilePage';
import PrivateRoute from './PrivateRoute';
import AdminUserProfile from '../pages/AdminUserProfile';
import Pages from '../pages/Pages/ShowPages'
import PageForm from '../pages/Pages/PageForm'
import EditPage from '../pages/Pages/EditPage'
import DeletePage from '../pages/Pages/DeletePage'
import Details from "../pages/Pages/PageDetails"
import Userpage from '../pages/userAccounts'
import EditUserPage from '../components/EditUserPage';


const AppRoutes = () =>{
    return(
        <Routes>
            <Route path='/' element={<LoginPage/>}/>
            <Route path='/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>}></Route>
            <Route path='/dashboard' element={<Dashboard/>}></Route>
            <Route path='/useraccount' element={<Userpage></Userpage>}></Route>
            <Route path='/useraccount/add' element={<AddUser/>}/>
            <Route path='/profile' element={ <PrivateRoute> <ProfilePage /> </PrivateRoute>}/>
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
            <Route path="/pages/page-details/:id" element={<Details />} />
            <Route path="/useraccount/edit/:userId" element={<EditUserPage />} />
        </Routes>
    )
}
export default AppRoutes;

