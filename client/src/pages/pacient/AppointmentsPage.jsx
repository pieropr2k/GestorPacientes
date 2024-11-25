import React, { useState } from "react";

const AppointmentsList = ({ appointments }) => {

  appointments = [
    {
      id: 1,
      date: "2024-12-01T10:00:00",
      doctor: {
        nombreCompleto: "Dra. María López",
        especialidad: "Dermatología",
      },
      estado: "programada",
      motivo_consulta: "Revisión de lunares",
    },
    {
      id: 2,
      date: "2024-11-10T15:00:00",
      doctor: {
        nombreCompleto: "Dr. Juan Pérez",
        especialidad: "Cardiología",
      },
      estado: "completada",
      motivo_consulta: "Control de presión arterial",
    },
    {
      id: 3,
      date: "2024-11-05T10:00:00",
      doctor: {
        nombreCompleto: "Dra. Ana García",
        especialidad: "Ginecología",
      },
      estado: "cancelada",
      motivo_consulta: "Consulta prenatal",
    },
  ];
  

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const now = new Date();
  const futureAppointments = appointments.filter(
    (appointment) => new Date(appointment.date) > now
  );
  const pastAppointments = appointments.filter(
    (appointment) => new Date(appointment.date) <= now
  );

  const formatDateTime = (date) =>
    new Date(date).toLocaleDateString("es", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const handleCancel = (appointment) => {
    setSelectedAppointment(appointment);
    setShowCancelModal(true);
  };

  const handleReschedule = (appointment) => {
    setSelectedAppointment(appointment);
    setShowRescheduleModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Tus Citas</h1>

        {/* Citas Futuras */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Citas Futuras</h2>
          {futureAppointments.length > 0 ? (
            <ul className="space-y-4">
              {futureAppointments.map((appointment) => (
                <li
                  key={appointment.id}
                  className="p-4 border rounded-lg shadow-sm bg-blue-50"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-lg font-bold">
                        {appointment.doctor.nombreCompleto}
                      </p>
                      <p className="text-gray-600">{appointment.doctor.especialidad}</p>
                      <p className="text-gray-500">{formatDateTime(appointment.date)}</p>
                      <p className="text-gray-700">
                        Motivo: {appointment.motivo_consulta}
                      </p>
                      <p
                        className={`text-sm font-semibold ${
                          appointment.estado === "programada"
                            ? "text-blue-600"
                            : "text-red-600"
                        }`}
                      >
                        Estado: {appointment.estado}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleReschedule(appointment)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        Reprogramar
                      </button>
                      <button
                        onClick={() => handleCancel(appointment)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No tienes citas futuras.</p>
          )}
        </div>

        {/* Citas Pasadas */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Citas Pasadas</h2>
          {pastAppointments.length > 0 ? (
            <ul className="space-y-4">
              {pastAppointments.map((appointment) => (
                <li
                  key={appointment.id}
                  className="p-4 border rounded-lg shadow-sm bg-gray-50"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-lg font-bold">
                        {appointment.doctor.nombreCompleto}
                      </p>
                      <p className="text-gray-600">{appointment.doctor.especialidad}</p>
                      <p className="text-gray-500">{formatDateTime(appointment.date)}</p>
                      <p className="text-gray-700">
                        Motivo: {appointment.motivo_consulta}
                      </p>
                      <p className="text-green-600 font-semibold">Estado: {appointment.estado}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No tienes citas pasadas.</p>
          )}
        </div>
      </div>

      {/* Modal Cancelar */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Cancelar Cita</h3>
            <p className="text-gray-700 mb-6">
              ¿Estás seguro de que quieres cancelar tu cita con{" "}
              <strong>{selectedAppointment.doctor.nombreCompleto}</strong>?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowCancelModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                No
              </button>
              <button
                onClick={() => {
                  // Acción de cancelar cita
                  setShowCancelModal(false);
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Sí, Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Reprogramar */}
      {showRescheduleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Reprogramar Cita</h3>
            <p className="text-gray-700 mb-6">
              ¿Quieres reprogramar tu cita con{" "}
              <strong>{selectedAppointment.doctor.nombreCompleto}</strong>?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowRescheduleModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                No
              </button>
              <button
                onClick={() => {
                  // Acción de reprogramar cita
                  setShowRescheduleModal(false);
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Sí, Reprogramar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentsList;
