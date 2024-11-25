import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/authContext";
import { ProtectedRoute } from "./routes";

//import { ClientLayout } from "./layouts/ClientLayout";
//import { DoctorLayout } from "./layouts/DoctorLayout";

import AppointmentsPage from "./pages/pacient/AppointmentsPage";
import MedicalHistoryPage from "./pages/pacient/MedicalHistoryPage";
import DoctorsListPage from "./pages/pacient/DoctorsListPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Register from "./pages/RegisterPage";
import DoctorLayout from "./DoctorLayout";
import ClientLayout from "./ClientLayout";
import AppointmentsManagement from "./pages/doctor/AppointmentsManagement";
import AppointmentGestor from "./pages/doctor/AppointmentGestor";
import AppointmentsList from "./pages/doctor/AppointmentsList";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />

          {/* Rutas protegidas por rol */}
          <Route element={<ProtectedRoute />}>
            {/* Rutas para Clientes */}
            <Route path="/client" element={<ClientLayout/>}>
              <Route path="appointments" element={<AppointmentsPage />} />
              <Route path="medical-history" element={<MedicalHistoryPage />} />
              <Route path="search-doctor" element={<DoctorsListPage />} />
            </Route>

            {/* Rutas para Doctores */}
            <Route path="/doctor" element={<DoctorLayout />}>
              <Route path="appointments-man" element={<AppointmentsManagement />} />
              <Route path="appointments" element={<AppointmentsList />} />
              <Route path="appointments/info" element={<AppointmentGestor />} />
              {/* Agrega más rutas específicas para doctores */}
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
