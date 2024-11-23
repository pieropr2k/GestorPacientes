import React, { useState } from "react";
import { Link } from "react-router-dom";

const doctorsData = [
  {
    id: 1,
    nombreCompleto: "Dr. Juan Pérez Gómez",
    especialidad: "Cardiología",
    ubicacion: "Los Olivos",
    experiencia: 10,
    calificacion: 4.8,
    opiniones: 45,
    tarifa: 50,
    foto: "https://via.placeholder.com/150"
  },
  {
    id: 2,
    nombreCompleto: "Dra. Ana García López",
    especialidad: "Dermatología",
    ubicacion: "Miraflores",
    experiencia: 8,
    calificacion: 4.6,
    opiniones: 30,
    tarifa: 80,
    foto: "https://via.placeholder.com/150"
  },
  {
    id: 3,
    nombreCompleto: "Dr. Carlos Fernández",
    especialidad: "Pediatría",
    ubicacion: "San Isidro",
    experiencia: 12,
    calificacion: 4.9,
    opiniones: 60,
    tarifa: 70,
    foto: "https://via.placeholder.com/150"
  },
  {
    id: 4,
    nombreCompleto: "Dra. María Torres",
    especialidad: "Ginecología",
    ubicacion: "Surco",
    experiencia: 6,
    calificacion: 4.7,
    opiniones: 50,
    tarifa: 60,
    foto: "https://via.placeholder.com/150"
  }
];

const DoctorsListPage = () => {
  const [especialidad, setEspecialidad] = useState("");
  const [calificacionMinima, setCalificacionMinima] = useState(0);
  const [precioMin, setPrecioMin] = useState("");
  const [precioMax, setPrecioMax] = useState("");
  const [orden, setOrden] = useState("");

  const filtrarDoctores = () => {
    let doctoresFiltrados = [...doctorsData];

    if (especialidad) {
      doctoresFiltrados = doctoresFiltrados.filter((doctor) =>
        doctor.especialidad.toLowerCase().includes(especialidad.toLowerCase())
      );
    }

    if (calificacionMinima > 0) {
      doctoresFiltrados = doctoresFiltrados.filter((doctor) => doctor.calificacion >= calificacionMinima);
    }

    if (precioMin || precioMax) {
      doctoresFiltrados = doctoresFiltrados.filter((doctor) => {
        const cumpleMin = precioMin ? doctor.tarifa >= Number(precioMin) : true;
        const cumpleMax = precioMax ? doctor.tarifa <= Number(precioMax) : true;
        return cumpleMin && cumpleMax;
      });
    }

    switch (orden) {
      case "mejorCalificados":
        doctoresFiltrados.sort((a, b) => b.calificacion - a.calificacion);
        break;
      case "masEconomicos":
        doctoresFiltrados.sort((a, b) => a.tarifa - b.tarifa);
        break;
      case "ordenAlfabetico":
        doctoresFiltrados.sort((a, b) => a.nombreCompleto.localeCompare(b.nombreCompleto));
        break;
      default:
        break;
    }

    return doctoresFiltrados;
  };

  const doctoresFiltrados = filtrarDoctores();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Buscar Doctor</h1>

        {/* Filtros */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Filtros</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block font-semibold mb-2">Especialidad</label>
              <input
                type="text"
                value={especialidad}
                onChange={(e) => setEspecialidad(e.target.value)}
                placeholder="Ej. Cardiología"
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Calificación mínima</label>
              <input
                type="number"
                value={calificacionMinima}
                onChange={(e) => setCalificacionMinima(e.target.value)}
                placeholder="Ej. 4"
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Rango de Precio</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={precioMin}
                  onChange={(e) => setPrecioMin(e.target.value)}
                  placeholder="Mín"
                  className="w-1/2 px-4 py-2 border rounded-lg"
                />
                <input
                  type="number"
                  value={precioMax}
                  onChange={(e) => setPrecioMax(e.target.value)}
                  placeholder="Máx"
                  className="w-1/2 px-4 py-2 border rounded-lg"
                />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <label className="block font-semibold mb-2">Ordenar por</label>
            <select
              value={orden}
              onChange={(e) => setOrden(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="">Seleccione...</option>
              <option value="mejorCalificados">Mejor Calificados</option>
              <option value="masEconomicos">Más Económicos</option>
              <option value="ordenAlfabetico">Orden Alfabético</option>
            </select>
          </div>
        </div>

{/* Listado de Doctores */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {doctoresFiltrados.map((doctor) => (
    <Link
      to={`/doctor-info`}
      key={doctor.id}
      className="bg-white p-6 rounded-lg shadow-md flex items-center gap-6 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
    >
      {/* Foto del Doctor */}
      <img
        src={doctor.foto}
        alt={`Foto de ${doctor.nombreCompleto}`}
        className="w-40 h-40 rounded-full object-cover"
      />

      {/* Información del Doctor */}
      <div className="flex-1">
        <h3 className="text-2xl font-bold">{doctor.nombreCompleto}</h3>
        <p className="text-yellow-500 font-semibold flex items-center gap-1 text-lg">
          {"★".repeat(Math.floor(doctor.calificacion))}
          {"☆".repeat(5 - Math.floor(doctor.calificacion))}{" "}
          <span className="text-sm text-gray-500">
            {doctor.calificacion} ({doctor.opiniones} opiniones)
          </span>
        </p>
        <p className="text-gray-700 text-sm font-medium">Especialidad: {doctor.especialidad}</p>
        <p
          className="text-gray-600 text-sm mt-2 line-clamp-3"
          title={doctor.descripcion}
        >
          {doctor.descripcion}
        </p>
        <p className="text-gray-700 text-sm flex items-center gap-2 mt-2">
          <span className="material-icons text-gray-500">location_on</span>
          {doctor.ubicacion}
        </p>
        <p className="text-gray-700 text-sm">Experiencia: {doctor.experiencia} años</p>
        <p className="text-gray-700 text-sm font-bold mt-2">
          A partir de ${doctor.tarifa} USD
        </p>
      </div>
    </Link>
  ))}
</div>

      </div>
    </div>
  );
};

export default DoctorsListPage;
