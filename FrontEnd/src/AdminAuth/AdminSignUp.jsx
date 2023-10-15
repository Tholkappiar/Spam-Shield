import React, { useState } from 'react';
import '../Assets/CSS/Login.css';
import logo from '../Assets/images/mountain and bird/bird-black.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminSignUp() {
  // Regex
  const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  const passwordRegex = /^.{8,}$/;

  // useState
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [nameValid, setNameValid] = useState(true);
  const [flag, setFlag] = useState(false);

  const Nav = useNavigate();

  const handleOnEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleOnPassword = (e) => {
    setPassword(e.target.value);
  };

  const handleOnName = (e) => {
    setName(e.target.value);
  };

  const checkEmail = () => {
    setEmailValid(emailRegex.test(email));
  };

  const checkPassword = () => {
    setPasswordValid(passwordRegex.test(password));
  };

  const handleOnSubmit = async (e) => {
    setFlag(true);
    e.preventDefault();
    checkEmail();
    checkPassword();
    setNameValid(name.trim() !== '');

    if (
      emailValid === true &&
      passwordValid === true &&
      email !== '' &&
      password !== '' &&
      nameValid
    ) {
      try {
        const formData = {
            name: name,
            email: email,
            password: password,
            role: "ADMIN"
        }
       

        const response = await axios.post(
          'http://localhost:8080/api/v1/auth/register',
          formData
        );
        console.log(response)
       
        
        console.log(formData)
        if (response.status === 200) {
          // Registration successful, you can handle the successful registration logic here.
          // For example, redirect to the login page.
          console.log('Registration success');
          Nav('/AdminLogin'); // Redirect to the login page
        } else {
          // Handle invalid registration.
          console.log('Invalid registration');
        }
      } catch (error) {
        // Handle any errors that occur during the request.
        console.error('An error occurred:', error);
        console.log('Invalid registration');
      }
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-40 w-auto"
            src={logo}
            alt="spam-shield"
          />
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Admin SignUp
          </h2>
        </div>

        <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleOnSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Full Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={handleOnName}
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 }`}
                />
              </div>
              {!nameValid ? <span style={{ color: 'red' }}>Enter Name</span> : ''}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={handleOnEmail}
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 }`}
                />
              </div>
              {!emailValid && flag !== false ? <span style={{ color: 'red' }}>Invalid Email</span> : ''}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={handleOnPassword}
                  className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                />
              </div>
              {!passwordValid && flag !== false ? <span style={{ color: 'red' }}>Invalid Password</span> : ''}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-5 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <a href="/AdminLogin" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Sign in here
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default AdminSignUp;
