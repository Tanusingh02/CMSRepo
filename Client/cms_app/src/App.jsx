import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import AddUser from './components/Login-Signup/Adduser.jsx'
import LoginForm from './features/auth/components/LoginForm.jsx';
import AddPageForm from './pages/AddPageForm.jsx';
import ShowPages from './pages/ShowPages.jsx';

const App=()=>{
  return(
    // <BrowserRouter>
    // <LoginForm/>
    // {/* <AddUser></AddUser> */}
    // </BrowserRouter>
    // <AddPageForm></AddPageForm>
    <ShowPages></ShowPages>
  )
}
export default App;