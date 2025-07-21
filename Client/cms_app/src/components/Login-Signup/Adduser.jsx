import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
function AddUser()
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
   const [emailError, setEmailError]=useState('');
   const[passwordError,setPasswordError]=useState('');

   const handleSubmit=(e)=>{
    e.preventDefault();
    //Email validation
    const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
        setEmailError('Inavlid email format');
        return;
    }else{
        setEmailError('');
    }

    //Password validation
    const passwordRegex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if(!passwordRegex.test(password)){
        setPasswordError('Emter a valid passowrd');
        return;
    }else{
        setPasswordError('');
    }

    //Age validation
    if(parseInt(age)<22)
        setAgeError('Age cannot be less than 22');
      return;
    }
    const data={
     fullname:fullname,
     email:email,
     password:password,
     role:role,
     doj:doj,
     location:location,
     age:age,
     course:course
    }
    const handleEmailChange=(e)=>{
        const value=e.target.value;
        setEmail(value);
     
        const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
        setEmailError('Inavlid email format');
        return;
    }else{
        setEmailError('');
    }
    }

     const handlePasswordChange=(e)=>{
        const value=e.target.value;
        setPassword(value);
     
        const passwordRegex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if(!passwordRegex.test(password)){
        setPasswordError('Enter a valid password ');
        return;
    }else{
        setPasswordError('');
    }
    }




   const handleAgeChange = (e) => {
    const value = e.target.value;
    setAge(value);
    if (parseInt(value) < 22) {
      setAgeError('Age cannot be less than 22');
    } else {
      setAgeError('');
    }
  };

   return(
    <div>
        <div className="d-flex justify-content-center align-items-start vh-100 bg-light" style={{width:"450px"}}>
        <div className="p-4 rounded shadow bg-white" style={{width:"100%",maxWidth:"900px"}}>
             <h3 className='text-center mb-4 ' style={{color:" #1f87c2"}}>Add-User</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                <label>Full Name</label>
                <input type="text"  value={fullname} onChange={(e)=>setFullname(e.target.value)} className="form-control" ></input>
                </div>
            <div className="mb-3">
                <label >Email</label>
                 <input type="email"  value={email} className="form-control" onChange={handleEmailChange}></input>
                 {emailError &&(
                    <div className='text-danger' style={{fontSize:'0.9em'}}>
                        {emailError}
                        </div>
                 )}
                </div>
                
            <div className="mb-3">
                <label >Password</label>
                <input type="password"  value={password} className="form-control" onChange={handlePasswordChange}></input>
                {passwordError &&(
                    <div className='text-danger' style={{fontSize:'0.9em'}}>
                        {passwordError}
                        </div>
                 )}
                </div> 
            <div className="mb-3">
                <label >Role</label>
                <input type="text"  value={role} onChange={(e)=>setRole(e.target.value)} className="form-control" ></input>
                </div> 
            <div className="mb-3">
                <label>DOJ</label>
                <input type="date"  value={doj} onChange={(e)=>setDoj(e.target.value)} className="form-control" ></input>
                </div>  
            <div className="mb-3">
                <label>Location</label>
                <input type="text"  value={location} onChange={(e)=>setLocation(e.target.value)} className="form-control" ></input>
                </div>  
            <div className="mb-3">
                <label >Age</label>
                <input type="number"  value={age} onChange={handleAgeChange}
                className={`form-control ${ageError ? 'is-invalid' : ''}`}/>
              {ageError && <div className="invalid-feedback">{ageError}</div>}
            </div> 
            <div className="mb-3">
                <label>Course</label>
                <input type="text"  value={course} onChange={(e)=>setCourse(e.target.value)} className="form-control" ></input>
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