import React, { useState } from 'react';
import Password from '../Components/Password';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance from '../../utils/axiosInstance'; // Ensure axiosInstance is imported

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmitControl = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true); // Set loading state

    // Basic validation
    if (!name || !email || !password) {
        setError('Please fill in all fields.');
        setLoading(false); // Reset loading state
        return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
        setError('Please enter a valid email address.');
        setLoading(false); // Reset loading state
        return;
    }

    try {
        const response = await axiosInstance.post('/user/create-account', {
            fullName: name,
            email,
            password,
        });

        console.log(response); // Log response data for debugging

        if (response) {
            localStorage.setItem("token", response.data.accessToken);
            toast("User Registered Successfully!");
            console.log("Redirecting to login..."); // Log before navigating
            navigate('/');
        }
    } catch (error) {
        console.error("Error during signup:", error); // Log error details
        if (error.response && error.response.data && error.response.data.message) {
            setError(error.response.data.message);
        } else {
            setError("An unexpected error occurred. Please try again.");
        }
    } finally {
        setLoading(false); // Reset loading state
    }
};

  return (
    <div className="mt-8 flex flex-auto justify-center">
      <div className="w-1/3 border p-6 bg-gray-100 shadow-lg">
        <h2 className="text-xl font-bold py-2 text-center">Signup</h2>
        <form className="flex flex-col" onSubmit={onSubmitControl}>
          <input
            type="text"
            className="border px-2 py-1 mb-2"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={!!error}
          />
          <input
            type="email"
            className="border px-2 py-1 mb-2"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={!!error}
          />
          <Password
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            className={`w-full text-lg font-semibold ${
              loading ? 'bg-gray-300 cursor-not-allowed' : (name && email && password ? 'bg-red-500' : 'bg-gray-300 cursor-not-allowed')
            } text-white mt-2 py-1 px-2`}
            type="submit"
            disabled={loading || !name || !email || !password}
          >
            {loading ? 'Signing Up...' : 'Signup'}
          </button>
          <p className="my-2 text-xl">
            Already have an account?{' '}
            <Link className="underline cursor-pointer" to='/'>Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;