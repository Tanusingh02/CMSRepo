import React from 'react';

const Pagination=()=>({currentPage,totalPages,onPageChange})=>{
    if(totalPages <=1) return null;
    
    const pages = Array.from({length:totalPages},(_,i) => i+1);

    return(
        <div style={{marginTop:'20px'}}>
            {pages.map(page=>(
                <button
                key={page}
                onClick={()=> onPageChange(page)}
                style={{
                    margin: '0 5px',
                    padding: '5px 10px',
                    backgroundColor: currentPage===page? '#007bff' : '#fff',
                    color: currentPage ===page? '#fff' :'#000',
                    border: '1px solid #ccc',
                    curosor: 'pointer'
                }}
                
                >
                    {page}
                </button>
            ))}
        </div>
    )
}

export default Pagination;