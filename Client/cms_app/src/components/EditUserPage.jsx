import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainLayout from '../layouts/Mainlayout';
import EditUserForm from './EditUserForm';
 
function EditUserPage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');
 
  useEffect(() => {
    axios
      .get(`http://localhost:8080/user/${userId}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setSelectedUser(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
        setFetchError("⚠️ Failed to load user data.");
        setLoading(false);
      });
  }, [userId]);
 
  const handleUserUpdated = () => {
    navigate('/useraccount');
  };
 
  return (
    <MainLayout>
      <div className="container my-4">
        <h3 className="text-center mb-4">Edit User</h3>
 
        {loading && <p className="text-muted text-center">Loading user data...</p>}
 
        {fetchError && <p className="text-danger text-center">{fetchError}</p>}
 
        {selectedUser && (
          <EditUserForm
            user={selectedUser}
            onUserUpdated={handleUserUpdated}
          />
        )}
      </div>
    </MainLayout>
  );
}
 
export default EditUserPage;