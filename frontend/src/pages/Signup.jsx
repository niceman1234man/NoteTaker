import React, { useState } from 'react';
import Password from '../Components/Password';
import { Link } from 'react-router';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const onSubmitControl = (e) => {
    e.preventDefault();

    // Basic validation
    if (!name || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    console.log('Form submitted:', { name, email, password });
    // Proceed with signup logic (e.g., API call)
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
            onChange={(e) => {
              setName(e.target.value);
              setError('');
            }}
          />
          <input
            type="email"
            className="border px-2 py-1 mb-2"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
          />
          <Password
            onChange={(e) => {
              setPassword(e.target.value);
              setError('');
            }}
            value={password}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            className={`w-full text-lg font-semibold ${
              name && email && password
                ? 'bg-red-500'
                : 'bg-gray-300 cursor-not-allowed'
            } text-white mt-2 py-1 px-2`}
            type="submit"
            disabled={!name || !email || !password}
          >
            Signup
          </button>
          <p className="my-2 text-xl">
            Already have an account?{' '}
            <Link className="underline cursor-pointer" to='/login'>Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
