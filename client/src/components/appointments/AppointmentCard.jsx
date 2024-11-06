import { useAppointments } from "../../context/appointmentsContext";
import { Button, ButtonLink, Card } from "../ui";

export function AppointmentCard({ appointment }) {
  //console.log(appointment, "el appointment")
  const { deleteAppointment } = useAppointments();

  return (
    <Card>
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">{appointment.title}</h1>
        <div className="flex gap-x-2 items-center">
          <Button onClick={() => deleteAppointment(appointment.id)}>Eliminar</Button>
          <ButtonLink to={`/appointments/${appointment.id}`}>Editar</ButtonLink>
        </div>
      </header>
      <p className="text-slate-300">{`Descripcion: ${appointment.description}`}</p>
      <p>
        {`Fecha Cita: ${appointment.date &&
          new Date(appointment.date).toLocaleDateString("es", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}`}
      </p>
    </Card>
  );
}