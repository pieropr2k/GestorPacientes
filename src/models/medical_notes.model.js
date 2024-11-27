import db from "../database.js";

const MedicalNotesModel = {
  // Crear una nota médica
  createMedicalNote: (data) => {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO medical_notes (description, medical_history_id)
        VALUES (?, ?)`;
      const params = [data.description, data.medical_history_id];
      db.run(query, params, function (err) {
        if (err) {
          return reject(err);
        }
        resolve(this.lastID); // Retorna el ID del registro creado
      });
    });
  },

  // Obtener todas las notas médicas por ID de historial
    getMedicalNotesByHistoryId: (medical_history_id) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT *
        FROM medical_notes
        WHERE medical_history_id = ?`;
      db.all(query, [medical_history_id], (err, rows) => {
        if (err) {
          return reject(err);
        }
        resolve(rows); // Devuelve todas las notas asociadas al historial
      });
    });
  },

  // Actualizar una nota médica
  updateMedicalNote: (id, data) => {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE medical_notes 
        SET description = ?
        WHERE id = ?`;
      const params = [data.description, id];
      db.run(query, params, function (err) {
        if (err) {
          return reject(err);
        }
        resolve(this.changes); // Número de filas afectadas
      });
    });
  },

  // Eliminar una nota médica
  deleteMedicalNote: (id) => {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM medical_notes WHERE id = ?`;
      db.run(query, [id], function (err) {
        if (err) {
          return reject(err);
        }
        resolve(this.changes); // Número de filas eliminadas
      });
    });
  },
};

export default MedicalNotesModel;
