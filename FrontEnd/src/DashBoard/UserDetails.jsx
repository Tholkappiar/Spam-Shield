import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import axios from 'axios';

const UserDetails = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const response = await axios.get(`http://localhost:8080/api/v1/user/${localStorage.getItem('UID')}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(userData);
  };

  const handleSubmit = () => {
    const updateUserData = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const response = await axios.put(`http://localhost:8080/api/v1/user/update/${localStorage.getItem('UID')}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setUserData(response.data);
          setIsEditing(false);
        } else {
          console.error('Error updating user data');
        }
      } catch (error) {
        console.error('Error updating user data:', error);
      }
    };

    updateUserData();
  };

  return (
    <div>
      <Grid item xs={12}>
        <Paper className="p-4 flex flex-col bg-white rounded-lg shadow-md">
          {userData ? (
            isEditing ? (
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="p-2 mb-2 border border-gray-300 rounded"
                />
                <input
                  type="text"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="p-2 mb-2 border border-gray-300 rounded"
                />
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="p-2 mb-2 border border-gray-300 rounded"
                />
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
                  >
                    Update
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <h2 className="text-lg font-semibold mb-2">User Details</h2>
                <p className="mb-2">Name: {userData.name}</p>
                <p className="mb-2">Email: {userData.email}</p>
                <p className="mb-2">Password: ****</p>
                <div className="flex justify-end">
                  <button
                    onClick={handleEdit}
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                </div>
              </div>
            )
          ) : (
            <p>Loading user data...</p>
          )}
        </Paper>
      </Grid>
    </div>
  );
};

export default UserDetails;
