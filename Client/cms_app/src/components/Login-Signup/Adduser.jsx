import { useState } from 'react';
import axios from 'axios';
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


   /*const handleSubmit=(e)=>{
    e.preventDefault();
    if(parseInt(age)<22)
        setAgeError('Age cannot be less than 22');
      return;
    }*/
   const handleSubmit = (e) => {
  e.preventDefault();

  if (parseInt(age) < 22) {
    setAgeError("Age cannot be less than 22");
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

      // Notify parent to refresh user list
      if (onUserAdded) onUserAdded();

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
    if (parseInt(value) < 22) {
        setAgeError('Age cannot be less than 22');
    } else {
        setAgeError('');
    }
};

return (
    <div>
        <div className="d-flex justify-content-center align-items-start vh-100 bg-light" style={{ width: "450px" }}>
            <div className="p-4 rounded shadow bg-white" style={{ width: "100%", maxWidth: "900px" }}>
                <h3 className='text-center mb-4 ' style={{ color: " #1f87c2" }}>Add-User</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label>Full Name</label>
                        <input type="text" value={fullname} onChange={(e) => setFullname(e.target.value)} className="form-control" ></input>
                    </div>
                    <div className="mb-3">
                        <label >Email</label>
                        <input type="email" value={email} className="form-control" onChange={handleEmailChange}></input>
                        {emailError && (
                            <div className='text-danger' style={{ fontSize: '0.9em' }}>
                                {emailError}
                            </div>
                        )}
                    </div>

                    <div className="mb-3">
                        <label >Password</label>
                        <input type="password" value={password} className="form-control" onChange={handlePasswordChange}></input>
                        {passwordError && (
                            <div className='text-danger' style={{ fontSize: '0.9em' }}>
                                {passwordError}
                            </div>
                        )}
                    </div>
                    <div className="mb-3">
                        <label >Role</label>
                        <input type="text" value={role} onChange={(e) => setRole(e.target.value)} className="form-control" ></input>
                    </div>
                    <div className="mb-3">
                        <label>DOJ</label>
                        <input type="date" value={doj} onChange={(e) => setDoj(e.target.value)} className="form-control" ></input>
                    </div>
                    <div className="mb-3">
                        <label>Location</label>
                        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="form-control" ></input>
                    </div>
                    <div className="mb-3">
                        <label >Age</label>
                        <input type="number" value={age} onChange={handleAgeChange}
                            className={`form-control ${ageError ? 'is-invalid' : ''}`} />
                        {ageError && <div className="invalid-feedback">{ageError}</div>}
                    </div>
                    <div className="mb-3">
                        <label>Course</label>
                        <input type="text" value={course} onChange={(e) => setCourse(e.target.value)} className="form-control" ></input>
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