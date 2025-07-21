import React from 'react';
import PropTypes from 'prop-types';
import './LoginForm.css';

// eslint-disable-next-line react-refresh/only-export-components, no-unused-vars
function LoginFormStructure({ email, password, setEmail, setPassword, handleSubmit, error }) 
 {
    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2 className="login-title">DCX CMS</h2>
                <input
                    type="email"
                    id="inputEmail"
                    className="form-control"
                    placeholder="Email address"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoFocus
                />
                <input
                    type="password"
                    value={password}
                    className="form-control"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoFocus
                />
                

                
                <button type="submit" className="btn btn-primary w-100">Sign in</button>
            </form>
        </div>
    );
}

LoginFormStructure.propTypes = {
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    setEmail: PropTypes.func.isRequired,
    setPassword: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
};

 export default LoginFormStructure;
