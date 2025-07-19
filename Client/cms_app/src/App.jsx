import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import AddUser from './components/Login-Signup/Adduser.jsx'
import LoginForm from './features/auth/components/LoginForm.jsx';

const App=()=>{
  return(
    <BrowserRouter>
    <LoginForm/>
    {/* <AddUser></AddUser> */}
    </BrowserRouter>
  )
}
export default App;