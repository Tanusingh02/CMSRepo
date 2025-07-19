import 'bootstrap/dist/css/bootstrap.min.css';
function AddUser()
{
   return(
    <div>
        <div className="d-flex justify-content-center align-items-start vh-100 bg-light" style={{width:"450px"}}>
        <div className="p-4 rounded shadow bg-white" style={{width:"100%",maxWidth:"900px"}}>
             <h3 className='text-center mb-4 ' style={{color:" #1f87c2"}}>Add-User</h3>
            <form >
                <div className="mb-3">
                <label>Full Name</label>
                <input type="text"  className="form-control" ></input>
                </div>
            <div className="mb-3">
                <label >Email</label>
                <input type="email"  className="form-control" ></input>
                </div>
            <div className="mb-3">
                <label >Password</label>
                <input type="password"  className="form-control" ></input>
                </div> 
            <div className="mb-3">
                <label >Role</label>
                <input type="text"  className="form-control" ></input>
                </div> 
            <div className="mb-3">
                <label>DOJ</label>
                <input type="date"  className="form-control" ></input>
                </div>  
            <div className="mb-3">
                <label>Location</label>
                <input type="text"  className="form-control" ></input>
                </div>  
            <div className="mb-3">
                <label >Age</label>
                <input type="number"  className="form-control" ></input>
                </div> 
            <div className="mb-3">
                <label>Course</label>
                <input type="text"  className="form-control" ></input>
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