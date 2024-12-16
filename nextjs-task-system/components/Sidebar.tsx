"use client"
import Link from "next/link"; 
import { FaHome, FaUser, FaCog, FaUsers, FaHammer, FaSignOutAlt } from "react-icons/fa";
import { useRouter } from 'next/navigation';

const Sidebar = () => {
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
    <div className="flex">
     
      <div className="hidden md:flex flex-col fixed top-0 left-0 w-64 bg-gray-800 text-white h-screen overflow-y-auto">
        <div className="p-4 text-2xl font-semibold">Dashboard</div>
        <div className="flex flex-col p-4 space-y-4 flex-1">
          <Link
            href="/dashboard"
            className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded"
          >
            <FaHome /> <span>Home</span>
          </Link>
          <Link
            href="/dashboard/users"
            className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded"
          >
            <FaUser /> <span>Users</span>
          </Link>
          <Link
            href="/dashboard/tasks"
            className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded"
          >
            <FaHammer /> <span>Tasks</span>
          </Link>
          <Link
            href="/dashboard/teams"
            className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded"
          >
            <FaUsers /> <span>Teams</span>
          </Link>
          <Link
            href="/settings"
            className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded"
          >
            <FaCog /> <span>Settings</span>
          </Link>
        </div>
        {/* Botón de LogOut */}
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 hover:bg-red-700 p-2 rounded bg-red-600 m-4 text-white"
        >
          <FaSignOutAlt />
          <span>LogOut</span>
        </button>
      </div>

     
      <div className="flex-1 ml-64 p-6 overflow-y-auto"></div>
    </div>
  );
};

export default Sidebar;