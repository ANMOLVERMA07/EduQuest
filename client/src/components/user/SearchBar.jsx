import React, { useState } from 'react';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ data }) => {
  const navigate = useNavigate();
  const [input, setInput] = useState(data || '');

  const onSearchHandler = (e) => {
    e.preventDefault();
    // CHANGES /course-list/${input} to /courses/${input}
    navigate(`/courses/${input}`); // Ensure a valid URL path
  };

  return (
    <form
      onSubmit={onSearchHandler}
      className="max-w-xl w-full md:h-14 h-12 flex items-center bg-white border border-gray-500/20 rounded-full "
    >
      <img
        src={assets.search_icon}
        alt="Search Icon"
        className="md:w-auto w-10 px-3"
      />
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search for courses"
        className="w-full h-full outline-none text-gray-500/80 px-3"
      />
      <button
        type="submit"
        className="bg-blue-600 rounded-full text-white font-semibold md:px-10 px-7 md:py-3 py-2 mx-1 cursor-pointer"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;