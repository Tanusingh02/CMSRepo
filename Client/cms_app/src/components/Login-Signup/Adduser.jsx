import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
function AddUser({ onUserAdded })
{
   const[fullname,setFullname]=useState('');
   const[email,setEmail]=useState('');
   const[password,setPassword]=useState('');
   const[role,setRole]=useState('');
   const[doj,setDoj]=useState();
   const[location,setLocation]=useState('');
   const[age,setAge]=useState();
   const[course,setCourse]=useState('');
   const [ageError, setAgeError] = useState('');
   const [emailError, setEmailError] = useState('');
   const [showValidation, setShowValidation] = useState(false);

   /*const handleSubmit=(e)=>{
    e.preventDefault();
    if(parseInt(age)<22)
        setAgeError('Age cannot be less than 22');
      return;
    }*/
    const navigate = useNavigate();
    const handleSubmit = (e) => {
  e.preventDefault();

  if (parseInt(age) < 22) {
    setAgeError("Age cannot be less than 22");
    return;
  }
  if (!email) {
  setEmailError('Email is required');
  setShowValidation(true); // optional: if you track validation globally
  return;
} else if (!validateEmail(email)) {
  setEmailError('Invalid email format');
  setShowValidation(true);
  return;
}


  const data = {
    fullname,
    email,
    password,
    role,
    doj,
    location,
    age,
    course,
  };

  axios.post("http://localhost:8080/user/signup", data)
    .then((res) => {
      console.log("User added:", res.data.message);

      // Redirect to user page
      navigate('/useraccount');

      // Optionally clear the form
      setFullname("");
      setEmail("");
      setPassword("");
      setRole("");
      setDoj("");
      setLocation("");
      setAge("");
      setCourse("");
      setAgeError("");
    })
    .catch((error) => {
      console.error("Error adding user:", error);
    });
}; 
const validateEmail = (email) => {
  // Basic pattern: user@domain.extension
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
   /* const data={
     fullname:fullname,
     email:email,
     password:password,
     role:role,
     doj:doj,
     location:location,
     age:age,
     course:course
    }*/
   const handleAgeChange = (e) => {
  const value = e.target.value;
  setAge(value);

  if (!value) {
    setAgeError("Age is required");
  } else if (parseInt(value) < 22) {
    setAgeError("Age cannot be less than 22");
  } else {
    setAgeError("");
  }
};

   return(
    <div className="container my-4">
        <div className="row justify-content-center" >
        <div className="col-12 col-md-10 col-lg-8 bg-white p-4 rounded shadow">
             <h3 className='text-center mb-4 ' style={{color:" #1f87c2"}}>Add-User</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                <label>Full Name <span className="text-danger">*</span></label>
 <input
  type="text"
  value={fullname}
  onChange={(e) => setFullname(e.target.value)}
  className={`form-control ${showValidation && !fullname ? 'is-invalid' : ''}`}
/>
{showValidation && !fullname && <div className="invalid-feedback">Full name is required.</div>}
                </div>
            <div className="mb-3">
  <label>Email <span className="text-danger">*</span></label>
  <input
    type="email"
    value={email}
    onChange={(e) => {
      const value = e.target.value;
      setEmail(value);

      if (!value) {
        setEmailError("Email is required");
      } else if (!validateEmail(value)) {
        setEmailError("Invalid email format");
      } else {
        setEmailError("");
      }
    }}
    className={`form-control ${emailError ? 'is-invalid' : ''}`}
  />
  {emailError && <div className="invalid-feedback">{emailError}</div>}
</div>
            <div className="mb-3">
                <label >Password<span className="text-danger">*</span></label>
               <input
  type="text"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  className={`form-control ${showValidation && !password ? 'is-invalid' : ''}`}
/>
{showValidation && !password && <div className="invalid-feedback">Password is required.</div>}

                </div> 
            <div className="mb-3">
                <label >Role <span className="text-danger">*</span></label>
<div className="mb-3">
  <input
    type="text"
    value={role}
    onChange={(e) => setRole(e.target.value)}
    className={`form-control ${showValidation && !role ? 'is-invalid' : ''}`}
  />
  {showValidation && !role && <div className="invalid-feedback">Role is required.</div>}
</div>                </div> 
            <div className="mb-3">
                <label>DOJ <span className="text-danger">*</span></label>
                <div className="mb-3">
  <input
    type="date"
    value={doj}
    onChange={(e) => setDoj(e.target.value)}
    min="2025-05-29"
    className={`form-control ${showValidation && !doj ? 'is-invalid' : ''}`}
  />
  {showValidation && !doj && <div className="invalid-feedback">Date of joining is required.</div>}
</div>
                </div>  
            <div className="mb-3">
                <label>Location <span className="text-danger">*</span></label>
                <div className="mb-3">
  <input
    type="text"
    value={location}
    onChange={(e) => setLocation(e.target.value)}
    className={`form-control ${showValidation && !location ? 'is-invalid' : ''}`}
  />
  {showValidation && !location && <div className="invalid-feedback">Location is required.</div>}
</div>
                </div>  
            <div className="mb-3">
  <label>Age <span className="text-danger">*</span></label>
  <input
    type="number"
    value={age}
    onChange={handleAgeChange}
    className={`form-control ${
      (showValidation && !age) || ageError ? 'is-invalid' : ''
    }`}
  />
  {(showValidation && !age) && (
    <div className="invalid-feedback">Age is required.</div>
  )}
  {ageError && (
    <div className="invalid-feedback">{ageError}</div>
  )}
</div> 
            <div className="mb-3">
                <label>Course <span className="text-danger">*</span></label>
                <div className="mb-3">
  
  <input
    type="text"
    value={course}
    onChange={(e) => setCourse(e.target.value)}
    className={`form-control ${showValidation && !course ? 'is-invalid' : ''}`}
  />
  {showValidation && !course && <div className="invalid-feedback">Course is required.</div>}
</div>
                </div> 
            <div className="text-center">
                <button type="submit" className='btn btn-primary mt-2'>Add User</button>
                </div>     
            </form>
        </div>
    </div>
    </div>
   )
}
export default AddUser;