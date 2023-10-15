import React, { useEffect, useState } from "react";
import { fetchCustomers, handleEdit, handleDelete, fetchUser } from "./api";
import { Navigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from "axios";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [editingCustomerId, setEditingCustomerId] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    const fetchData = async () => {
      try {
        const data = await fetchCustomers(token);
        setCustomers(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching customer data: ", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleEditClick = (customer) => {
    setSelectedCustomer(customer);
    setEditedName(customer.name);
    setEditedEmail(customer.email);
    setEditingCustomerId(customer.uid);
    setEditing(true); // Indicate that editing is active
  };

  const handleEditSubmit = async () => {
    try {
      const token = localStorage.getItem('jwtToken');
      const selectedCustomerData = await fetchUser(token, editingCustomerId);
      const updatedCustomer = {
        uid: editingCustomerId,
        name: editedName,
        email: editedEmail,
        password: selectedCustomerData.password,
        role: selectedCustomerData.role
      };

      const updatedData = await handleEdit(token, editingCustomerId, updatedCustomer);

      if (updatedData) {
        setCustomers((prevCustomers) =>
          prevCustomers.map((customer) =>
            customer.uid === editingCustomerId ? { ...customer, ...updatedData } : customer
          )
        );
        setSelectedCustomer(null);
        setEditingCustomerId(null);
        setEditing(false); // Clear editing status
      } else {
        console.error('Error updating customer information');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleCancelClick = () => {
    setSelectedCustomer(null);
    setEditingCustomerId(null);
    setEditing(false); // Set editing to false when cancel is clicked
  };
  const isAdmin = localStorage.getItem('role') === 'ADMIN';
  


  return (
    <div className="bg-white p-4 shadow-lg rounded-lg mx-auto max-w-xl" style={{ width: '100%' }}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Customer List</h2>
      </div>

      {!isAdmin && !loading && !localStorage.getItem('role') == 'CUSTOMER' ? (
        <p className="text-center">Need Admin Access . Contact Admin .</p>
      ) : (
        customers.length > 0 ? (
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="py-2">ID</th>
                <th className="py-2">Name</th>
                <th className="py-2">Email</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.uid}>
                  <td className="py-2">{customer.uid}</td>
                  <td className="py-2">
                    {editingCustomerId === customer.uid ? (
                      <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    ) : (
                      customer.name
                    )}
                  </td>
                  <td className="py-2">
                    {editingCustomerId === customer.uid ? (
                      <input
                        type="text"
                        value={editedEmail}
                        onChange={(e) => setEditedEmail(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                    ) : (
                      customer.email
                    )}
                  </td>
                  <td className="py-2">
                    {editingCustomerId === customer.uid ? (
                      <>
                        <IconButton onClick={handleEditSubmit}>
                          <CheckIcon />
                        </IconButton>
                        <IconButton onClick={handleCancelClick}>
                          <CancelIcon />
                        </IconButton>
                      </>
                    ) : (
                      <>
                        <IconButton onClick={() => handleEditClick(customer)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(customer.uid, localStorage.getItem('jwtToken'))}>
                          <DeleteIcon />
                        </IconButton>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center">No customers available.</p>
        )
      )}
    </div>
  );
}

export default CustomerList;
