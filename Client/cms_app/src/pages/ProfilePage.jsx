import React, { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../layouts/Mainlayout";
const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) {
        setError("User ID is missing. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`http://localhost:8080/user/${userId}`);
        setUser(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching user");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <MainLayout>
      <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
        <h2>👤 User Profile</h2>
        <p>
          <strong>Name:</strong> {user.fullname}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>
        <p>
          <strong>Age:</strong> {user.age}
        </p>
        <p>
          <strong>location:</strong> {user.location}
        </p>
        <p>
          <strong>course:</strong> {user.course}
        </p>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
