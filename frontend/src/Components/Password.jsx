import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Password({ onChange, value }) {
  const [passwordToggle, setPasswordToggle] = useState(false);

  const handleToggle = () => {
    setPasswordToggle((prev) => !prev);
  };

  return (
    <div className="relative flex items-center">
      {/* Password Input */}
      <input
        type={passwordToggle ? 'text' : 'password'}
        className="py-1 px-2 w-full border rounded"
        onChange={onChange}
        value={value}
        placeholder="Enter your password"
      />
      {/* Toggle Icon */}
      <span
        className="absolute right-3 cursor-pointer text-gray-500"
        onClick={handleToggle}
        aria-label={passwordToggle ? 'Hide password' : 'Show password'}
      >
        {passwordToggle ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
      </span>
    </div>
  );
}

export default Password;
