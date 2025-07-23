import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginFormStructure from './LoginFormStructure';
 
function LoginForm() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //const [errorMsg, setErrorMsg] = useState('');
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        // eslint-disable-next-line no-unused-vars
        const data={
            email:email,
            password:password
        };
       // setErrorMsg('');
 
        try {
            // eslint-disable-next-line no-unused-vars
            const response = await fetch("http://localhost:8080/user/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(response=>{console.log("response",response)
            if (response.ok) {
                return response.json();
            } else {
                alert('Login Failed');
            }
        }).then((result) => {
            if (result.message === "Invalid password") {
                alert("Invalid password");
                return;
            }
            localStorage.setItem("token",result.token);
            console.log("Login successful", result);
            alert("User Login Successfully")
 
            navigate('/');
        }).catch((error) => {
            console.log("error", error);
            alert("Login failed. Please try again.");
        });
    }finally{
        console.log("");
    }
    };
           
 
    return (
        <>
            <LoginFormStructure
                email={email}
                password={password}
                setEmail={setEmail}
                setPassword={setPassword}
                handleSubmit={handleSubmit}
            />
            {/* {errorMsg && <p style={{ color: 'red', textAlign: 'center' }}>{errorMsg}</p>} */}
        </>
    );
}
 
export default LoginForm;
