import { NavLink, Route, Routes } from "react-router-dom";
import { useAuth } from "../context/authContext";
// import AppointmentHistory from "../pages/AppointmentHistory";
// import Schedules from "../pages/Schedules";
// import ManageMedicalHistory from "../pages/ManageMedicalHistory";

function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="flex bg-gray-100">
      {/* Sidebar */}
      <aside className="bg-blue-900 text-white flex flex-col items-center py-4 fixed h-screen w-[270px]">
        {/* Profile Picture */}
        <img
          src={user?.profilePicture || "https://via.placeholder.com/150"}
          alt="Doctor"
          className="w-28 h-28 rounded-full border-4 border-white mb-4"
        />
        {/* Welcome Message */}
        <h1 className="text-lg font-bold text-center mb-5">
          {`Bienvenido, ${user?.firstName || "Armanimo"}`}
        </h1>

        {/* Menu */}
        <nav className="w-full px-4 flex-grow">
          <ul className="space-y-1.5">
          <li>
              <NavLink
                to="./manage-info"
                className={({ isActive }) =>
                  `px-1.5 py-3 rounded-lg block text-center cursor-pointer ${
                    isActive ? "bg-blue-700" : "hover:bg-blue-800"
                  }`
                }
              >
                Mi Información
              </NavLink>
            </li>
            <li>
              <NavLink
                to="./appointments"
                className={({ isActive }) =>
                  `px-1.5 py-3 rounded-lg block text-center cursor-pointer ${
                    isActive ? "bg-blue-700" : "hover:bg-blue-800"
                  }`
                }
              >
                Lista de Citas
              </NavLink>
            </li>
            <li>
              <NavLink
                to="./schedules"
                className={({ isActive }) =>
                  `px-1.5 py-3 rounded-lg block text-center cursor-pointer ${
                    isActive ? "bg-blue-700" : "hover:bg-blue-800"
                  }`
                }
              >
                Gestionar horarios
              </NavLink>
            </li>
            <li>
              <NavLink
                to="./manage-medical-history"
                className={({ isActive }) =>
                  `px-1.5 py-3 rounded-lg block text-center cursor-pointer ${
                    isActive ? "bg-blue-700" : "hover:bg-blue-800"
                  }`
                }
              >
                Historiales Médicos
              </NavLink>
            </li>
            <li>
              <NavLink
                to="./view-finances"
                className={({ isActive }) =>
                  `px-1.5 py-3 rounded-lg block text-center cursor-pointer ${
                    isActive ? "bg-blue-700" : "hover:bg-blue-800"
                  }`
                }
              >
                Ver Finanzas
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Logout Button */}
        <button
          className="mb-4 px-12 py-3 rounded-lg cursor-pointer bg-red-600 hover:bg-red-700 mt-auto text-center"
          onClick={logout}
        >
          Salir
        </button>
      </aside>
    </div>
  );
}

export default Dashboard;
