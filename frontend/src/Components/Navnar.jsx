import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router";

function Navnar({ userInfo, onSearchNote }) {
  const navigate = useNavigate();
  const [serachQuery, setSearchQuery] = useState("");
  const onLogout = () => {
    localStorage.clear();
    navigate("/login"); // Fixed the typo here
  };

  const handleSearch = () => {
    if (serachQuery) {
      onSearchNote(serachQuery);
    }
  };
  const getInitials = (name) => {
    if (!name) return "";
    const words = name.split(" ");
    let initials = "";
    for (let i = 0; i < Math.min(words.length, 2); i++) {
      initials += words[i][0];
    }
    return initials.toUpperCase(); // Use toUpperCase for consistency
  };

  // Handle loading or undefined userInfo
  if (!userInfo) {
    return <div>Loading...</div>;
  }

  const user = userInfo.fullName;
  const initials = getInitials(user);

  return (
    <div className="full-container border-b shadow">
      <div className="flex justify-between items-center p-4">
        <h2 className="text-xl font-bold">Note</h2>
        <div>
          <div className="flex items-center">
            <div className="flex w-8 h-8 bg-gray-300 rounded-full items-center justify-center font-semibold mr-2 p-2 ">
              <h2>{initials}</h2> {/* Display initials here */}
            </div>
            <p className="mr-1 ">{user}</p>
            <button className="ml-4 underline" onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>
      
      </div>
      <div className="flex items-center justify-center pb-3">
        <p>
          <input
            type="text"
            className="border border-gray-700 px-6 py-1  bg-gray-300"
            placeholder="Search..."
            value={serachQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          </p>
          <p className="border px-6 py-2 bg-gray-300 border-gray-700 w-3">
            <FaSearch onClick={handleSearch} />
          </p>
        </div>
    </div>
  );
}

export default Navnar;
