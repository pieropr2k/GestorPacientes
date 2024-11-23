import { useState } from "react";
import { Link } from "react-router-dom";

function AppointmentGestor() {
  const [appointment, setAppointment] = useState({
    date: "20 de noviembre, 10:00 AM",
    patient: {
      name: "Juan Pérez",
      age: 34,
      gender: "Masculino",
      contact: "939393984",
    },
    reason: "Dolor de cabeza recurrente",
    price: "50 soles",
    status: "Pendiente", // Estados: Pendiente, Confirmada, Reprogramada, En Proceso, Completada, Cancelada, No Asistio
    notes: [],
  });

  const [formInput, setFormInput] = useState({
    diagnosis: "",
    treatment: "",
    cancelReason: "",
  });

  const handleStatusChange = (newStatus) => {
    setAppointment((prev) => ({ ...prev, status: newStatus }));
  };

  const handleInputChange = (e) => {
    setFormInput({ ...formInput, [e.target.name]: e.target.value });
  };

  const handleAddNote = () => {
    if (formInput.note) {
      setAppointment((prev) => ({
        ...prev,
        notes: [...prev.notes, formInput.note],
      }));
      setFormInput({ ...formInput, note: "" });
    }
  };

  const renderForm = () => {
    if (appointment.status === "No Asistio") {
      return (
        <p className="text-gray-500 mt-6">
          No hay historial médico porque el paciente no asistió.
        </p>
      );
    }   

    if (appointment.status === "Cancelada") {
      return (
        <div className="mt-6">
          <label className="block font-semibold mb-2">Razón de la Cancelación:</label>
          <textarea
            name="cancelReason"
            value={formInput.cancelReason}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
      );
    }

    if (appointment.status === "En Proceso" || appointment.status === "Completada") {
      return (
        <div className="mt-6">
          <label className="block font-semibold mb-2">Diagnóstico:</label>
          <input
            name="diagnosis"
            value={formInput.diagnosis}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          />

          <label className="block font-semibold mb-2 mt-4">Tratamiento:</label>
          <input
            name="treatment"
            value={formInput.treatment}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md"
          />

          <label className="block font-semibold mb-2 mt-4">Notas Médicas:</label>
          <ul className="list-disc pl-5 mb-2 text-gray-700">
            {appointment.notes.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <input
              name="note"
              value={formInput.note || ""}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-md"
            />
            <button
              onClick={handleAddNote}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              +
            </button>
          </div>
        </div>
      );
    }

    return (
        <p className="text-gray-500 mt-6">
            Para que puedas hacer el formulario de Diagnóstico, cambia el estado de la cita a "En Proceso" o "Completado" por favor.
        </p>
    );
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md mt-2">
      <h1 className="text-2xl font-bold mb-4">Detalles de la Cita</h1>
      <p className="text-lg mb-2">📅 Cita: {appointment.date}</p>
      <p className="text-lg mb-2">
        Paciente: {appointment.patient.name}
      </p>
      <p className="text-lg mb-2">
        Edad: {appointment.patient.age} años | Género:{" "}
        {appointment.patient.gender} | Contacto: {appointment.patient.contact}
      </p>
      <p className="text-lg mb-2">Motivo: {appointment.reason}</p>
      <p className="text-lg mb-4">Precio: {appointment.price}</p>
      <Link
        to="/medical-history"
        className="text-blue-600 hover:underline font-semibold"
      >
        [Ver historial completo]
      </Link>

      <div className="mt-6">
        <label className="block font-semibold mb-2">Opciones:</label>
        <select
          className="p-2 border rounded-md w-full mb-4"
          value={appointment.status}
          onChange={(e) => handleStatusChange(e.target.value)}
        >
          <option value="Pendiente">Pendiente</option>
          <option value="Confirmada">Confirmada</option>
          <option value="Reprogramada">Reprogramada</option>
          <option value="En Proceso">En Proceso</option>
          <option value="Completada">Completada</option>
          <option value="Cancelada">Cancelada</option>
          <option value="No Asistio">No Asistió</option>
        </select>

        <button
          onClick={() => alert("Redirigir a reprogramar")}
          className={`px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 ${
            appointment.status === "Cancelada" ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={appointment.status === "Cancelada"}
        >
          Reprogramar Cita
        </button>
      </div>

      <label className="block font-semibold mt-5">Formulario:</label>
      {renderForm()}

      {appointment.status !== "No Asistio" && (
        <button className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Registrar en el historial
        </button>
      )}
    </div>
  );
}

export default AppointmentGestor;
