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
        <div className="d-flex justify-content-center align-items-center" 
        style={{
            backgroundColor: "#1f87c2",
            minHeight:'100vh',
            minWidth:'100vw'
            }}>
                <form onSubmit={handleSubmit} 
               style={{
                marginTop:'-300px',
                width:'350px'
             }}>
                <h2 className='text-center' style={{color:'white'}}>DCX CMS</h2>
                <input type="email" id="inputEmail" class="form-control" placeholder="Email address" onChange={(e)=>setEmail(e.target.value)} required autoFocus
                style={{
                    height:'52px',
                    marginBottom:'-1px',
                    borderBottomRightRadius:'0px',
                    borderBottomLeftRadius:'0px'
                    }}/>
                <input type='password' className='form-control' placeholder='Password' onChange={(e)=>setPassword(e.target.value)} required autoFocus
                    style={{
                    height:'52px',
                    marginBottom:'-1px',
                    borderTopRightRadius:'0px',
                    borderTopLeftRadius:'0px'
                    }}/>
                
                <div className='mb-3 form-check'
                style={{
                    marginTop:'10px',
                    color:'white',
                    borderRadius:'0px'
                        
                }}>
                    <input type='checkbox' className='form-check-input' id="rememberMe" style={{borderRadius:'0px',height:'13px', width:'13px',marginTop:"7px",boxShadow:'10px'}}/>
                        <label className='form-check-label' htmlFor='rememberMe'>Remember Me</label>
                </div>
                    <button type='submit' className='btn btn-primary w-100'
                    style={{
                        backgroundColor:('#2fa4e7'),
                        height:'60px'
                    }}
                    
                    >Sign in</button>

                </form>
            </div>
        
        
    );
}

export default LoginForm;