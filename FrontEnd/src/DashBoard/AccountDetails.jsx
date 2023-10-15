import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../Redux/UserSlice';
import { updatePassword } from '../Redux/UserSlice';

function AccountDetails() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  // You can access the email and password as follows:
  const email = user?.email;
  const password = user?.password; // Removed the 'let' declaration

  const localEmail = localStorage.getItem('email');
  const localPassword = localStorage.getItem('password');

  // State to track whether the password is being edited
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  // State to store the edited password
  const [editedPassword, setEditedPassword] = useState('');

  const handlePasswordEdit = () => {
    setIsEditingPassword(true);
    setEditedPassword(password || '');
  };

  const handleSavePassword = () => {
    // Dispatch an action to update the password in Redux
    dispatch(updatePassword(editedPassword));

    // Update the local storage
    localStorage.setItem('password', editedPassword);

    // Exit the editing mode
    setIsEditingPassword(false);
  };

  return (
    <div className="bg-gray-200 p-4 rounded-lg shadow-md">
      <Typography variant="h6" className="text-lg font-semibold mb-2 text-indigo-600">
        Account Details
      </Typography>
      <div className="mb-2">
        <span className="text-gray-700 text-base">Email:</span> {(!user || localEmail != null) ? localEmail : ''}
      </div>
      <div className="mb-2 flex items-center">
        <span className="text-gray-700 text-base">Password:</span>
        {isEditingPassword ? (
          <div className="ml-2 flex items-center">
            <input
              type="password"
              className="border rounded-md p-1 text-sm"
              value={editedPassword}
              onChange={(e) => setEditedPassword(e.target.value)}
            />
            <button
              className="bg-indigo-600 text-white rounded-md px-2 ml-2 text-sm"
              onClick={handleSavePassword}
            >
              Save
            </button>
          </div>
        ) : (
          <div className="ml-2 flex items-center">
            <span className="border rounded-md p-1 text-sm">{password}</span>
            <button
              className="bg-indigo-600 text-white rounded-md px-2 ml-2 text-sm"
              onClick={handlePasswordEdit}
            >
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AccountDetails;
