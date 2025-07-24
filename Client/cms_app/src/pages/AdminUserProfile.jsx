// pages/AdminUserProfile.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import MainLayout from '../layouts/Mainlayout';

const AdminUserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:8080/user/${id}`)
      .then((res) => setUser(res.data))
      .catch((err) => setError(err.response?.data?.message || 'Error fetching user'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <MainLayout>
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h2>🔍 Admin View: User Profile</h2>
      <p><strong>Name:</strong> {user.fullname}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <p><strong>Age:</strong> {user.age}</p>
      <p><strong>Location:</strong> {user.location}</p>
      <p><strong>Course:</strong> {user.course}</p>
    </div>
    </MainLayout>
  );
};

export default AdminUserProfile;