import React,{useState} from "react";

const CategoryPage=()=>{
    //State to comtrol form visibility
    const [showFrom,setShowForm]=useState(false);
    //State to hold list of categoris fetched or added
    const [categories,setCategories]=useState([]);
    //State to hold input values
    const [formData, setFormData]=useState({
        title:'',
        type:'',
        description:''
    });

    //Handle input change and update fromData state
    const handleChange=(e)=>{
        setFormData({...formData,[e.taget.name]: e.target.value});
    }

    //Handle form submit
    const handleSubmit=async(e)=>{
        e.preventDefault();//prevent defaukt form refreesh

        //Add new category to the category list
        setCategories([...categories,formData]);

        //Hide the from and reset inputs
        setShowForm(false);
        setFormData({title:'',type:'',description:''});
    }

    return(
        <div className="container mt-5">
            {/*Header with tile and new button*/}
            <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Categories</h2>
            <button className="btn btn-primary" onClick={()=>setShowForm(true)}>New</button>
        </div>
     {/*Category from-shows only if showFrom is true*/}
        {showFrom &&(
            <div className="card p-4 shadow-sm mb-4">
            <h4>Add new Category</h4>
            <form onSubmit={handleSubmit}>
            {/*Title input*/}
            <div className="mb-3">
            <label className="form-lable">Title</label>
            <input
             type="text"
             name="title"
             className="form-control"
             value={formData.title}
             onChange={handleChange}
             required
             />
            </div>
        
            
            {/*Type input*/}
             <div className="mb-3">
            <label className="form-lable">Type</label>
            <input
             type="text"
             name="type"
             className="form-control"
             value={formData.type}
             onChange={handleChange}
             required
             />
            </div>

            {/*Description input*/}
             <div className="mb-3">
            <label className="form-lable">Description</label>
            <textarea
             name="description"
             className="form-control"
             rows="3"
             value={formData.description}
             onChange={handleChange}
             required
             />
            </div>

            {/*Submit and cancel buttons*/}
            <button type="submit" className="btn btn-success">Add Category</button>
            <button 
            type="button"
            className="btn btn-secondary ms-2"
            onClick={()=>setShowForm(false)}>Cancel</button>
            
            </form>
            </div>
        )}

        {/*List of added categories*/}
        <div>
            {categories.map((cat,index)=>(
                <div key={index} className="card mb-3">
                    <div className="card-body">
                        <h5 className="card-title">{cat.title}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{cat.type}</h6>
                        <p className="card-text">{cat.description}</p>
                    </div>
            
        </div>
        ))}
        </div>
        </div>
    )
}
export default CategoryPage;