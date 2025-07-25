import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainLayout from '../layouts/Mainlayout';
function AddUser({ onUserAdded ,users})
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
   const [modalMessage, setModalMessage] = useState("");
   const [showModal, setShowModal] = useState(false);
   /*const handleSubmit=(e)=>{
    e.preventDefault();
    if(parseInt(age)<22)
        setAgeError('Age cannot be less than 22');
      return;
    }*/
    const navigate = useNavigate();
    //handle user is added-4:30.
 const handleSubmit = (e) => {
  e.preventDefault();
  setShowValidation(true); // Enable validation UI

  // Frontend age and email validations
  if (parseInt(age) < 22) {
    setAgeError("Age cannot be less than 22");
    return;
  }

  if (!email) {
    setEmailError("Email is required");
    return;
  } else if (!validateEmail(email)) {
    setEmailError("Invalid email format");
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
      alert(res.data.message); // "User created successfully"
      navigate('/useraccount'); // Redirect after success

      // Clear form fields
      setFullname("");
      setEmail("");
      setPassword("");
      setRole("");
      setDoj("");
      setLocation("");
      setAge("");
      setCourse("");
      setAgeError("");
      setEmailError("");
      setShowValidation(false);
    })
    .catch((error) => {
      // Check for duplicate email response
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.message === "User already exists"
      ) {
         setModalMessage("User has already been created using the same email.");
         setShowModal(true);

      } else if (
        error.response &&
        error.response.status === 400
      ) {
         setModalMessage(error.response.data.message);
         setShowModal(true);

      } else {
        setModalMessage("Something went wrong while adding the user.");
        setShowModal(true);

      }

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
    <MainLayout>
    <div className="container my-4">
        <div className="row justify-content-center" >
        <div className="col-12 col-md-10 col-lg-8 bg-white p-4 rounded">
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
            {showModal && (
              
  <div className="modal d-block" tabIndex="-1" role="dialog">
    <div className="modal-dialog modal-sm modal-dialog-centered" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Validation Error</h5>
          <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
        </div>
        <div className="modal-body">
          <p>{modalMessage}</p>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
)}
        </div>
    </div>
    </div>
     </MainLayout>
   )
  
}
export default AddUser;