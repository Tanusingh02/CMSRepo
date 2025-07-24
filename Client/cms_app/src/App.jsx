import React from 'react';
import AppRoutes from './routes/AppRoutes';
import LoginForm from './features/auth/components/LoginForm.jsx';




const App=()=>{
  return(
<div>

  <AppRoutes >
  <LoginForm/>
  </AppRoutes>
  
    </div>
    
  )
}
export default App;