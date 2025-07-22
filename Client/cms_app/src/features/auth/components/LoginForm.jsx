import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginFormStructure from './LoginFormStructure';
function LoginForm({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // eslint-disable-next-line no-unused-vars
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin({ email, password });
    };

    return (
        <LoginFormStructure
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            handleSubmit={handleSubmit}
        />
    );
}

export default LoginForm;
