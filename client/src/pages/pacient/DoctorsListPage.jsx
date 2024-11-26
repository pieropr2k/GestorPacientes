import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDoctors } from "../../context/doctorsContext";
//import { useDoctors } from "../../context/doctorsContext";

let doctorsData = [
  {
    id: 1,
    fullName: "Dr. Juan Pérez Gómez",
    specialty: "Cardiology",
    location: "Los Olivos",
    experience: 10,
    rating: 4.8,
    reviews: 45,
    fee: 50,
    photo: "https://via.placeholder.com/150"
  },
  {
    id: 2,
    fullName: "Dr. Ana García López",
    specialty: "Dermatology",
    location: "Miraflores",
    experience: 8,
    rating: 4.6,
    reviews: 30,
    fee: 80,
    photo: "https://via.placeholder.com/150"
  },
  {
    id: 3,
    fullName: "Dr. Carlos Fernández",
    specialty: "Pediatrics",
    location: "San Isidro",
    experience: 12,
    rating: 4.9,
    reviews: 60,
    fee: 70,
    photo: "https://via.placeholder.com/150"
  },
  {
    id: 4,
    fullName: "Dr. María Torres",
    specialty: "Gynecology",
    location: "Surco",
    experience: 6,
    rating: 4.7,
    reviews: 50,
    fee: 60,
    photo: "https://via.placeholder.com/150"
  }
];

const DoctorsListPage = () => {
  
  const { doctors, getDoctors } = useDoctors();
  doctorsData = doctors;
  console.log(doctors, "doctores")

  useEffect(() => {
    getDoctors();
  }, []);
  

  const [specialty, setSpecialty] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [order, setOrder] = useState({
    priceHigh: false,
    priceLow: false,
    alphabeticalAZ: false,
    alphabeticalZA: false,
    ratingHigh: false,
    ratingLow: false
  });

  const filterDoctors = () => {
    let filteredDoctors = [...doctorsData];

    if (specialty) {
      filteredDoctors = filteredDoctors.filter((doctor) =>
        doctor.specialty.toLowerCase().includes(specialty.toLowerCase())
      );
    }

    if (minRating > 0) {
      filteredDoctors = filteredDoctors.filter((doctor) => doctor.rating >= minRating);
    }

    if (minPrice || maxPrice) {
      filteredDoctors = filteredDoctors.filter((doctor) => {
        const meetsMin = minPrice ? doctor.fee >= Number(minPrice) : true;
        const meetsMax = maxPrice ? doctor.fee <= Number(maxPrice) : true;
        return meetsMin && meetsMax;
      });
    }

    if (order.priceHigh) {
      filteredDoctors.sort((a, b) => b.fee - a.fee);
    }
    if (order.priceLow) {
      filteredDoctors.sort((a, b) => a.fee - b.fee);
    }
    if (order.alphabeticalAZ) {
      filteredDoctors.sort((a, b) => a.fullName.localeCompare(b.fullName));
    }
    if (order.alphabeticalZA) {
      filteredDoctors.sort((a, b) => b.fullName.localeCompare(a.fullName));
    }
    if (order.ratingHigh) {
      filteredDoctors.sort((a, b) => b.rating - a.rating);
    }
    if (order.ratingLow) {
      filteredDoctors.sort((a, b) => a.rating - b.rating);
    }

    return filteredDoctors;
  };

  const toggleOrder = (key) => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      [key]: !prevOrder[key]
    }));
  };

  const filteredDoctors = filterDoctors();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto flex gap-8">
        {/* Filters */}
        <div className="w-1/3 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Filtros</h2>
          <div className="mb-6">
            <label className="block font-semibold mb-2">Especialidad</label>
            <input
              type="text"
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              placeholder="E.g. Cardiology"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-6">
            <label className="block font-semibold mb-2">Mínimo Rating</label>
            <input
              type="number"
              value={minRating}
              onChange={(e) => setMinRating(e.target.value)}
              placeholder="E.g. 4"
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-6">
            <label className="block font-semibold mb-2">Rango de Precio</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="Min"
                className="w-1/2 px-4 py-2 border rounded-lg"
              />
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="Max"
                className="w-1/2 px-4 py-2 border rounded-lg"
              />
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Ordenado por</h3>
            <div>
              <p className="font-medium">Precio</p>
              <label className="block">
                <input
                  type="checkbox"
                  checked={order.priceHigh}
                  onChange={() => toggleOrder("priceHigh")}
                />{" "}
                High to Low
              </label>
              <label className="block">
                <input
                  type="checkbox"
                  checked={order.priceLow}
                  onChange={() => toggleOrder("priceLow")}
                />{" "}
                Low to High
              </label>
            </div>
            <div>
              <p className="font-medium mt-4">Por alfabeto</p>
              <label className="block">
                <input
                  type="checkbox"
                  checked={order.alphabeticalAZ}
                  onChange={() => toggleOrder("alphabeticalAZ")}
                />{" "}
                A to Z
              </label>
              <label className="block">
                <input
                  type="checkbox"
                  checked={order.alphabeticalZA}
                  onChange={() => toggleOrder("alphabeticalZA")}
                />{" "}
                Z to A
              </label>
            </div>
            <div>
              <p className="font-medium mt-4">Rating</p>
              <label className="block">
                <input
                  type="checkbox"
                  checked={order.ratingHigh}
                  onChange={() => toggleOrder("ratingHigh")}
                />{" "}
                High to Low
              </label>
              <label className="block">
                <input
                  type="checkbox"
                  checked={order.ratingLow}
                  onChange={() => toggleOrder("ratingLow")}
                />{" "}
                Low to High
              </label>
            </div>
          </div>
        </div>

        {/* Doctors List */}
        <div className="w-2/3">
          {filteredDoctors.map((doctor) => (
            <Link
              to={`./${doctor.id}`}
              key={doctor.id}
              className="bg-white mb-4 p-6 rounded-lg shadow-md flex items-center gap-6 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
            >
              {/* Doctor's Photo */}
              <img
                src={doctor.photo}
                alt={`Photo of ${doctor.fullName}`}
                className="w-40 h-40 rounded-full object-cover"
              />

              {/* Doctor's Information */}
              <div>
                <h3 className="text-2xl font-bold">{doctor.fullName}</h3>
                <p className="text-yellow-500 font-semibold flex items-center gap-1 text-lg">
                  {"★".repeat(Math.floor(doctor.rating))}
                  {"☆".repeat(5 - Math.floor(doctor.rating))}{" "}
                  <span className="text-sm text-gray-500">
                    {doctor.rating} ({doctor.reviews} reviews)
                  </span>
                </p>
                <p className="text-gray-700 text-sm font-medium">Specialty: {doctor.specialty}</p>
                <p className="text-gray-700 text-sm flex items-center gap-2 mt-2">
                  <span className="material-icons text-gray-500">location_on</span>
                  {doctor.location}
                </p>
                <p className="text-gray-700 text-sm">Experience: {doctor.experience} years</p>
                <p className="text-gray-700 text-sm font-bold mt-2">
                  Starting at ${doctor.fee} USD
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
