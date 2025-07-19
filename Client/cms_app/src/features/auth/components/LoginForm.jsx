import React,{useState} from 'react';

function LoginForm({ onLogin }){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(typeof onLogin === 'function'){
            onLogin({email,password});
        }else{
            console.error('onLogin prop is not a function');
        }
    };

    return(
        <form onSubmit={handleSubmit}>
            <input type='email' placeholder='Email'onChange={(e)=> setEmail(e.target.value)} required/>
            <input type='password' placeholder='Password' onChange={(e)=> setPassword(e.target.value)} required/>
            <button type='submit' >Login</button>
        </form>
    );
}

export default LoginForm;