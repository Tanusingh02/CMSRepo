import { use, useEffect, useState } from "react"

function ShowPages(){
    
    const[pages,setPages]=useState([]);
    const[error,setError]=useState(null);
    useEffect(()=>{
        fetch('http://localhost:8080/pages/getAll',
        ).then((response)=>
        {
            return response.json();
        }).then((result)=>
        {
            console.log(result);
            setPages(result)
        }).catch((error)=>
        {
            console.log("Error fetching ",error);
            setError('Failed to fetch data');
        });
    },[])

    return(
         <div className="container">
                  <table className="table table-striped">
                    <thead>
                        <tr>
                        <th scope="col"><input type="checkbox"></input></th>
                        <th scope="col">Page Title</th>
                        <th scope="col">Category</th>
                        <th scope="col">Author</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pages.map((page=>
                            <tr>
                                <td><input type="checkbox"></input></td>
                                <td>{page.page_title}</td>
                                <td>{page.category}</td>
                                <td>{page.author}</td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
         </div>
    )
}
export default ShowPages;