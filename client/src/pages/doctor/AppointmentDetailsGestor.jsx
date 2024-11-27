import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppointments } from "../../context/appointmentsContext";

function AppointmentDetailsGestor() {
  const params = useParams();
  const { getAppointmentById, updateAppointment } = useAppointments();

  console.log(params.id)
  // Separando los campos de appointment
  const [date, setDate] = useState("20 de noviembre, 10:00 AM");
  const [patientName, setPatientName] = useState("Juan Pérez");
  const [patientAge, setPatientAge] = useState(34);
  const [patientGender, setPatientGender] = useState("Masculino");
  const [patientContact, setPatientContact] = useState("939393984");
  const [reason, setReason] = useState("Dolor de cabeza recurrente");
  const [price, setPrice] = useState("50 soles");
  const [status, setStatus] = useState("pending"); // Estados

  const [notes, setNotes] = useState([]);
  // Separando los campos del formulario
  const [diagnosis, setDiagnosis] = useState("");
  const [treatment, setTreatment] = useState("");
  const [cancelReason, setCancelReason] = useState("");
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    const loadAppointment = async () => {
      if (params.id) {
        const appointmentData = await getAppointmentById(params.id);

        setDate(appointmentData.date);
        setPatientName(appointmentData.patientName);
        setPatientAge(appointmentData.patientAge);
        setPatientGender(appointmentData.patientGender);
        setPatientContact(appointmentData.patientContact);
        setReason(appointmentData.reason);
        setStatus(appointmentData.state);
        if (appointmentData.state === 'completed' || appointmentData.state === 'in progress') {
          const report = appointmentData.medical_report;
          setDiagnosis(report.diagnosis);
          setTreatment(report.treatment);
          setNotes(report.notes ? report.notes : []);
        }
        
      }
    };
    loadAppointment();
  }, []);

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
  };

  const handleAddNote = () => {
    if (newNote) {
      setNotes((prev) => [...prev, newNote]);
      setNewNote("");
    }
  };

  const renderForm = () => {
    if (status === "no show") {
      return (
        <p className="text-gray-500 mt-6">
          No hay historial médico porque el paciente no asistió.
        </p>
      );
    }

    if (status === "canceled") {
      return (
        <div className="mt-6">
          <label className="block font-semibold mb-2">Razón de la Cancelación:</label>
          <textarea
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>
      );
    }

    if (status === "in progress" || status === "completed") {
      return (
        <div className="mt-6">
          <label className="block font-semibold mb-2">Diagnóstico:</label>
          <input
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            className="w-full p-2 border rounded-md"
          />

          <label className="block font-semibold mb-2 mt-4">Tratamiento:</label>
          <input
            value={treatment}
            onChange={(e) => setTreatment(e.target.value)}
            className="w-full p-2 border rounded-md"
          />

          <label className="block font-semibold mb-2 mt-4">Notas Médicas:</label>
          <ul className="list-disc pl-5 mb-2 text-gray-700">
            {notes.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <input
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
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

  const registerAppointmentInfo = () => {
    const preDateJson = {
      client_id: params.id,
      date,
      state: status
    };
    const onDateJson = {
      client_id: params.id,
      date,
      state: status,
      report: {
        diagnosis,
        treatment,
        notes
      },
    };
    const canceledJson = {
      client_id: params.id,
      date,
      state: status,
      report: {
        canceled_reason: cancelReason,
      },
    };

    console.log(updateAppointment)
    if (status === 'canceled') {
      updateAppointment(params.id, canceledJson);
      console.log(canceledJson);
    } else if (status === 'in progress' || status === 'completed') {
      updateAppointment(params.id, onDateJson);
      console.log(onDateJson);
    } else {
      console.log(preDateJson);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md mt-2">
      <h1 className="text-2xl font-bold mb-4">Detalles de la Cita</h1>
      <p className="text-lg mb-2">📅 Cita: {date}</p>
      <p className="text-lg mb-2">Paciente: {patientName}</p>
      <p className="text-lg mb-2">
        Edad: {patientAge} años | Género: {patientGender} | Contacto: {patientContact}
      </p>
      <p className="text-lg mb-2">Motivo: {reason}</p>
      <p className="text-lg mb-4">Precio: {price}</p>
      <Link to="/medical-history" className="text-blue-600 hover:underline font-semibold">
        [Ver historial completo]
      </Link>

      <div className="mt-6">
        <label className="block font-semibold mb-2">Opciones:</label>
        <select
          className="p-2 border rounded-md w-full mb-4"
          value={status}
          onChange={(e) => handleStatusChange(e.target.value)}
        >
          <option value="pending">Pendiente</option>
          <option value="confirmed">Confirmada</option>
          <option value="reprogramaded">Reprogramada</option>
          <option value="in progress">En Proceso</option>
          <option value="completed">Completada</option>
          <option value="canceled">Cancelada</option>
          <option value="no show">No Asistió</option>
        </select>

        <button
          onClick={() => alert("Redirigir a reprogramar")}
          className={`px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 ${status === "Cancelada" ? "opacity-50 cursor-not-allowed" : ""
            }`}
          disabled={status === "Cancelada"}
        >
          Reprogramar Cita
        </button>
      </div>

      <label className="block font-semibold mt-5">Formulario:</label>
      {renderForm()}

      {status !== "No Asistio" && (
        <button
          onClick={registerAppointmentInfo}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Registrar en el historial
        </button>
      )}
    </div>
  );
}

export default AppointmentDetailsGestor;
