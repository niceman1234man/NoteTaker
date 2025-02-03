import React, { useState } from "react";
import { MdClose } from "react-icons/md";

function TagInput({ tags, setTags }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addNewTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      addNewTag();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      <div className="flex flex-wrap mb-2">
        {tags.map((tag, index) => (
          <span key={index} className=" text-blue-700 px-2 py-1 flex items-center mr-2">
            # {tag}
            <button onClick={() => handleRemoveTag(tag)} className="ml-2">
              <MdClose />
            </button>
          </span>
        ))}
      </div>
      <div className="flex items-center">
        <input
          type="text"
          className="border px-3 py-2 flex-grow"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKey}
          placeholder="Add a tag..."
        />
        <span
          className="text-blue-900 text-4xl border px-3 py-1 ml-3 rounded cursor-pointer"
          onClick={addNewTag}
        >
          +
        </span>
      </div>
    </div>
  );
}

export default TagInput;