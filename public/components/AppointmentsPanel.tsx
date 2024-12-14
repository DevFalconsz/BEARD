import React, { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { format } from 'date-fns'

interface Appointment {
  id: number
  name: string
  email: string
  phone: string
  appointment_date: string
  service: string
}

const AppointmentsPanel: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([])

  useEffect(() => {
    fetchAppointments()
  }, [])

  const fetchAppointments = async () => {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .order('appointment_date', { ascending: true })

    if (error) {
      console.error('Error fetching appointments:', error)
    } else {
      setAppointments(data || [])
    }
  }

  return (
    <div className="appointments-panel">
      <h3>Agendamentos</h3>
      {appointments.length === 0 ? (
        <p>Nenhum agendamento encontrado.</p>
      ) : (
        <ul>
          {appointments.map((appointment) => (
            <li key={appointment.id}>
              <strong>{format(new Date(appointment.appointment_date), 'dd/MM/yyyy HH:mm')}</strong> -{' '}
              {appointment.name} - {appointment.service}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default AppointmentsPanel

