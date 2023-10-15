// api.js
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/v1/user/alldetails"; 
const API_UPDATE_URL = "http://localhost:8080/api/v1/user/update"; 
const API_DELETE_URL = "http://localhost:8080/api/v1/user/delete"; 
const API_USER_GET_URL = "http://localhost:8080/api/v1/user"; 
const API_CREATE_USER_URL = "http://localhost:8080/api/v1/auth/register"; 

// Function to update a customer's information
export const handleEdit = async (token, customerId, updatedData) => {
  console.log(`${token} ${customerId} ${updatedData}`)
  try {
    const response = await axios.put(
      `${API_UPDATE_URL}/${customerId}`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    return response.data; // You can return the updated customer data if needed
  } catch (error) {
    throw error;
  }
};

// Function to fetch customers with the bearer token
export const fetchCustomers = async (token) => {
  try {
    const response = await axios.get(API_BASE_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(`printing from the api: ${token}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const handleDelete = async (uid, token) => {
  console.log(uid)
  try {
    const response = await axios.delete(
      `${API_DELETE_URL}/${uid}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchUser = async (token, userId) => {
  try {
    const response = await axios.get(`${API_USER_GET_URL}/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createUser = async (token, userData) => {
  try {
    const response = await axios.post(API_CREATE_USER_URL, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRole = async (token, userId) => {
  try {
    const userData = await fetchUser(token, userId);
    const role = userData.role;
    return role;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};