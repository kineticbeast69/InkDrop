import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; // Import icons
import { Context } from "../context/notes";
import axios from "axios";
export default function ProfileHamburger() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { userInfo } = useContext(Context);
  const logoutUser = async () => {
    try {
      await axios.delete(import.meta.env.VITE_BASE_URL + "logout", {
        withCredentials: true,
      });
      navigate("/");
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      }
    }
  };

  return (
    <div className="relative">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="text-2xl p-2 rounded-md focus:outline-none"
      >
        <FiMenu />
      </button>

      {/* Sidebar Menu */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-end"
          onClick={() => setIsOpen(false)} // Close on outside click
        >
          <div
            className="bg-white w-fit h-full p-6 shadow-lg flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="text-2xl self-start focus:outline-none"
            >
              <FiX />
            </button>

            {/* User Info & Logout */}
            <div className="flex flex-col items-center self-start gap-2">
              <h1 className="text-xl font-medium">{userInfo.user?.username}</h1>
              <button
                type="button"
                className="bg-blue-500 px-4 py-2 rounded text-sm text-white hover:bg-blue-600"
                onClick={logoutUser}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
