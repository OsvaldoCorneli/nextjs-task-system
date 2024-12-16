"use client"
import { useState } from "react";
import { FaBars, FaTimes, FaHome, FaUser, FaHammer, FaUsers, FaCog , FaSignOutAlt} from "react-icons/fa";
import Link from "next/link";
import { useRouter } from 'next/navigation';

const MobileNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const router = useRouter();
  
  const handleLogout = async () => {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
    });

    if (response.ok) {
      router.push('/login'); 
    } else {
      console.error('Error al cerrar sesión');
    }
  };

  return (
    <div className="relative block md:hidden">
    
      <div className="fixed top-0 left-0 w-full bg-gray-800 text-white p-4 flex justify-between items-center z-50">
        <div className="text-2xl font-semibold">Dashboard</div>
        <button onClick={toggleMenu} className="text-3xl">
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

    
      {isMenuOpen && (
        <div className="fixed top-16 left-0 w-full bg-gray-800 text-white p-4 z-40 space-y-4">
          <Link
            href="/dashboard"
            className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded"
            onClick={closeMenu}
          >
            <FaHome /> <span>Home</span>
          </Link>
          <Link
            href="/dashboard/users"
            className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded"
            onClick={closeMenu}
          >
            <FaUser /> <span>Users</span>
          </Link>
          <Link
            href="/dashboard/tasks"
            className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded"
            onClick={closeMenu}
          >
            <FaHammer /> <span>Tasks</span>
          </Link>
          <Link
            href="/dashboard/teams"
            className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded"
            onClick={closeMenu}
          >
            <FaUsers /> <span>Teams</span>
          </Link>
          <Link
            href="/settings"
            className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded"
            onClick={closeMenu}
          >
            <FaCog /> <span>Settings</span>
          </Link>
          <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 hover:bg-red-700 p-2 rounded bg-red-600 m-4 text-white"
                  >
                    <FaSignOutAlt />
                    <span>LogOut</span>
                  </button>
        </div>
      )}
    </div>
  );
};

export default MobileNavbar;
