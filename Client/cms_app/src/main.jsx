import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AddUser from './components/Login-Signup/Adduser.jsx'


createRoot(document.getElementById('root')).render(
  <AddUser></AddUser>
)
