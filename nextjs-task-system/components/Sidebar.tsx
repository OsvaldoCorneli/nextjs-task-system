import Link from "next/link"; // Usa el Link de Next.js para la navegación
import { FaHome, FaUser, FaCog, FaUsers, FaHammer } from "react-icons/fa"; // Usa react-icons para los íconos

const Sidebar = () => {
  return (
    <div className="flex">
    {/* Sidebar fijo para desktop */}
    <div className="hidden md:flex flex-col fixed top-0 left-0 w-64 bg-gray-800 text-white h-screen overflow-y-auto">
      <div className="p-4 text-2xl font-semibold">Dashboard</div>
      <div className="flex flex-col p-4 space-y-4">
      <Link href="/dashboard" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
          <FaHome /> <span>Home</span>
        </Link>
        <Link href="/dashboard/users" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
          <FaUser /> <span>Users</span>
        </Link>
        <Link href="/dashboard/tasks" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
          <FaHammer /> <span>Tasks</span>
        </Link>
        <Link href="/dashboard/teams" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
          <FaUsers /> <span>Teams</span>
        </Link>
        <Link href="/settings" className="flex items-center space-x-2 hover:bg-gray-700 p-2 rounded">
          <FaCog /> <span>Settings</span>
        </Link>
      </div>
    </div>

    {/* Contenedor principal con desplazamiento */}
    <div className="flex-1 ml-64 p-6 overflow-y-auto">{/* Contenido aquí */}</div>
  </div>
  );
};

export default Sidebar;
