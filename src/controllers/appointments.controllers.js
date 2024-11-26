import AppointmentModel from '../models/appointment.model.js';

export const createAppointment = async (req, res) => {
    const appointment = req.body;
    try {
        // Verifica si el usuario es un paciente para que cree la cita
        if (req.user.role !== 'patient') {
            return res.status(403).json({ error: "Only patients can create appointments." });
        }

        const appointmentFormatted = {
            ...appointment,
            patient_id: req.user.id,  // El paciente actual crea la cita
            doctor_id: appointment.doctor_id,  // Doctor asignado en la cita
        };

        const id = await AppointmentModel.createAppointment(appointmentFormatted);
        res.status(201).json({ id });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

export const getAllAppointments = async (req, res) => {
    
    console.log(req.user)
    console.log(res.user)
    console.log(req.user)
    console.log(req.user)
    console.log(req.user)
    try {
        if (req.user.role === 'doctor') {
            // Los doctores pueden obtener todas las citas de sus pacientes
            const rows = await AppointmentModel.getAppointmentsByDoctor(req.user.id);
            return res.json(rows);
        }

        if (req.user.role === 'patient') {
            // Los pacientes solo pueden obtener sus propias citas
            const rows = await AppointmentModel.getAppointmentsByPatient(req.user.id);
            return res.json(rows);
        }

        return res.status(403).json({ error: "Invalid role" });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

export const getAppointmentById = async (req, res) => {
    const { id } = req.params;
    try {
        const appointment = await AppointmentModel.getAppointmentById(id);

        if (!appointment) {
            return res.status(404).json({ error: "Appointment not found" });
        }

        // Verifica el acceso a la cita según el rol del usuario
        if (req.user.role === 'doctor' && appointment.doctor_id !== req.user.id) {
            return res.status(403).json({ error: "You don't have permission to access this appointment" });
        }

        if (req.user.role === 'patient' && appointment.patient_id !== req.user.id) {
            return res.status(403).json({ error: "You don't have permission to access this appointment" });
        }

        res.json(appointment);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

export const updateAppointment = async (req, res) => {
    const { id } = req.params;
    const appointment = req.body;
    try {
        // Verifica si el usuario tiene permisos para actualizar la cita
        const existingAppointment = await AppointmentModel.getAppointmentById(id);
        if (!existingAppointment) {
            return res.status(404).json({ error: "Appointment not found" });
        }

        if (req.user.role === 'doctor' && existingAppointment.doctor_id !== req.user.id) {
            return res.status(403).json({ error: "You can't update this appointment as it's not yours." });
        }

        if (req.user.role === 'patient' && existingAppointment.patient_id !== req.user.id) {
            return res.status(403).json({ error: "You can't update this appointment as it's not yours." });
        }

        const changes = await AppointmentModel.updateAppointment(id, { ...appointment });
        if (changes === 0) {
            return res.status(404).json({ error: "Appointment not found" });
        }

        res.json({ message: "Appointment updated successfully" });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};

export const deleteAppointment = async (req, res) => {
    const { id } = req.params;
    try {
        // Verifica si el usuario tiene permisos para eliminar la cita
        const existingAppointment = await AppointmentModel.getAppointmentById(id);
        if (!existingAppointment) {
            return res.status(404).json({ error: "Appointment not found" });
        }

        if (req.user.role === 'doctor' && existingAppointment.doctor_id !== req.user.id) {
            return res.status(403).json({ error: "You can't delete this appointment as it's not yours." });
        }

        if (req.user.role === 'patient' && existingAppointment.patient_id !== req.user.id) {
            return res.status(403).json({ error: "You can't delete this appointment as it's not yours." });
        }

        const changes = await AppointmentModel.deleteAppointment(id);
        if (changes === 0) {
            return res.status(404).json({ error: "Appointment not found" });
        }

        res.json({ message: "Appointment deleted successfully" });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
};
