import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { AuthProvider } from "./context/authContext";
import { ProtectedRoute } from "./routes";

import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import { AppointmentFormPage } from "./pages/AppointmentFormPage";
import { LoginPage } from "./pages/LoginPage";
import { AppointmentsPage } from "./pages/AppointmentsPage";
import { AppointmentProvider } from "./context/appointmentsContext";

function App() {
  return (
    <AuthProvider>
      <AppointmentProvider>
        <BrowserRouter>
          <main className="container content-container mx-auto px-10 md:px-0">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/appointments" element={<AppointmentsPage />} />
                <Route path="/add-appointment" element={<AppointmentFormPage />} />
                <Route path="/appointments/:id" element={<AppointmentFormPage />} />
                <Route path="/profile" element={<h1>Profile</h1>} />
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      </AppointmentProvider>
    </AuthProvider>
  );
}

export default App;
