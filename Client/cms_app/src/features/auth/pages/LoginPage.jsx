import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import login from "../authAPI";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
  
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
 
  const handleLogin = async (credentials) => {
    try {
      const {token,fullname} = await login(credentials);
      localStorage.setItem("token", token);
      localStorage.setItem("fullname", fullname);
      setMsg("Login successful!");
      navigate("/");
    } catch (error) {
      setMsg("Login failed" + (error.response?.data?.message || error.message));
    }
  };

  return(
  <div>
    
    <LoginForm onLogin={handleLogin} />
    <p>{msg}</p>
  </div>
  );
};
 
export default LoginPage;
