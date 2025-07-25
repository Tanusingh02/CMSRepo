import React from 'react';
import AppRoutes from './routes/AppRoutes';
import LoginForm from './components/LoginForm';




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