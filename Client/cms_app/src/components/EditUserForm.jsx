import { useState } from "react";
import axios from "axios";
 
function EditUserForm({ user, onUserUpdated }) {
  const [fullname, setFullname] = useState(user.fullname);
 
 
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`http://localhost:8080/user/${user._id}`, { fullname }, {
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json"
      }
    })
    .then((res) => {
      console.log("User updated:", res.data);
      if (onUserUpdated) onUserUpdated();
    })
    .catch((err) => console.error("Update error:", err));
  };
 
  return (
    <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label>Full Name</label>
    <input
      type="text"
      className="form-control"
      value={fullname}
      onChange={(e) => setFullname(e.target.value)}
    />
  </div>
 
  {/* Centered Button */}
  <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
    <button type="submit" className="btn btn-primary">Update</button>
  </div>
</form>
 
  );
}
export default EditUserForm;

 