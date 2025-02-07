import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import Password from '../Components/Password';
import axiosInstance from '../../utils/axiosInstance';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate=useNavigate();

  const onSubmitControl = async(e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    console.log('Form submitted:', { email, password });
      
try {
  const response=await axiosInstance.post('/user/login',{
    email,
    password
  });
  if(response.data && response.data.accessToken){
    localStorage.setItem("token",response.data.accessToken);
    navigate('/dash');
  }
} catch (error) {
  if(error.response &&error.response.data && error.response.data.message){
    setError(error.response.data.message);
  }else{
    setError("An unexpected error occurred. Pleas try again.");
  }
}


    // Proceed with your login logic
  };

  return (
    <div className="mt-8 flex flex-auto justify-center">
      <div className="w-1/3 border p-6 bg-gray-100">
        <h2 className="text-xl font-bold py-2 text-center">Login</h2>
        <form className="flex flex-col" onSubmit={onSubmitControl}>
          <input
            type="email"
            className="border px-2 py-1 mb-2"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Password
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            className={`w-full text-lg font-semibold ${
              email && password ? 'bg-red-500' : 'bg-gray-300 cursor-not-allowed'
            } text-white mt-2 py-1 px-2`}
            type="submit"
            disabled={!email || !password}
          >
            Login
          </button>
          <Link className="my-2 text-xl" to='/signup'>
            Have no account? <span className="underline">Sign Up</span>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
