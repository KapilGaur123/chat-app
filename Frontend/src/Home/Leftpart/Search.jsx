import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import GetAllusers from "../../context/GetAllUsers";
import UseConversation from "../../zustand/UseConversation";

function Search() {
  const [search, setSearch] = useState("");
  const [allUsers] = GetAllusers();
  const { setSelectConversation } = UseConversation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    const conversation_To = allUsers.find((user) =>
      user.fullname?.toLowerCase().includes(search.toLowerCase())
    );
    if (conversation_To) {
      setSelectConversation(conversation_To);
      setSearch("");
      return;
    } else {
      alert("User not found");
    }
  };

  return (
    <>
      <div className="h-[13vh] bg-black text-gray-400">
        <div className="px-6 py-4">
          <form onSubmit={handleSubmit}>
            <div className="flex space-x-3">
              <label className="border-[1px] border-gray-700 bg-slate-900 rounded-lg p-3 flex items-center gap-2 w-[80%]">
                <input
                  type="text"
                  className="grow outline-none bg-transparent"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </label>
              <button>
                <FaSearch className="text-5xl p-2 hover:bg-gray-600 rounded-full duration-300" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Search;
