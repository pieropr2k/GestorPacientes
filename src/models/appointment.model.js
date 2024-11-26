import db from "../database.js";

const AppointmentModel = {
  // Crear una cita
  createAppointment: (appointment) => {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO appointments (doctor_id, patient_id, consultation_reason, description, state, date_time)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
      const params = [
        appointment.doctor_id,
        appointment.patient_id,
        appointment.consultation_reason,
        appointment.description,
        appointment.state,
        appointment.date_time
      ];
      
      db.run(query, params, function (err) {
        if (err) {
          return reject(err);
        }
        resolve(this.lastID);
      });
    });
  },

  // Obtener todas las citas de un paciente
  getAppointmentsByPatient: (patientId) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT appointments.* FROM appointments
        WHERE appointments.patient_id = ?
      `;
      
      db.all(query, [patientId], (err, rows) => {
        if (err) {
          return reject(err);
        }
        resolve(rows);
      });
    });
  },

  // Obtener todas las citas de un doctor
  getAppointmentsByDoctor: (doctorId) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT appointments.* FROM appointments
        WHERE appointments.doctor_id = ?
      `;
      
      db.all(query, [doctorId], (err, rows) => {
        if (err) {
          return reject(err);
        }
        resolve(rows);
      });
    });
  },

  // Obtener una cita por ID
  getAppointmentById: (id) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT appointments.* FROM appointments WHERE appointments.id = ?
      `;
      
      db.get(query, [id], (err, row) => {
        if (err) {
          return reject(err);
        }
        resolve(row);
      });
    });
  },

  // Actualizar una cita
  updateAppointment: (id, appointment) => {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE appointments
        SET doctor_id = ?, patient_id = ?, consultation_reason = ?, description = ?, state = ?, date_time = ?
        WHERE id = ?
      `;
      const params = [
        appointment.doctor_id,
        appointment.patient_id,
        appointment.consultation_reason,
        appointment.description,
        appointment.state,
        appointment.date_time,
        id
      ];
      
      db.run(query, params, function (err) {
        if (err) {
          return reject(err);
        }
        resolve(this.changes);
      });
    });
  },

  // Eliminar una cita
  deleteAppointment: (id) => {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM appointments WHERE id = ?`;
      db.run(query, [id], function (err) {
        if (err) {
          return reject(err);
        }
        resolve(this.changes);
      });
    });
  }
};

export default AppointmentModel;
