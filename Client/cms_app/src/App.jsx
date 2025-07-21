import React from 'react';
import AppRoutes from './routes/AppRoutes';
import LoginForm from './features/auth/components/LoginForm.jsx';
import MainLayout from './layouts/Mainlayout.jsx';
import Dashboard from './pages/Dashboard.jsx';

const App=()=>{
  const handleLogin = ({email,password})=>{
    
  }
  return(
<div>
  <AppRoutes >
  <LoginForm onLogin={handleLogin}/>
  </AppRoutes>

    </div>
  )
}
export default App;