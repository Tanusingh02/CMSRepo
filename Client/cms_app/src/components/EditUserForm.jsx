import { useState } from "react";
import axios from "axios";

function EditUserForm({ user, onUserUpdated }) {
  const [fullname, setFullname] = useState(user.fullname);
 // const [email, setEmail] = useState(user.email);

  const handleSubmit = (e) => {
    e.preventDefault();
//I am removing email as admin cannot change user email { fullname, email }.
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
        <input type="text" className="form-control" value={fullname} onChange={(e) => setFullname(e.target.value)} />
      </div>
      <button type="submit" className="btn btn-primary">Update</button>
    </form>
  );
}
export default EditUserForm;
/*<div className="mb-3">
        <label>Email</label>
        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>*/