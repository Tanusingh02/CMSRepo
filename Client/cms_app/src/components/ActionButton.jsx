import React from "react";
function ActionButton({label,iconClass,onClick,disabled,variant ='primary'}){
    return(
    <button className={`btn btn-${variant} me-2`} onClick={onClick}  disabled={disabled}>
        <i className={`me-1 ${iconClass}`}></i>{label}

    </button>
    );
}
export default ActionButton;


