import React,{useState} from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function LoginForm({ onLogin }){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();
    
    const handleLogout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        navigate('/login');
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        onLogin({email,password});
        

    }
    LoginForm.PropTypes ={
        onLogin:PropTypes.func.isRequired,
    }

    return(
        <form onSubmit={handleSubmit}>
            <input type='email' placeholder='Email'onChange={(e)=> setEmail(e.target.value)} required/>
            <input type='password' placeholder='Password' onChange={(e)=> setPassword(e.target.value)} required/>
            <button type='submit' >Login</button>
        </form>
    );
}

export default LoginForm;